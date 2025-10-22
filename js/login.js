const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const clave = document.getElementById("clave").value.trim();

    const user = usuarios.find(u => u.email === email);

    if (!user) return alert("Usuario no encontrado");
    if (!user.activo) return alert("Usuario desactivado");
    if (user.clave !== clave) return alert("Contraseña incorrecta");

    // ✅ Guardamos el usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
    }));

    // Redirigir según el rol
    
    switch (user.rol) {
        case "admin":
            window.location.href = "../views/admin.html";
            break;
        case "usuario":
            window.location.href = "../views/turnos.html"; // En un futuro se cambiara por usuario.html, que habilitará el portal de paciente. Si no estas registrado, no podes reservar turnos. 
    }
});