// reservas.js - Sistema de reserva de turnos para pacientes
document.addEventListener("DOMContentLoaded", function() {
    inicializarFormularioReserva();
});

function inicializarFormularioReserva() {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaNacimiento').max = hoy;

    // Cargar datos iniciales
    cargarEspecialidades();
    cargarObrasSociales();

    // Event listeners
    document.getElementById('especialidad').addEventListener('change', cargarMedicos);
    document.getElementById('medico').addEventListener('change', function() {
        mostrarInfoMedico();
        cargarFechasDisponibles();
    });
    document.getElementById('fechaDisponible').addEventListener('change', cargarHorariosDisponibles);
    document.getElementById('horarioDisponible').addEventListener('change', actualizarResumenFinal);
    document.getElementById('obraSocial').addEventListener('change', actualizarResumenFinal);
    
    // Actualizar resumen
    document.getElementById('nombreCompleto').addEventListener('input', actualizarResumenFinal);
    document.getElementById('documento').addEventListener('input', actualizarResumenFinal);
    
    document.getElementById('formTurnoPaciente').addEventListener('submit', procesarReserva);
}

function cargarEspecialidades() {
    const select = document.getElementById('especialidad');
    const especialidades = obtenerEspecialidades();
    
    select.innerHTML = '<option value="">-- Seleccione especialidad --</option>';
    
    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad.id;
        option.textContent = especialidad.nombre;
        select.appendChild(option);
    });
}

function cargarObrasSociales() {
    const select = document.getElementById('obraSocial');
    const obrasSociales = obtenerObrasSociales();
    
    select.innerHTML = '<option value="">-- Seleccione obra social --</option>';
    select.innerHTML += '<option value="0">Particular (sin obra social)</option>';
    
    obrasSociales.forEach(obra => {
        const option = document.createElement('option');
        option.value = obra.id;
        option.textContent = `${obra.nombre} (${obra.descuento}% desc.)`;
        select.appendChild(option);
    });
}

function cargarMedicos() {
    const especialidadId = parseInt(this.value);
    const selectMedico = document.getElementById('medico');
    
    // Limpiar y resetear
    selectMedico.innerHTML = '<option value="">-- Seleccione médico --</option>';
    selectMedico.disabled = !especialidadId;
    
    if (!especialidadId) {
        document.getElementById('infoMedicoContainer').style.display = 'none';
        document.getElementById('fechaDisponible').disabled = true;
        document.getElementById('horarioDisponible').disabled = true;
        document.getElementById('resumenFinal').style.display = 'none';
        return;
    }

    const medicos = obtenerMedicos();
    const medicosFiltrados = medicos.filter(medico => medico.especialidad === especialidadId);
    
    medicosFiltrados.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nombre} ${medico.apellido}`;
        selectMedico.appendChild(option);
    });
}

function mostrarInfoMedico() {
    const medicoId = parseInt(document.getElementById('medico').value);
    const container = document.getElementById('infoMedicoContainer');
    
    if (!medicoId) {
        container.style.display = 'none';
        return;
    }

    const medicos = obtenerMedicos();
    const medico = medicos.find(m => m.id === medicoId);
    
    if (medico) {
        document.getElementById('medicoValor').textContent = medico.valorConsulta?.toLocaleString('es-AR') || '0';
        container.style.display = 'block';
    }
}

function cargarFechasDisponibles() {
    const medicoId = parseInt(document.getElementById('medico').value);
    const selectFecha = document.getElementById('fechaDisponible');
    const selectHorario = document.getElementById('horarioDisponible');
    
    // Resetear
    selectFecha.innerHTML = '<option value="">-- Seleccione fecha --</option>';
    selectFecha.disabled = !medicoId;
    selectHorario.innerHTML = '<option value="">-- Seleccione fecha primero --</option>';
    selectHorario.disabled = true;
    document.getElementById('resumenFinal').style.display = 'none';
    
    if (!medicoId) return;

    const turnos = obtenerTurnos();
    
    const fechasUnicas = [...new Set(
        turnos
            .filter(turno => turno.disponible && turno.medicoId === medicoId)
            .map(turno => {
                // Manejar tanto fechaHora como fecha directamente
                if (turno.fechaHora) {
                    return new Date(turno.fechaHora).toISOString().split('T')[0];
                } else if (turno.fecha) {
                    return turno.fecha;
                }
                return null;
            })
    )].filter(fecha => fecha !== null).sort();

    console.log('Fechas disponibles encontradas:', fechasUnicas);

    if (fechasUnicas.length === 0) {
        selectFecha.innerHTML = '<option value="">No hay fechas disponibles</option>';
        return;
    }

    fechasUnicas.forEach(fecha => {
        const fechaObj = new Date(fecha);
        const option = document.createElement('option');
        option.value = fecha;
        option.textContent = fechaObj.toLocaleDateString('es-AR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        selectFecha.appendChild(option);
    });
    
    selectFecha.disabled = false;
}

function cargarHorariosDisponibles() {
    const fechaSeleccionada = this.value;
    const medicoId = parseInt(document.getElementById('medico').value);
    const selectHorario = document.getElementById('horarioDisponible');
    
    selectHorario.innerHTML = '<option value="">-- Seleccione horario --</option>';
    selectHorario.disabled = !fechaSeleccionada;
    
    if (!fechaSeleccionada || !medicoId) {
        return;
    }

    const turnos = obtenerTurnos();
    const turnosDisponibles = turnos.filter(turno => {
        let turnoDate;
        if (turno.fechaHora) {
            turnoDate = new Date(turno.fechaHora).toISOString().split('T')[0];
        } else if (turno.fecha) {
            turnoDate = turno.fecha;
        } else {
            return false;
        }
        
        return turno.disponible && 
               turno.medicoId === medicoId && 
               turnoDate === fechaSeleccionada;
    });

    console.log('Turnos disponibles para fecha:', turnosDisponibles);

    if (turnosDisponibles.length === 0) {
        selectHorario.innerHTML = '<option value="">No hay horarios disponibles</option>';
    } else {
        turnosDisponibles.forEach(turno => {
            let hora;
            if (turno.fechaHora) {
                const fechaHora = new Date(turno.fechaHora);
                hora = fechaHora.toLocaleTimeString('es-AR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } else if (turno.hora) {
                hora = turno.hora;
            } else {
                return;
            }
            
            const option = document.createElement('option');
            option.value = turno.id;
            option.textContent = hora;
            selectHorario.appendChild(option);
        });
    }
    
    selectHorario.disabled = false;
    actualizarResumenFinal();
}

function actualizarResumenFinal() {
    const resumen = document.getElementById('resumenFinal');
    const btnConfirmar = document.getElementById('btnConfirmar');
    
    const medicoId = parseInt(document.getElementById('medico').value);
    const fechaSeleccionada = document.getElementById('fechaDisponible').value;
    const horarioSeleccionado = document.getElementById('horarioDisponible').value;
    const obraSocialId = parseInt(document.getElementById('obraSocial').value);
    const nombrePaciente = document.getElementById('nombreCompleto').value.trim();
    const documentoPaciente = document.getElementById('documento').value.trim();
    
    const datosCompletos = medicoId && fechaSeleccionada && horarioSeleccionado && 
                          obraSocialId >= 0 && nombrePaciente && documentoPaciente;
    
    if (!datosCompletos) {
        resumen.style.display = 'none';
        btnConfirmar.disabled = true;
        return;
    }

    // Calcular datos para el resumen
    const medicos = obtenerMedicos();
    const especialidades = obtenerEspecialidades();
    const obrasSociales = obtenerObrasSociales();
    const turnos = obtenerTurnos();
    
    const medico = medicos.find(m => m.id === medicoId);
    const especialidad = especialidades.find(e => e.id === medico.especialidad);
    const obraSocial = obraSocialId === 0 ? 
        { nombre: 'Particular', descuento: 0 } : 
        obrasSociales.find(os => os.id === obraSocialId);
    const turno = turnos.find(t => t.id === parseInt(horarioSeleccionado));
    
    // Calcular valor final
    let valorFinal = medico.valorConsulta || 0;
    let descuentoAplicado = 0;
    
    if (obraSocial && obraSocial.descuento) {
        descuentoAplicado = (valorFinal * obraSocial.descuento) / 100;
        valorFinal -= descuentoAplicado;
    }
    
    // Formatear fecha y hora
    let fechaFormateada, horaFormateada;
    if (turno && turno.fechaHora) {
        const fechaHora = new Date(turno.fechaHora);
        fechaFormateada = fechaHora.toLocaleDateString('es-AR');
        horaFormateada = fechaHora.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    } else {
        fechaFormateada = new Date(fechaSeleccionada).toLocaleDateString('es-AR');
        horaFormateada = 'Horario no especificado';
    }

    // Actualizar resumen
    document.getElementById('resumenMedico').textContent = `Dr. ${medico.nombre} ${medico.apellido}`;
    document.getElementById('resumenEspecialidad').textContent = especialidad ? especialidad.nombre : '';
    document.getElementById('resumenFecha').textContent = fechaFormateada;
    document.getElementById('resumenHorario').textContent = horaFormateada;
    document.getElementById('resumenPaciente').textContent = `${nombrePaciente} (${documentoPaciente})`;
    document.getElementById('resumenObraSocial').textContent = obraSocial ? obraSocial.nombre : '';
    document.getElementById('resumenTotal').textContent = `$${valorFinal.toLocaleString('es-AR')}`;
    
    resumen.style.display = 'block';
    btnConfirmar.disabled = false;
}

function procesarReserva(e) {
    e.preventDefault();
    
    const turnoId = parseInt(document.getElementById('horarioDisponible').value);
    const medicoId = parseInt(document.getElementById('medico').value);
    const especialidadId = parseInt(document.getElementById('especialidad').value);
    const obraSocialId = parseInt(document.getElementById('obraSocial').value);
    
    // Validar datos personales
    const documento = document.getElementById('documento').value.trim();
    const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    
    if (!documento || !nombreCompleto || !fechaNacimiento) {
        alert('Por favor complete todos los datos personales');
        return;
    }

    const reservaData = {
        pacienteDocumento: documento,
        pacienteNombre: nombreCompleto,
        fechaNacimiento: fechaNacimiento,
        tipoDocumento: tipoDocumento
    };

    // Crear reserva
    if (crearReserva(turnoId, medicoId, especialidadId, obraSocialId, reservaData)) {
        mostrarResumenReserva(turnoId);
        document.getElementById('formTurnoPaciente').reset();
        document.getElementById('btnConfirmar').disabled = true;
        document.getElementById('infoMedicoContainer').style.display = 'none';
        document.getElementById('resumenFinal').style.display = 'none';
        document.getElementById('horarioContainer').style.display = 'none';
        
        // Resetear selects
        cargarEspecialidades();
        cargarObrasSociales();
        
        document.getElementById('medico').innerHTML = '<option value="">-- Seleccione médico --</option>';
        document.getElementById('medico').disabled = true;
        document.getElementById('fechaDisponible').innerHTML = '<option value="">-- Seleccione fecha --</option>';
        document.getElementById('fechaDisponible').disabled = true;
        document.getElementById('horarioDisponible').innerHTML = '<option value="">-- Seleccione horario --</option>';
        document.getElementById('horarioDisponible').disabled = true;
    }
}

function crearReserva(turnoId, medicoId, especialidadId, obraSocialId, pacienteData) {
    try {
        const turnos = obtenerTurnos();
        const reservas = obtenerReservas();
        const medicos = obtenerMedicos();
        const obrasSociales = obtenerObrasSociales();
        
        // Verificar que el turno sigue disponible
        const turno = turnos.find(t => t.id === turnoId);
        if (!turno || !turno.disponible) {
            alert('El turno seleccionado ya no está disponible');
            return false;
        }

        // Calcular valor total
        const medico = medicos.find(m => m.id === medicoId);
        let valorTotal = medico.valorConsulta || 0;
        
        if (obraSocialId > 0) {
            const obraSocial = obrasSociales.find(os => os.id === obraSocialId);
            if (obraSocial && obraSocial.descuento) {
                valorTotal -= (valorTotal * obraSocial.descuento) / 100;
            }
        }

        // Crear nueva reserva
        const nuevaReserva = {
            id: reservas.length > 0 ? Math.max(...reservas.map(r => r.id)) + 1 : 1,
            turnoId: turnoId,
            medicoId: medicoId,
            especialidadId: especialidadId,
            obraSocialId: obraSocialId,
            pacienteDocumento: pacienteData.pacienteDocumento,
            pacienteNombre: pacienteData.pacienteNombre,
            fechaNacimiento: pacienteData.fechaNacimiento,
            tipoDocumento: pacienteData.tipoDocumento,
            fechaHora: turno.fechaHora || new Date().toISOString(),
            valorTotal: valorTotal,
            fechaReserva: new Date().toISOString()
        };

        // Actualizar turno como no disponible
        turno.disponible = false;
        
        // Guardar cambios
        reservas.push(nuevaReserva);
        guardarReservas(reservas);
        guardarTurnos(turnos);
        
        return true;
    } catch (error) {
        console.error('Error al crear reserva:', error);
        alert('Error al procesar la reserva');
        return false;
    }
}

function mostrarResumenReserva(turnoId) {
    const reservas = obtenerReservas();
    const reserva = reservas.find(r => r.turnoId === turnoId);
    const turnos = obtenerTurnos();
    const turno = turnos.find(t => t.id === turnoId);
    
    if (reserva && turno) {
        let fecha, hora;
        if (turno.fechaHora) {
            const fechaHora = new Date(turno.fechaHora);
            fecha = fechaHora.toLocaleDateString('es-AR');
            hora = fechaHora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
        } else {
            fecha = 'Fecha no especificada';
            hora = 'Hora no especificada';
        }
        
        // Crear elemento de resumen si no existe
        let resumenElement = document.getElementById('resumenReserva');
        if (!resumenElement) {
            resumenElement = document.createElement('div');
            resumenElement.id = 'resumenReserva';
            resumenElement.className = 'alert alert-light mt-3';
            resumenElement.style.display = 'block';
            document.querySelector('main').insertBefore(resumenElement, document.querySelector('.container-fluid'));
        }
        
        resumenElement.innerHTML = `
            <h4>✅ Reserva confirmada</h4>
            <div class="mt-2">
                <strong>Paciente:</strong> ${reserva.pacienteNombre}<br>
                <strong>Documento:</strong> ${reserva.pacienteDocumento}<br>
                <strong>Fecha:</strong> ${fecha} ${hora}<br>
                <strong>Valor:</strong> $${reserva.valorTotal.toLocaleString('es-AR')}<br>
                <strong>N° Reserva:</strong> ${reserva.id}
            </div>
        `;
        
        setTimeout(() => {
            resumenElement.style.display = 'none';
        }, 10000);
    }
}
