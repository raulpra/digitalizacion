const bcrypt = require('bcrypt');

const users = [
    {
        id: 1,
        username: 'admin',
        password: '$2b$10$vQaR7q0F6z3Ym.me.JrqXeLrJm5LINZwKafNRU7Y6RYTMKxdcZxwi' // Usar bcrypt para generar este hash
    },
    {
        id: 2,
        username: 'user',
        password: '$2b$10$BrciZNZ5IzEJSufAFpHmB.jdI.q5Cx3gAwRwHeiYPQaEl/dZ53OpC' // Usar bcrypt para generar este hash
    }
];

module.exports = { users };