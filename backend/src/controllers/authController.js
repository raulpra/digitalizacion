const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../utils/users');
require('dotenv').config();

const authController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validación básica
            if (!username || !password) {
                return res.status(400).json({
                    message: 'Todos los campos son requeridos'
                });
            }

            // Buscar usuario
            const user = users.find(u => u.username === username);

            if (!user) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { 
                    id: user.id, 
                    username: user.username 
                },
                process.env.JWT_SECRET,
                { 
                    expiresIn: '1h',
                    algorithm: 'HS256'
                }
            );

            // Establecer cookie segura
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000 // 1 hora
            });

            res.json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({
                message: 'Error interno del servidor'
            });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validaciones
            if (!username || !password) {
                return res.status(400).json({
                    message: 'Todos los campos son requeridos'
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    message: 'La contraseña debe tener al menos 8 caracteres'
                });
            }

            // Verificar usuario existente
            if (users.find(u => u.username === username)) {
                return res.status(400).json({
                    message: 'El usuario ya existe'
                });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));

            // Crear nuevo usuario
            const newUser = {
                id: users.length + 1,
                username,
                password: hashedPassword
            };
            users.push(newUser);

            res.status(201).json({
                message: 'Usuario creado exitosamente'
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({
                message: 'Error interno del servidor'
            });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.json({
            message: 'Sesión cerrada exitosamente'
        });
    }
};

module.exports = authController;