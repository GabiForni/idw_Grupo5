const loginForm = document.getElementById("loginForm");

// Inicializar toasts
const toastSuccess = new bootstrap.Toast(document.getElementById('toastSuccess'));
const toastError = new bootstrap.Toast(document.getElementById('toastError'));

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const clave = document.getElementById("clave").value.trim();

    const user = usuarios.find(u => u.email === email);

    if (!user) {
        showError("Usuario no encontrado");
        return;
    }
    
    if (!user.activo) {
        showError("Usuario desactivado");
        return;
    }
    
    if (user.clave !== clave) {
        showError("Contraseña incorrecta");
        return;
    }

    // ✅ Guardamos el usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
    }));

    // Mostrar toast de éxito
    showSuccess(`¡Bienvenido ${user.nombre}!`);
    
    // Redirigir después de un breve delay para que se vea el toast
    setTimeout(() => {
        switch (user.rol) {
            case "admin":
                window.location.href = "../views/admin.html";
                break;
            case "usuario":
                window.location.href = "../views/turnos.html";
                break;
        }
    }, 1500);
});

function showError(mensaje) {
    document.getElementById('toastErrorMessage').textContent = mensaje;
    toastError.show();
}

function showSuccess(mensaje) {
    document.getElementById('toastSuccessMessage').textContent = mensaje;
    toastSuccess.show();
}