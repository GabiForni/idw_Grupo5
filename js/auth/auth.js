// auth.js
const usuarios = [
    { id: 1, email: "admin@idw.com", password: "admin123", nombre: "Administrador", rol: "admin", activo: true },
    { id: 2, email: "dr.garcia@idw.com", password: "medico123", nombre: "Dr. Carlos García", rol: "medico", activo: true },
    { id: 3, email: "maria.lopez@email.com", password: "paciente123", nombre: "María López", rol: "paciente", activo: true },
    { id: 4, email: "recepcion@idw.com", password: "recepcion123", nombre: "Ana Martínez", rol: "recepcion", activo: true }
];

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = usuarios.find(u => u.email === email);

    if (!user) return alert("Usuario no encontrado");
    if (!user.activo) return alert("Usuario desactivado");
    if (user.password !== password) return alert("Contraseña incorrecta");

    // ✅ Guardamos el usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
    }));

    alert(`Bienvenido ${user.nombre} (${user.rol})`);

    // 🚀 Redirigir según el rol
    switch (user.rol) {
        case "admin":
            window.location.href = "../views/admin.html";
            break;
        case "medico":
            window.location.href = "../views/medico.html";
            break;
        case "paciente":
            window.location.href = "../views/paciente.html";
            break;
        case "recepcion":
            window.location.href = "../views/recepcion.html";
            break;
        default:
            window.location.href = "../index.html";
    }
});
