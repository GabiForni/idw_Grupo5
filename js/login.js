document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("loginForm");
  const inputEmail = document.getElementById("email");
  const inputClave = document.getElementById("clave");

  const toastSuccess = new bootstrap.Toast(document.getElementById("toastSuccess"));
  const toastError = new bootstrap.Toast(document.getElementById("toastError"));
  const msgSuccess = document.getElementById("toastSuccessMessage");
  const msgError = document.getElementById("toastErrorMessage");

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailOrUser = inputEmail.value.trim();
    const password = inputClave.value.trim();

    if (!emailOrUser || !password) {
      msgError.textContent = "⚠️ Por favor, ingresá tus credenciales.";
      toastError.show();
      return;
    }

    try {
      let username = emailOrUser;

      // 🔍 Si el usuario escribe un email, buscar su username real
      if (emailOrUser.includes("@")) {
        const resUsers = await fetch("https://dummyjson.com/users");
        const dataUsers = await resUsers.json();
        const user = dataUsers.users.find(
          (u) => u.email.toLowerCase() === emailOrUser.toLowerCase()
        );

        if (!user) {
          msgError.textContent = "❌ Usuario no encontrado.";
          toastError.show();
          return;
        }

        username = user.username;
      }

      // 🔐 Hacer login en DummyJSON
      const resLogin = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!resLogin.ok) {
        msgError.textContent = "❌ Credenciales incorrectas.";
        toastError.show();
        return;
      }

      const dataLogin = await resLogin.json();

      // 🎯 Asignar rol manualmente
      let rol = "usuario";
      if (dataLogin.username === "emilys") {
        rol = "admin";
      }

      // 💾 Guardar usuario en localStorage con el rol incluido
      const usuarioActivo = {
        id: dataLogin.id,
        nombre: `${dataLogin.firstName} ${dataLogin.lastName}`,
        email: dataLogin.email,
        username: dataLogin.username,
        rol: rol,
        token: dataLogin.accessToken,
        imagen: dataLogin.image,
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

      msgSuccess.textContent = `✅ Bienvenido, ${usuarioActivo.nombre}`;
      toastSuccess.show();

      // ⏳ Redirigir según el rol
      setTimeout(() => {
        if (rol === "admin") {
          window.location.href = "../views/admin.html";
        } else {
          window.location.href = "../views/turnos.html";
        }
      }, 1500);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      msgError.textContent = "⚠️ Error de conexión con el servidor.";
      toastError.show();
    }
  });
});
