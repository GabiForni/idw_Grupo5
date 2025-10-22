// Pendiente aplicar img con base64

// Inicializar datos
const inicializarMedicos = () => {
    if (!localStorage.getItem('medicosStorage')) {
        localStorage.setItem('medicosStorage', JSON.stringify(medicosRegistrados));
    }
};

// Obtener médicos
const obtenerMedicos = () => {
    const medicosStorage = localStorage.getItem('medicosStorage');
    return medicosStorage ? JSON.parse(medicosStorage) : [...medicosRegistrados];
};

// Guardar médicos
const guardarMedicos = (medicos) => {
    localStorage.setItem('medicosStorage', JSON.stringify(medicos));
};

// Variables globales
let medicos = [];
let medicoEditando = null;
let imagenSeleccionada = null;

// Notifica cambios
function notificarCambios() {
    const event = new Event('storage');
    window.dispatchEvent(event);
}

// Validaciones
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(nombre) && nombre.length >= 2 && nombre.length <= 50;
}

function validarApellido(apellido) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(apellido) && apellido.length >= 2 && apellido.length <= 50;
}

function validarEspecialidad(especialidad) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$/;
    return regex.test(especialidad) && especialidad.length >= 3 && especialidad.length <= 50;
}

function validarMatricula(matricula) {
    const regex = /^\d{4}$/;
    return regex.test(matricula);
}

function validarObrasSociales(obrasSociales) {    
    const obrasArray = obrasSociales.split(',').map(obra => obra.trim());
    
    for (let obra of obrasArray) {
        if (obra === '') continue;
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-&.]+$/;
        if (!regex.test(obra) || obra.length > 50) {
            return false;
        }
    }
    return true;
}

function mostrarError(campo, mensaje) {
    const errorExistente = document.getElementById(`error-${campo}`);
    if (errorExistente) {
        errorExistente.remove();
    }
    
    const input = document.getElementById(campo);
    const errorDiv = document.createElement('div');
    errorDiv.id = `error-${campo}`;
    errorDiv.className = 'text-danger mt-1 small';
    errorDiv.textContent = mensaje;
    
    input.parentNode.appendChild(errorDiv);
    input.classList.add('is-invalid');
}

function limpiarError(campo) {
    const errorExistente = document.getElementById(`error-${campo}`);
    if (errorExistente) {
        errorExistente.remove();
    }
    
    const input = document.getElementById(campo);
    input.classList.remove('is-invalid');
}

document.addEventListener("DOMContentLoaded", () => {
    // Verificar autenticación
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.rol !== "admin") {
        window.location.href = "../login.html";
        return;
    }

    document.getElementById("usuarioActivo").textContent = `Bienvenido, ${usuario.nombre}`;

    // Cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "../views/login.html";
        });
    }

    // Inicializar datos
    inicializarMedicos();
    medicos = obtenerMedicos();
    cargarMedicos();

    // Formulario médico
    const formMedico = document.getElementById("formMedico");
    if (formMedico) {
        formMedico.addEventListener("submit", (e) => {
            e.preventDefault();
            guardarMedico();
        });
    }

    // Validación en tiempo real
    const nombreInput = document.getElementById("nombreMedico");
    const apellidoInput = document.getElementById("nombreApellido");
    const especialidadInput = document.getElementById("especialidad");
    const matriculaInput = document.getElementById("matriculaMedico");
    const obrasSocialesInput = document.getElementById("obrasSociales");

    if (nombreInput) {
        nombreInput.addEventListener('blur', () => {
            const valor = nombreInput.value.trim();
            if (!validarNombre(valor)) {
                mostrarError('nombreMedico', 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres');
            } else {
                limpiarError('nombreMedico');
            }
        });
    }

    if (apellidoInput) {
        apellidoInput.addEventListener('blur', () => {
            const valor = apellidoInput.value.trim();
            if (!validarApellido(valor)) {
                mostrarError('nombreApellido', 'El apellido debe contener solo letras y tener entre 2 y 50 caracteres');
            } else {
                limpiarError('nombreApellido');
            }
        });
    }

    if (especialidadInput) {
        especialidadInput.addEventListener('blur', () => {
            const valor = especialidadInput.value.trim();
            if (!validarEspecialidad(valor)) {
                mostrarError('especialidad', 'La especialidad debe contener solo letras y tener entre 3 y 50 caracteres');
            } else {
                limpiarError('especialidad');
            }
        });
    }

    if (matriculaInput) {
        matriculaInput.addEventListener('blur', () => {
            const valor = matriculaInput.value.trim();
            if (!validarMatricula(valor)) {
                mostrarError('matriculaMedico', 'La matrícula debe contener solo números (máximo 4 dígitos)');
            } else {
                limpiarError('matriculaMedico');
            }
        });

        // Prevenir entrada de caracteres no numéricos
        matriculaInput.addEventListener('input', () => {
            matriculaInput.value = matriculaInput.value.replace(/[^\d]/g, '');
        });
    }

    if (obrasSocialesInput) {
        obrasSocialesInput.addEventListener('blur', () => {
            const valor = obrasSocialesInput.value.trim();
            if (!validarObrasSociales(valor)) {
                mostrarError('obrasSociales', 'Las obras sociales deben ser texto separado por comas (máximo 50 caracteres cada una)');
            } else {
                limpiarError('obrasSociales');
            }
        });
    }

    // Img medico
    const inputImagen = document.getElementById('imagenMedico');
    const preview = document.getElementById('previewImagen');

    if (inputImagen && preview) {
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

    const btnGuardarImagen = document.getElementById('btnGuardarImagen');
    if (btnGuardarImagen) {
        btnGuardarImagen.addEventListener('click', () => {
            if (imagenSeleccionada) {
                alert('✅ Imagen del médico guardada correctamente.');
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalImagen'));
                if (modal) modal.hide();
            } else {
                alert('⚠️ Por favor, seleccioná una imagen antes de guardar.');
            }
        });
    }
});

function cargarMedicos() {
    const tbodyMedicos = document.getElementById("tbodyMedicos");
    if (!tbodyMedicos) return;
    
    tbodyMedicos.innerHTML = medicos.map(medico => `
        <tr>
            <td class="align-middle">
                <div class="d-flex align-items-center col-lg-8 col-7">
                    <img src="${medico.imagen}" alt="${medico.nombre}" 
                         class="img-medico rounded-circle me-2">
                    <span class="fs-5">${medico.nombre} ${medico.apellido}</span>
                </div>
            </td>
            <td class="align-middle d-none d-sm-table-cell">${medico.especialidad}</td>
            <td class="align-middle d-none d-sm-table-cell">${medico.matricula}</td>
            <td class="align-middle d-none d-sm-table-cell">
                ${medico.obrasSociales && medico.obrasSociales.length > 0 
                    ? medico.obrasSociales.join(', ') 
                    : '<span class="text-muted">Sin obras sociales</span>'
                }
            </td>
            
            <td class="col-5 col-lg-2">
                <div class="d-flex flex-column flex-row gap-1">
                    <button class="btn btn-primary rounded-pill btn-sm" onclick="editarMedico(${medico.id})">
                    <i class="bi bi-pencil-fill me-1"></i>Modificar
                    </button>
                    <button class="btn btn-danger rounded-pill btn-sm" onclick="eliminarMedico(${medico.id})">
                    <i class="bi bi-trash me-1"></i>Eliminar
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function guardarMedico() {
    console.log("Guardar médico");
    console.log("Médico editando:", medicoEditando);
    console.log("Imagen seleccionada:", imagenSeleccionada ? "SÍ" : "NO");

    const nombre = document.getElementById("nombreMedico").value.trim();
    const apellido = document.getElementById("nombreApellido").value.trim();
    const especialidad = document.getElementById("especialidad").value.trim();
    const matricula = document.getElementById("matriculaMedico").value.trim();
    const obrasSociales = document.getElementById("obrasSociales").value.trim();

    // Validaciones de formulario
    let formularioValido = true;

    // Validar nombre
    if (!validarNombre(nombre)) {
        mostrarError('nombreMedico', 'El nombre debe contener solo letras y tener entre 2 y 50 caracteres');
        formularioValido = false;
    } else {
        limpiarError('nombreMedico');
    }

    // Validar apellido
    if (!validarApellido(apellido)) {
        mostrarError('nombreApellido', 'El apellido debe contener solo letras y tener entre 2 y 50 caracteres');
        formularioValido = false;
    } else {
        limpiarError('nombreApellido');
    }

    // Validar especialidad
    if (!validarEspecialidad(especialidad)) {
        mostrarError('especialidad', 'La especialidad debe contener solo letras y tener entre 3 y 50 caracteres');
        formularioValido = false;
    } else {
        limpiarError('especialidad');
    }

    // Validar matrícula
    if (!validarMatricula(matricula)) {
        mostrarError('matriculaMedico', 'La matrícula debe contener solo números (máximo 4 dígitos)');
        formularioValido = false;
    } else {
        limpiarError('matriculaMedico');
    }

    // Validar obras sociales
    if (!validarObrasSociales(obrasSociales)) {
        mostrarError('obrasSociales', 'Las obras sociales deben ser texto separado por comas (máximo 50 caracteres cada una)');
        formularioValido = false;
    } else {
        limpiarError('obrasSociales');
    }

    if (!formularioValido) {
        alert('⚠️ Por favor, corregí los errores en el formulario antes de continuar.');
        return;
    }

    if (!nombre || !apellido || !especialidad || !matricula) {
        alert('⚠️ Por favor, completá todos los campos obligatorios.');
        return;
    }

    let obrasSocialesArray = [];
    if (obrasSociales) {
        obrasSocialesArray = obrasSociales.split(',').map(obra => obra.trim()).filter(obra => obra !== '');
    }

    if (medicoEditando) {
        const index = medicos.findIndex(m => m.id === medicoEditando);
        if (index !== -1) {
            medicos[index] = {
                ...medicos[index],  
                nombre: nombre, 
                apellido: apellido,  
                especialidad: especialidad,
                matricula: matricula,
                obrasSociales: obrasSocialesArray.length > 0 ? obrasSocialesArray : medicos[index].obrasSociales
            };
            alert('✅ Médico actualizado correctamente.');
        }
        medicoEditando = null;
        document.querySelector('button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar';
    } else {
        const nuevoId = medicos.length > 0 ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
        const medicoData = {
            id: nuevoId,
            nombre,
            apellido,
            especialidad,
            matricula,
            imagen: imagenSeleccionada || '../img/doctor-default.png',
            obrasSociales: obrasSocialesArray
        };
        medicos.push(medicoData);
        alert(`✅ Médico agregado: ${nombre} ${apellido} (${especialidad})`);
    }

    guardarMedicos(medicos);
    notificarCambios();
    cargarMedicos();
    resetForm();
}

// Editar médico
function editarMedico(id) {
    const medico = medicos.find(m => m.id === id);
    if (medico) {
        document.getElementById("nombreMedico").value = medico.nombre;
        document.getElementById("nombreApellido").value = medico.apellido;
        document.getElementById("especialidad").value = medico.especialidad;
        document.getElementById("matriculaMedico").value = medico.matricula;
        document.getElementById("obrasSociales").value = medico.obrasSociales ? medico.obrasSociales.join(', ') : '';
        
        // Limpiar errores al editar
        limpiarError('nombreMedico');
        limpiarError('nombreApellido');
        limpiarError('especialidad');
        limpiarError('matriculaMedico');
        limpiarError('obrasSociales');
        
        medicoEditando = id;
        document.querySelector('button[type="submit"]').innerHTML = '<i class="bi bi-check"></i> Actualizar';
        
        document.getElementById("nombreMedico").focus();
    }
}

// Eliminar médico
function eliminarMedico(id) {
    if (confirm('¿Estás seguro de que querés eliminar este médico?')) {
        medicos = medicos.filter(m => m.id !== id);
        guardarMedicos(medicos);
        notificarCambios();
        cargarMedicos();
        alert('✅ Médico eliminado correctamente.');
    }
}

// Resetear formulario
function resetForm() {
    document.getElementById("formMedico").reset();
    medicoEditando = null;
    imagenSeleccionada = null;
    const preview = document.getElementById('previewImagen');
    if (preview) {
        preview.classList.add('d-none');
    }
    document.querySelector('button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar';
    
    // Limpiar todos los errores
    limpiarError('nombreMedico');
    limpiarError('nombreApellido');
    limpiarError('especialidad');
    limpiarError('matriculaMedico');
    limpiarError('obrasSociales');
}

// Funciones globales
window.editarMedico = editarMedico;
window.eliminarMedico = eliminarMedico;
