// =============== INICIALIZACIÓN Y DATOS ===============

// Inicializar datos
const inicializarDatos = () => {
    inicializarEspecialidades();
    inicializarObrasSociales();
    inicializarMedicos();
    inicializarTurnos();
    inicializarReservas();
};

// =============== MÉDICOS ===============

// Inicializar datos
const inicializarMedicos = () => {
    const medicosStorage = localStorage.getItem('medicosStorage');
    
    // Si no existe o está corrupto, reinicializar
    if (!medicosStorage) {
        console.log('Inicializando médicos por primera vez...');
        localStorage.setItem('medicosStorage', JSON.stringify(medicosRegistrados));
    } else {
        // Verificar que los datos sean válidos
        try {
            const medicos = JSON.parse(medicosStorage);
            // Si los médicos no tienen el campo obrasSociales, reinicializar
            if (medicos.some(m => !m.obrasSociales)) {
                console.log('Datos corruptos detectados. Reinicializando...');
                localStorage.setItem('medicosStorage', JSON.stringify(medicosRegistrados));
            }
        } catch (e) {
            console.error('Error al parsear médicos:', e);
            localStorage.setItem('medicosStorage', JSON.stringify(medicosRegistrados));
        }
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

// =============== ESPECIALIDADES ===============

// Inicializar Especialidades
const inicializarEspecialidades = () => {
    if (!localStorage.getItem('especialidades')) {
        localStorage.setItem('especialidades', JSON.stringify(especialidades));
    }
};

// Obtener Especialidades
const obtenerEspecialidades = () => {
    const especialidadesStorage = localStorage.getItem('especialidades');
    return especialidadesStorage ? JSON.parse(especialidadesStorage) : [...especialidades];
};

// Guardar Especialidades
const guardarEspecialidades = (especialidades) => {
    localStorage.setItem('especialidades', JSON.stringify(especialidades));
};

// Obtener el nombre de una especialidad por ID
function obtenerNombreEspecialidad(idEspecialidad) {
    const especialidades = obtenerEspecialidades();
    const especialidad = especialidades.find(esp => esp.id === idEspecialidad);
    return especialidad ? especialidad.nombre : "Especialidad no encontrada";
}

// Cargar opciones de especialidades en selects
function cargarOpcionesEspecialidades(selectElement) {
    const especialidades = obtenerEspecialidades();
    selectElement.innerHTML = '<option value="">Seleccionar especialidad</option>';
    
    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad.id;
        option.textContent = especialidad.nombre;
        selectElement.appendChild(option);
    });
}

// =============== OBRAS SOCIALES ===============

// Inicializar Obras Sociales
const inicializarObrasSociales = () => {
    if (!localStorage.getItem('obrasSociales')) {
        localStorage.setItem('obrasSociales', JSON.stringify(obrasSociales));
    }
};

// Obtener Obras Sociales
const obtenerObrasSociales = () => {
    const obrasSocialesStorage = localStorage.getItem('obrasSociales');
    return obrasSocialesStorage ? JSON.parse(obrasSocialesStorage) : [...obrasSociales];
};

// Guardar Obras Sociales
const guardarObrasSociales = (obrasSociales) => {
    localStorage.setItem('obrasSociales', JSON.stringify(obrasSociales));
};

// Obtener el nombre de una obra social por ID
function obtenerNombreObraSocial(idObraSocial) {
    const obrasSociales = obtenerObrasSociales();
    
    // Convertir a número por si viene como string desde localStorage
    const idBuscado = parseInt(idObraSocial);
    
    const obraSocial = obrasSociales.find(os => os.id === idBuscado);
    
    return obraSocial ? obraSocial.nombre : "Obra social no encontrada";
}

// Obtener el descuento de una obra social por ID
function obtenerDescuentoObraSocial(idObraSocial) {
    const obrasSociales = obtenerObrasSociales();
    const idBuscado = parseInt(idObraSocial);
    const obraSocial = obrasSociales.find(os => os.id === idBuscado);
    
    return obraSocial ? obraSocial.descuento || 0 : 0;
}

// =============== TURNOS ===============

// Inicializar Turnos
const inicializarTurnos = () => {
    if (!localStorage.getItem('turnos')) {
        localStorage.setItem('turnos', JSON.stringify(turnosIniciales));
    }
};

// Obtener Turnos
const obtenerTurnos = () => {
    const turnosStorage = localStorage.getItem('turnos');
    return turnosStorage ? JSON.parse(turnosStorage) : [];
};

// Guardar Turnos
const guardarTurnos = (turnos) => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
};

// =============== RESERVAS ===============

// Inicializar Reservas
const inicializarReservas = () => {
    if (!localStorage.getItem('reservas')) {
        localStorage.setItem('reservas', JSON.stringify([]));
    }
};

// Obtener Reservas
const obtenerReservas = () => {
    const reservasStorage = localStorage.getItem('reservas');
    return reservasStorage ? JSON.parse(reservasStorage) : [];
};

// Guardar Reservas
const guardarReservas = (reservas) => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
};

// =============== DESPLEGABLE OBRAS SOCIALES ===============

// Inicializar desplegable de obras sociales
function initObrasSociales() {
    const inputObras = document.getElementById('obrasSociales');
    const flechaObras = inputObras.nextElementSibling;
    const listaObras = document.getElementById('listaObrasSociales');
    
    // Mostrar/ocultar desplegable
    inputObras.addEventListener('click', toggleObrasSociales);
    flechaObras.addEventListener('click', toggleObrasSociales);
    
    // Cargar opciones
    cargarObrasSociales();
    
    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!inputObras.contains(e.target) && 
            !flechaObras.contains(e.target) && 
            !listaObras.contains(e.target)) {
            listaObras.classList.remove('show');
        }
    });
}

function toggleObrasSociales() {
    const listaObras = document.getElementById('listaObrasSociales');
    listaObras.classList.toggle('show');
}

// Cargar opciones en el desplegable
function cargarObrasSociales() {
    const listaObras = document.getElementById('listaObrasSociales');
    const obras = obtenerObrasSociales();
    
    listaObras.innerHTML = '';
    
    obras.forEach(obra => {
        const item = document.createElement('li');
        item.innerHTML = `
            <div class="form-check dropdown-item">
                <input class="form-check-input" type="checkbox" value="${obra.id}" id="os-${obra.id}">
                <label class="form-check-label w-100" for="os-${obra.id}">
                    ${obra.nombre} <!-- Solo el nombre, sin descuento -->
                </label>
            </div>
        `;
        listaObras.appendChild(item);
    });
    
    // Para checkboxes
    const checks = listaObras.querySelectorAll('input[type="checkbox"]');
    checks.forEach(check => {
        check.addEventListener('change', actualizarObrasSeleccionadas);
    });
}

// Actualizar obras seleccionadas
function actualizarObrasSeleccionadas() {
    const inputObras = document.getElementById('obrasSociales');
    const textoObras = document.getElementById('obrasSocialesSeleccionadas');
    const checks = document.querySelectorAll('#listaObrasSociales input[type="checkbox"]:checked');
    
    if (checks.length === 0) {
        inputObras.placeholder = 'Seleccionar obras sociales';
        textoObras.textContent = 'Ninguna obra social seleccionada';
        textoObras.className = 'form-text text-muted';
    } else {
        const nombres = Array.from(checks).map(check => {
            const label = check.closest('.form-check').querySelector('label');
            return label.textContent.trim();
        });
        inputObras.placeholder = `${checks.length} obra(s) social(es) seleccionada(s)`;
        textoObras.textContent = `Seleccionadas: ${nombres.join(', ')}`;
        textoObras.className = 'form-text text-success fw-bold';
    }
}

// Obtener obras sociales seleccionadas
function getObrasSeleccionadas() {
    const checks = document.querySelectorAll('#listaObrasSociales input[type="checkbox"]:checked');
    return Array.from(checks).map(check => parseInt(check.value));
}

// Preseleccionar obras sociales al editar
function setObrasSeleccionadas(obrasIds) {
    const checks = document.querySelectorAll('#listaObrasSociales input[type="checkbox"]');
    
    checks.forEach(check => {
        check.checked = obrasIds.includes(parseInt(check.value));
    });
    
    actualizarObrasSeleccionadas();
}

// =============== VALIDACIONES ===============

// Variables globales
let medicos = [];
let medicoEditando = null;
let imagenSeleccionada = null;
let especialidadEditando = null;
let obraSocialEditando = null;

// Notifica cambios
function notificarCambios() {
    const event = new Event('storage');
    window.dispatchEvent(event);
}

// Validaciones de campos
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(nombre) && nombre.length >= 2 && nombre.length <= 50;
}

function validarApellido(apellido) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return regex.test(apellido) && apellido.length >= 2 && apellido.length <= 50;
}

function validarEspecialidad(especialidadId) {
    return especialidadId !== null && especialidadId !== "";
}

function validarMatricula(matricula) {
    const regex = /^\d{4}$/;
    return regex.test(matricula);
}

function validarDescripcion(descripcion) {
    return descripcion.trim().length >= 10 && descripcion.trim().length <= 500;
}

function validarValorConsulta(valor) {
    const num = parseFloat(valor);
    return !isNaN(num) && num > 0 && num <= 999999.99;
}

function validarDescuento(descuento) {
    const num = parseFloat(descuento);
    return !isNaN(num) && num >= 0 && num <= 100;
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

// =============== FUNCIONALIDADES DE DESPLEGABLES (turnos, reservas, formulario) ===============

// Cargar opciones de médicos en selects
function cargarOpcionesMedicos(selectElement) {
    const medicos = obtenerMedicos();
    selectElement.innerHTML = '<option value="">Seleccionar médico</option>';
    
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nombre} ${medico.apellido} - ${obtenerNombreEspecialidad(medico.especialidad)}`;
        selectElement.appendChild(option);
    });
}

// =============== GESTIÓN DE ESPECIALIDADES ===============

function cargarEspecialidades() {
    const tbodyEspecialidades = document.getElementById("tbodyEspecialidades");
    if (!tbodyEspecialidades) return;
    
    const especialidades = obtenerEspecialidades();
    
    tbodyEspecialidades.innerHTML = especialidades.map(especialidad => `
        <tr>
            <td>${especialidad.id}</td>
            <td>${especialidad.nombre}</td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm" onclick="editarEspecialidad(${especialidad.id})" title="Modificar">
                        <i class="bi bi-pencil"></i>
                        <span class="text-white d-none d-xl-inline ms-1">Modificar</span>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarEspecialidad(${especialidad.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                        <span class="text-white d-none d-xl-inline ms-1">Eliminar</span>
                    </button>
                </div>
            </td>   
        </tr>
    `).join('');
}

function guardarEspecialidad(e) {
    e.preventDefault();
    
    const nombreInput = document.getElementById("nombreEspecialidad");
    const nombre = nombreInput.value.trim();
    
    if (!nombre) {
        toastSystem.showError('⚠️ Por favor, ingresá el nombre de la especialidad.');
        return;
    }
    
    const especialidades = obtenerEspecialidades();
    
    if (especialidadEditando) {
        // Editar especialidad existente
        const index = especialidades.findIndex(esp => esp.id === especialidadEditando);
        if (index !== -1) {
            especialidades[index].nombre = nombre;
            toastSystem.showSuccess('✅ Especialidad actualizada correctamente.');
        }
        especialidadEditando = null;
        document.querySelector('#formEspecialidad button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar Especialidad';
    } else {
        // Agregar nueva especialidad
        const nuevoId = especialidades.length > 0 ? Math.max(...especialidades.map(esp => esp.id)) + 1 : 1;
        especialidades.push({
            id: nuevoId,
            nombre: nombre
        });
        toastSystem.showSuccess(`✅ Especialidad "${nombre}" agregada correctamente.`);
    }
    
    guardarEspecialidades(especialidades);
    cargarEspecialidades();
    cargarOpcionesEspecialidades(document.getElementById('especialidad'));
    nombreInput.value = '';
}

function editarEspecialidad(id) {
    const especialidades = obtenerEspecialidades();
    const especialidad = especialidades.find(esp => esp.id === id);
    
    if (especialidad) {
        document.getElementById("nombreEspecialidad").value = especialidad.nombre;
        especialidadEditando = id;
        document.querySelector('#formEspecialidad button[type="submit"]').innerHTML = '<i class="bi bi-check"></i> Actualizar Especialidad';
        document.getElementById("nombreEspecialidad").focus();
    }
}

function eliminarEspecialidad(id) {
    if (confirm('¿Estás seguro de que querés eliminar esta especialidad?')) {
        const especialidades = obtenerEspecialidades();
        const especialidad = especialidades.find(esp => esp.id === id);
        
        // Verificar si hay médicos usando esta especialidad
        const medicos = obtenerMedicos();
        const medicosConEspecialidad = medicos.filter(medico => medico.especialidad === id);
        
        if (medicosConEspecialidad.length > 0) {
            toastSystem.showWarning(`⚠️ No se puede eliminar la especialidad porque ${medicosConEspecialidad.length} médico(s) la usan.`);
            return;
        }
        
        const nuevasEspecialidades = especialidades.filter(esp => esp.id !== id);
        guardarEspecialidades(nuevasEspecialidades);
        cargarEspecialidades();
        cargarOpcionesEspecialidades(document.getElementById('especialidad'));
        toastSystem.showSuccess('✅ Especialidad eliminada correctamente.');
    }
}

// =============== GESTIÓN DE OBRAS SOCIALES ===============

function cargarObrasSocialesTabla() {
    const tbodyObrasSociales = document.getElementById("tbodyObrasSociales");
    if (!tbodyObrasSociales) return;
    
    const obrasSociales = obtenerObrasSociales();
    
    tbodyObrasSociales.innerHTML = obrasSociales.map(obra => `
        <tr>
            <td>${obra.id}</td>
            <td>${obra.nombre}</td>
            <td>${obra.descuento || 0}%</td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm" onclick="editarObraSocial(${obra.id})" title="Modificar">
                        <i class="bi bi-pencil"></i>
                        <span class="text-white d-none d-xl-inline ms-1">Modificar</span>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarObraSocial(${obra.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                        <span class="text-white d-none d-xl-inline ms-1">Eliminar</span>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function guardarObraSocial(e) {
    e.preventDefault();
    
    const nombreInput = document.getElementById("nombreObraSocial");
    const descuentoInput = document.getElementById("descuentoObraSocial");
    const nombre = nombreInput.value.trim();
    const descuento = descuentoInput.value.trim();
    
    if (!nombre) {
        toastSystem.showError('⚠️ Por favor, ingresá el nombre de la obra social.');
        return;
    }
    
    if (!validarDescuento(descuento)) {
        toastSystem.showError('⚠️ El descuento debe ser un número entre 0 y 100.');
        return;
    }
    
    const obrasSociales = obtenerObrasSociales();
    
    if (obraSocialEditando) {
        // Editar obra social existente
        const index = obrasSociales.findIndex(os => os.id === obraSocialEditando);
        if (index !== -1) {
            obrasSociales[index].nombre = nombre;
            obrasSociales[index].descuento = parseFloat(descuento);
            toastSystem.showSuccess('✅ Obra social actualizada correctamente.');
        }
        obraSocialEditando = null;
        document.querySelector('#formObraSocial button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar';
    } else {
        // Agregar nueva obra social
        const nuevoId = obrasSociales.length > 0 ? Math.max(...obrasSociales.map(os => os.id)) + 1 : 1;
        obrasSociales.push({
            id: nuevoId,
            nombre: nombre,
            descuento: parseFloat(descuento)
        });
        toastSystem.showSuccess(`✅ Obra social "${nombre}" agregada correctamente.`);
    }
    
    guardarObrasSociales(obrasSociales);
    cargarObrasSocialesTabla();
    cargarObrasSociales(); 
    nombreInput.value = '';
    descuentoInput.value = '';
}

function editarObraSocial(id) {
    const obrasSociales = obtenerObrasSociales();
    const obraSocial = obrasSociales.find(os => os.id === id);
    
    if (obraSocial) {
        document.getElementById("nombreObraSocial").value = obraSocial.nombre;
        document.getElementById("descuentoObraSocial").value = obraSocial.descuento || 0;
        obraSocialEditando = id;
        document.querySelector('#formObraSocial button[type="submit"]').innerHTML = '<i class="bi bi-check"></i> Actualizar';
        document.getElementById("nombreObraSocial").focus();
    }
}

function eliminarObraSocial(id) {
    if (confirm('¿Estás seguro de que querés eliminar esta obra social?')) {
        const obrasSociales = obtenerObrasSociales();
        const obraSocial = obrasSociales.find(os => os.id === id);
        
        // Verificar si hay médicos usando esta obra social
        const medicos = obtenerMedicos();
        const medicosConObraSocial = medicos.filter(medico => 
            medico.obrasSociales && medico.obrasSociales.includes(id)
        );
        
        if (medicosConObraSocial.length > 0) {
            toastSystem.showWarning(`⚠️ No se puede eliminar la obra social porque ${medicosConObraSocial.length} médico(s) la aceptan.`);
            return;
        }
        
        const nuevasObrasSociales = obrasSociales.filter(os => os.id !== id);
        guardarObrasSociales(nuevasObrasSociales);
        cargarObrasSocialesTabla();
        cargarObrasSociales(); // Actualizar el desplegable
        toastSystem.showSuccess('✅ Obra social eliminada correctamente.');
    }
}

// =============== GESTIÓN DE TURNOS ===============

function cargarTurnos() {
    const tbodyTurnos = document.getElementById("tbodyTurnos");
    if (!tbodyTurnos) return;
    
    const turnos = obtenerTurnos();
    const medicos = obtenerMedicos();
    
    tbodyTurnos.innerHTML = turnos.map(turno => {
        const medico = medicos.find(m => m.id === turno.medicoId);
        const fechaHora = new Date(turno.fechaHora);
        const fechaFormateada = fechaHora.toLocaleDateString('es-AR');
        const horaFormateada = fechaHora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <tr>
                <td>${turno.id}</td>
                <td>${medico ? `${medico.nombre} ${medico.apellido}` : 'Médico no encontrado'}</td>
                <td class="d-none d-lg-table-cell">${fechaFormateada} ${horaFormateada}</td>
                <td>
                    <span class="text-white p-2 badge ${turno.disponible ? 'bg-success' : 'bg-danger'}">
                        ${turno.disponible ? 'Disponible' : 'Ocupado'}
                    </span>
                </td>

                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="editarTurno(${turno.id})" title="Modificar">
                            <i class="bi bi-pencil"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Modificar</span>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarTurno(${turno.id})" title="Eliminar">
                            <i class="bi bi-trash"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Eliminar</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Variables globales para turnos
let turnoEditando = null;

// Editar turno
function editarTurno(id) {
    const turnos = obtenerTurnos();
    const turno = turnos.find(t => t.id === id);
    
    if (turno) {
        const fechaHora = new Date(turno.fechaHora);
        const fecha = fechaHora.toISOString().split('T')[0];
        const hora = fechaHora.toTimeString().split(' ')[0].substring(0, 5);
        
        document.getElementById("medicoTurno").value = turno.medicoId;
        document.getElementById("fechaTurno").value = fecha;
        document.getElementById("horaTurno").value = hora;
        
        turnoEditando = id;
        document.querySelector('#formTurno button[type="submit"]').innerHTML = '<i class="bi bi-check"></i> Actualizar Turno';
        
        document.getElementById("fechaTurno").focus();
    }
}

function guardarTurno(e) {
    e.preventDefault();
    
    const medicoId = document.getElementById("medicoTurno").value;
    const fecha = document.getElementById("fechaTurno").value;
    const hora = document.getElementById("horaTurno").value;
    
    if (!medicoId || !fecha || !hora) {
        toastSystem.showError('⚠️ Por favor, completá todos los campos.');
        return;
    }
    
    const fechaHora = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    
    if (fechaHora <= ahora) {
        toastSystem.showError('⚠️ La fecha y hora del turno deben ser futuras.');
        return;
    }
    
    const turnos = obtenerTurnos();
    
    if (turnoEditando) {
        // Editar turno existente
        const index = turnos.findIndex(t => t.id === turnoEditando);
        if (index !== -1) {
            turnos[index] = {
                ...turnos[index],
                medicoId: parseInt(medicoId),
                fechaHora: fechaHora.toISOString()
            };
            toastSystem.showSuccess('✅ Turno actualizado correctamente.');
        }
        turnoEditando = null;
        document.querySelector('#formTurno button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Crear Turno';
    } else {
        // Crear nuevo turno
        const nuevoId = turnos.length > 0 ? Math.max(...turnos.map(t => t.id)) + 1 : 1;
        turnos.push({
            id: nuevoId,
            medicoId: parseInt(medicoId),
            fechaHora: fechaHora.toISOString(),
            disponible: true
        });
        toastSystem.showSuccess('✅ Turno creado correctamente.');
    }
    
    guardarTurnos(turnos);
    cargarTurnos();
    document.getElementById("formTurno").reset();
}

// Resetear el formulario de turnos
function resetFormTurno() {
    document.getElementById("formTurno").reset();
    turnoEditando = null;
    document.querySelector('#formTurno button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Crear Turno';
}

function eliminarTurno(id) {
    if (confirm('¿Estás seguro de que querés eliminar este turno?')) {
        const turnos = obtenerTurnos();
        const turno = turnos.find(t => t.id === id);
        
        if (turno && !turno.disponible) {
            toastSystem.showError('⚠️ No se puede eliminar un turno que ya está reservado.');
            return;
        }
        
        const nuevosTurnos = turnos.filter(t => t.id !== id);
        guardarTurnos(nuevosTurnos);
        cargarTurnos();
        toastSystem.showSuccess('✅ Turno eliminado correctamente.');
    }
}

// =============== GESTIÓN DE RESERVAS ===============

function cargarReservas() {
    const tbodyReservas = document.getElementById("tbodyReservas");
    if (!tbodyReservas) return;
    
    const reservas = obtenerReservas();
    const medicos = obtenerMedicos();
    const especialidades = obtenerEspecialidades();
    const obrasSociales = obtenerObrasSociales();
    
    tbodyReservas.innerHTML = reservas.map(reserva => {
        const medico = medicos.find(m => m.id === reserva.medicoId);
        const especialidad = especialidades.find(esp => esp.id === reserva.especialidadId);
        const obraSocial = obrasSociales.find(os => os.id === reserva.obraSocialId);
        const fechaHora = new Date(reserva.fechaHora);
        const fechaFormateada = fechaHora.toLocaleDateString('es-AR');
        const horaFormateada = fechaHora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <tr>
                <td>${reserva.id}</td>
                <td>${reserva.pacienteNombre} (Doc: ${reserva.pacienteDocumento})</td>
                <td>${medico ? `${medico.nombre} ${medico.apellido}` : 'Médico no encontrado'}</td>
                <td class="d-none d-lg-table-cell">${especialidad ? especialidad.nombre : 'Especialidad no encontrada'}</td>
                <td class="d-none d-lg-table-cell">${obraSocial ? obraSocial.nombre : 'Obra social no encontrada'}</td>
                <td class="d-none d-lg-table-cell">${fechaFormateada} ${horaFormateada}</td>
                <td class="d-none d-lg-table-cell">$${reserva.valorTotal.toLocaleString('es-AR')}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="verDetalleReserva(${reserva.id})" title="Ver">
                            <i class="bi bi-search"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Ver</span>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${reserva.id})" title="Eliminar">
                            <i class="bi bi-trash"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Cancelar</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function verDetalleReserva(id) {
    const reservas = obtenerReservas();
    const reserva = reservas.find(r => r.id === id);
    
    if (reserva) {
        toastSystem.showInfo(`📋 Paciente: ${reserva.pacienteNombre}\nDocumento: ${reserva.pacienteDocumento}\nValor: $${reserva.valorTotal.toLocaleString('es-AR')}`);
    }
}

function cancelarReserva(id) {
    if (confirm('¿Estás seguro de que querés cancelar esta reserva?')) {
        const reservas = obtenerReservas();
        const reserva = reservas.find(r => r.id === id);
        
        if (reserva) {
            // Liberar el turno
            const turnos = obtenerTurnos();
            const turnoIndex = turnos.findIndex(t => t.id === reserva.turnoId);
            if (turnoIndex !== -1) {
                turnos[turnoIndex].disponible = true;
                guardarTurnos(turnos);
            }
            
            // Eliminar la reserva
            const nuevasReservas = reservas.filter(r => r.id !== id);
            guardarReservas(nuevasReservas);
            cargarReservas();
            cargarTurnos();
            toastSystem.showSuccess('✅ Reserva cancelada correctamente.');
        }
    }
}

// =============== GESTIÓN MÉDICOS ===============

function cargarMedicos() {
    const tbodyMedicos = document.getElementById("tbodyMedicos");
    if (!tbodyMedicos) return;
    
    tbodyMedicos.innerHTML = medicos.map(medico => {
        // Verificar si el médico tiene obras sociales
        let obrasSocialesTexto = '<span class="text-muted">Sin obras sociales</span>';
        
        if (medico.obrasSociales && Array.isArray(medico.obrasSociales) && medico.obrasSociales.length > 0) {
            // Filtrar obras sociales válidas y obtener solo sus nombres
            const nombresObras = medico.obrasSociales
                .map(id => {
                    const obra = obtenerObrasSociales().find(os => os.id === id);
                    return obra ? obra.nombre : null;
                })
                .filter(nombre => nombre !== null);
            
            if (nombresObras.length > 0) {
                obrasSocialesTexto = nombresObras.join(', ');
            }
        }
        
        return `
            <tr>
                <td>${medico.id}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${medico.imagen || '../img/doctor-default.png'}" alt="${medico.nombre}" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;">
                        <span>${medico.nombre} ${medico.apellido}</span>
                    </div>
                </td>
                <td class="d-none d-md-table-cell">${obtenerNombreEspecialidad(medico.especialidad)}</td>
                <td class="d-none d-md-table-cell">${medico.matricula}</td>
                <td class="d-none d-md-table-cell">$${medico.valorConsulta ? medico.valorConsulta.toLocaleString('es-AR') : '0'}</td>
                <td class="d-none d-md-table-cell">${obrasSocialesTexto}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm" onclick="editarMedico(${medico.id})" title="Modificar">
                            <i class="bi bi-pencil"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Modificar</span>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarMedico(${medico.id})" title="Eliminar">
                            <i class="bi bi-trash"></i>
                            <span class="text-white d-none d-xl-inline ms-1">Eliminar</span>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function guardarMedico() {
    const nombre = document.getElementById("nombreMedico").value.trim();
    const apellido = document.getElementById("nombreApellido").value.trim();
    const especialidadSelect = document.getElementById("especialidad");
    const especialidadId = especialidadSelect.value;
    const matricula = document.getElementById("matriculaMedico").value.trim();
    const valorConsulta = document.getElementById("valorConsulta").value.trim();
    const descripcion = document.getElementById("descripcionMedico").value.trim();
    
    // Obtener obras sociales seleccionadas del desplegable
    const obrasSocialesIds = getObrasSeleccionadas();

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
    if (!validarEspecialidad(especialidadId)) {
        mostrarError('especialidad', 'Debe seleccionar una especialidad');
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

    // Validar valor consulta
    if (!validarValorConsulta(valorConsulta)) {
        mostrarError('valorConsulta', 'El valor de consulta debe ser un número mayor a 0');
        formularioValido = false;
    } else {
        limpiarError('valorConsulta');
    }

    // Validar descripción
    if (!validarDescripcion(descripcion)) {
        mostrarError('descripcionMedico', 'La descripción debe tener entre 10 y 500 caracteres');
        formularioValido = false;
    } else {
        limpiarError('descripcionMedico');
    }

    if (!formularioValido) {
        toastSystem.showError('⚠️ Por favor, corregí los errores en el formulario antes de continuar.');
        return;
    }

    if (!nombre || !apellido || !especialidadId || !matricula || !valorConsulta || !descripcion) {
        toastSystem.showError('⚠️ Por favor, completá todos los campos obligatorios.');
        return;
    }

    if (medicoEditando) {
        const index = medicos.findIndex(m => m.id === medicoEditando);
        if (index !== -1) {
            medicos[index] = {
                ...medicos[index],  
                nombre: nombre, 
                apellido: apellido,  
                especialidad: parseInt(especialidadId),
                matricula: matricula,
                valorConsulta: parseFloat(valorConsulta),
                descripcion: descripcion,
                imagen: imagenSeleccionada || medicos[index].imagen,
                obrasSociales: obrasSocialesIds
            };
            toastSystem.showSuccess('✅ Médico actualizado correctamente.');
        }
        medicoEditando = null;
        document.querySelector('#formMedico button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar';
    } else {
        const nuevoId = medicos.length > 0 ? Math.max(...medicos.map(m => m.id)) + 1 : 1;
        const medicoData = {
            id: nuevoId,
            nombre,
            apellido,
            especialidad: parseInt(especialidadId),
            matricula,
            valorConsulta: parseFloat(valorConsulta),
            descripcion,
            imagen: imagenSeleccionada || '../img/doctor-default.png',
            obrasSociales: obrasSocialesIds
        };
        medicos.push(medicoData);
        toastSystem.showSuccess(`✅ Médico agregado: ${nombre} ${apellido}`);
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
        document.getElementById("valorConsulta").value = medico.valorConsulta || '';
        document.getElementById("descripcionMedico").value = medico.descripcion || '';
        
        // Preseleccionar obras sociales en el desplegable
        setObrasSeleccionadas(medico.obrasSociales || []);
        
        // Limpiar errores al editar
        limpiarError('nombreMedico');
        limpiarError('nombreApellido');
        limpiarError('especialidad');
        limpiarError('matriculaMedico');
        limpiarError('valorConsulta');
        limpiarError('descripcionMedico');
        
        medicoEditando = id;
        document.querySelector('#formMedico button[type="submit"]').innerHTML = '<i class="bi bi-check"></i> Actualizar';
        
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
        toastSystem.showSuccess('✅ Médico eliminado correctamente.');
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
    document.querySelector('#formMedico button[type="submit"]').innerHTML = '<i class="bi bi-plus"></i> Agregar';
    
    // Limpiar selección de obras sociales
    const checks = document.querySelectorAll('#listaObrasSociales input[type="checkbox"]');
    checks.forEach(check => {
        check.checked = false;
    });
    actualizarObrasSeleccionadas();
    
    // Limpiar todos los errores
    limpiarError('nombreMedico');
    limpiarError('nombreApellido');
    limpiarError('especialidad');
    limpiarError('matriculaMedico');
    limpiarError('valorConsulta');
    limpiarError('descripcionMedico');
}

// =============== INICIALIZACIÓN DE LA PÁGINA ===============

document.addEventListener("DOMContentLoaded", () => {
    // 🔐 Recuperar sesión desde sessionStorage o localStorage (recordarme)
    let usuario = JSON.parse(sessionStorage.getItem("usuarioActivo"));
    if (!usuario) {
        const recordado = localStorage.getItem("usuarioRecordado");
        if (recordado) {
            usuario = JSON.parse(recordado);
            sessionStorage.setItem("usuarioActivo", recordado);
        }
    }

    // 🚫 Si no hay usuario o no es admin → redirigir
    if (!usuario || usuario.rol !== "admin") {
        window.location.href = "../views/login.html";
        return;
    }

    // 👤 Mostrar usuario activo
    const usuarioActivoLabel = document.getElementById("usuarioActivo");
    if (usuarioActivoLabel) {
        usuarioActivoLabel.textContent = `Bienvenido, ${usuario.rol} - ${usuario.nombre}`;
    }

    // 🚪 Cerrar sesión
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            sessionStorage.removeItem("usuarioActivo");
            localStorage.removeItem("usuarioRecordado");
            window.location.href = "../views/login.html";
        });
    }

    // =================== INICIALIZACIÓN DATOS ===================
    inicializarDatos();
    medicos = obtenerMedicos();

    console.log('=== VERIFICACIÓN DE DATOS ===');
    console.log('Médicos:', medicos);
    console.log('Especialidades:', obtenerEspecialidades());
    console.log('Obras Sociales:', obtenerObrasSociales());
    console.log('Turnos:', obtenerTurnos());
    console.log('Reservas:', obtenerReservas());
    console.log('========================');

    // Configurar formularios y eventos
    const selectEspecialidad = document.getElementById('especialidad');
    if (selectEspecialidad) {
        cargarOpcionesEspecialidades(selectEspecialidad);
    }

    // Inicializar desplegable de obras sociales
    initObrasSociales();

    // Cargar opciones de médicos para turnos
    const selectMedicoTurno = document.getElementById('medicoTurno');
    if (selectMedicoTurno) {
        cargarOpcionesMedicos(selectMedicoTurno);
    }

    // Cargar todos los datos en las tablas
    cargarMedicos();
    cargarEspecialidades();
    cargarObrasSocialesTabla();
    cargarTurnos();
    cargarReservas();

    // Formularios
    const formMedico = document.getElementById("formMedico");
    if (formMedico) formMedico.addEventListener("submit", (e) => {
        e.preventDefault();
        guardarMedico();
    });

    const formEspecialidad = document.getElementById("formEspecialidad");
    if (formEspecialidad) formEspecialidad.addEventListener("submit", guardarEspecialidad);

    const formObraSocial = document.getElementById("formObraSocial");
    if (formObraSocial) formObraSocial.addEventListener("submit", guardarObraSocial);

    const formTurno = document.getElementById("formTurno");
    if (formTurno) formTurno.addEventListener("submit", guardarTurno);

    // Validaciones en tiempo real (no se modifica)
    const nombreInput = document.getElementById("nombreMedico");
    const apellidoInput = document.getElementById("nombreApellido");
    const matriculaInput = document.getElementById("matriculaMedico");
    const valorConsultaInput = document.getElementById("valorConsulta");
    const descripcionInput = document.getElementById("descripcionMedico");

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

    if (matriculaInput) {
        matriculaInput.addEventListener('blur', () => {
            const valor = matriculaInput.value.trim();
            if (!validarMatricula(valor)) {
                mostrarError('matriculaMedico', 'La matrícula debe contener solo números (máximo 4 dígitos)');
            } else {
                limpiarError('matriculaMedico');
            }
        });
        matriculaInput.addEventListener('input', () => {
            matriculaInput.value = matriculaInput.value.replace(/[^\d]/g, '');
        });
    }

    if (valorConsultaInput) {
        valorConsultaInput.addEventListener('blur', () => {
            const valor = valorConsultaInput.value.trim();
            if (!validarValorConsulta(valor)) {
                mostrarError('valorConsulta', 'El valor de consulta debe ser un número mayor a 0');
            } else {
                limpiarError('valorConsulta');
            }
        });
    }

    if (descripcionInput) {
        descripcionInput.addEventListener('blur', () => {
            const valor = descripcionInput.value.trim();
            if (!validarDescripcion(valor)) {
                mostrarError('descripcionMedico', 'La descripción debe tener entre 10 y 500 caracteres');
            } else {
                limpiarError('descripcionMedico');
            }
        });
    }

    // Img médico
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
                toastSystem.showSuccess('✅ Imagen del médico guardada correctamente.');
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalImagen'));
                if (modal) modal.hide();
            } else {
                toastSystem.showError('⚠️ Por favor, seleccioná una imagen antes de guardar.');
            }
        });
    }
});


// Función de reseteo para debugging
window.resetearDatos = function() {
    console.log('🔄 Reseteando todos los datos...');
    localStorage.removeItem('medicosStorage');
    localStorage.removeItem('especialidades');
    localStorage.removeItem('obrasSociales');
    localStorage.removeItem('turnos');
    localStorage.removeItem('reservas');
    
    // Reinicializar
    inicializarDatos();
    
    medicos = obtenerMedicos();
    cargarMedicos();
    cargarEspecialidades();
    cargarObrasSocialesTabla();
    cargarTurnos();
    cargarReservas();
    
    toastSystem.showInfo('✅ Datos reseteados correctamente');
    console.log('✅ Datos reseteados correctamente');
    console.log('Médicos actualizados:', medicos);
};
