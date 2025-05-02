document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    // Comprobar si el usuario está logueado al cargar la página
    const token = localStorage.getItem('token');
    if (token) {
        updateButtonToLogout();
    }

    function updateButtonToLogout() {
        loginBtn.textContent = 'Desconectar';
        loginBtn.classList.add('logged-in');
    }

    function updateButtonToLogin() {
        loginBtn.textContent = 'Registro/Iniciar Sesión';
        loginBtn.classList.remove('logged-in');
    }

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        updateButtonToLogin();
        alert('Has cerrado sesión correctamente');
    }

    loginBtn.onclick = (e) => {
        e.preventDefault();
        if (loginBtn.classList.contains('logged-in')) {
            handleLogout(e);
        } else {
            modal.style.display = "block";
        }
    }

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    }

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    
        try {
            console.log('Intentando login...'); // Debug
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            console.log('Respuesta recibida:', response.status); // Debug
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error en el servidor');
            }
    
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.user.username);
            updateButtonToLogout();
            alert('Login exitoso!');
            modal.style.display = "none";
            loginForm.reset();
        } catch (error) {
            console.error('Error detallado:', error); // Debug
            alert('Error de conexión. Por favor, verifica que el servidor esté corriendo en http://localhost:3000');
        }
    };
});