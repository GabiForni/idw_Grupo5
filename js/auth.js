// 🔐 Protege las vistas privadas
(function () {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
        alert("Debe iniciar sesión para acceder al panel de administración.");
        window.location.href = "../views/login.html";
    }
})();

// 🚪 Cerrar sesión
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.href = "../views/login.html";
    });
}