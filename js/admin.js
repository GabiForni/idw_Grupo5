// js/admin.js

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario || usuario.rol !== "admin") {
        window.location.href = "../login.html";
        return;
    }

    document.getElementById("usuarioActivo").textContent = `Bienvenido, ${usuario.nombre}`;

    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    btnCerrarSesion.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../views/login.html";
    });

    // Lista de médicos
    const formMedico = document.getElementById("formMedico");
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    formMedico.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreMedico").value.trim();
        const especialidad = document.getElementById("especialidad").value.trim();
        const email = document.getElementById("emailMedico").value.trim();

        medicos.push({ nombre, especialidad, email });
        localStorage.setItem("medicos", JSON.stringify(medicos));

        alert(`Médico agregado: ${nombre} (${especialidad})`);
        formMedico.reset();
    });

    // Turnos simulados
    const medicosRegitrados = [
        { medico: "Dr. Carlos García", especialidad: "Clínica", matricula: "1322" },
        { medico: "Dra. Sofía Ríos", especialidad: "Pediatría", matricula: "1428" }
    ];

    const tbodyMedicos = document.getElementById("tbodyMedicos");
    tbodyMedicos.innerHTML = medicosRegitrados.map(t => `
        <tr>
            <td>${t.medico}</td>
            <td>${t.especialidad}</td>
            <td>${t.matricula}</td>
             <td>
            <button class="btn btn-primary btn-sm me-2">
                <i class="bi bi-pencil-fill me-1"></i>Modificar
            </button>
            <button class="btn btn-danger btn-sm">
                <i class="bi bi-trash me-1"></i>Eliminar
            </button>
        </td>
        </tr>
    `).join("");
});
// --- Vista previa de imagen ---
const inputImagen = document.getElementById('imagenMedico');
const preview = document.getElementById('previewImagen');
let imagenSeleccionada = null;

if (inputImagen) {
  inputImagen.addEventListener('change', () => {
    const file = inputImagen.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        preview.classList.remove('d-none');
        imagenSeleccionada = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// --- Guardar imagen en formulario ---
const btnGuardarImagen = document.getElementById('btnGuardarImagen');
if (btnGuardarImagen) {
  btnGuardarImagen.addEventListener('click', () => {
    if (imagenSeleccionada) {
      alert('✅ Imagen del médico guardada correctamente.');
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalImagen'));
      modal.hide();
    } else {
      alert('⚠️ Por favor, seleccioná una imagen antes de guardar.');
    }
  });
}