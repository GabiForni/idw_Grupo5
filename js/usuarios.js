document.addEventListener("DOMContentLoaded", async () => {
  // Referencias al DOM
  const tbodyUsuarios = document.getElementById("tbodyUsuarios");
  const inputBuscar = document.getElementById("buscarUsuario");
  const filtroGenero = document.getElementById("filtroGenero");
  const paginacion = document.getElementById("paginacionUsuarios");
  const btnActualizar = document.querySelector("#usuarios button.btn-success");

  // Toasts globales (ya definidos en admin)
  const toastSuccess = new bootstrap.Toast(document.getElementById("toastSuccess"));
  const toastError = new bootstrap.Toast(document.getElementById("toastError"));
  const msgSuccess = document.getElementById("toastSuccessMessage");
  const msgError = document.getElementById("toastErrorMessage");

  // Variables de control
  let usuarios = [];
  let usuariosFiltrados = [];
  let paginaActual = 1;
  const usuariosPorPagina = 10;

  // 📡 Función para obtener usuarios desde DummyJSON
  async function obtenerUsuarios() {
    try {
      const res = await fetch("https://dummyjson.com/users");
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      usuarios = data.users;
      usuariosFiltrados = [...usuarios];
      mostrarUsuarios();
      msgSuccess.textContent = "✅ Usuarios cargados correctamente.";
      toastSuccess.show();
    } catch (error) {
      console.error("Error:", error);
      msgError.textContent = "⚠️ No se pudieron cargar los usuarios desde la API.";
      toastError.show();
    }
  }

  // 📋 Renderizar tabla de usuarios
  function mostrarUsuarios() {
    const inicio = (paginaActual - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    const pagina = usuariosFiltrados.slice(inicio, fin);

    tbodyUsuarios.innerHTML = "";

    if (pagina.length === 0) {
      tbodyUsuarios.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-muted">
            <i class="bi bi-info-circle me-2"></i> No hay usuarios para mostrar.
          </td>
        </tr>`;
      return;
    }

    pagina.forEach((u) => {
      const fila = `
        <tr>
          <td>${u.id}</td>
          <td>
            <div class="d-flex align-items-center">
              <img src="${u.image}" class="rounded-circle me-2" width="40" height="40" alt="Foto">
              ${u.username}
            </div>
          </td>
          <td>${u.firstName} ${u.lastName}</td>
          <td>${u.email}</td>
          <td>${u.phone}</td>
          <td>${u.gender === "male" ? "Masculino" : "Femenino"}</td>
          <td>${u.age}</td>
        </tr>`;
      tbodyUsuarios.insertAdjacentHTML("beforeend", fila);
    });

    generarPaginacion();
  }

  // 🔍 Filtrar por texto y género
  function filtrarUsuarios() {
    const texto = inputBuscar.value.toLowerCase();
    const genero = filtroGenero.value;

    usuariosFiltrados = usuarios.filter((u) => {
      const coincideTexto =
        u.username.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto) ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(texto);
      const coincideGenero = genero ? u.gender === genero : true;
      return coincideTexto && coincideGenero;
    });

    paginaActual = 1;
    mostrarUsuarios();
  }

  // 📑 Paginación
  function generarPaginacion() {
    const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
    paginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === paginaActual ? "active" : ""}`;
      li.innerHTML = `<button class="page-link">${i}</button>`;
      li.addEventListener("click", () => {
        paginaActual = i;
        mostrarUsuarios();
      });
      paginacion.appendChild(li);
    }
  }

  // 🔄 Botón “Actualizar”
  if (btnActualizar) {
    btnActualizar.addEventListener("click", async (e) => {
      e.preventDefault();
      msgSuccess.textContent = "🔄 Actualizando lista de usuarios...";
      toastSuccess.show();
      await obtenerUsuarios();
    });
  }

  // Eventos de búsqueda y filtros
  inputBuscar.addEventListener("input", filtrarUsuarios);
  filtroGenero.addEventListener("change", filtrarUsuarios);

  // 🚀 Cargar usuarios apenas se abra la pestaña
  await obtenerUsuarios();
});
