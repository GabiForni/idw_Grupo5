// Solo funciones básicas de datos para cargar los selects en el form de reservas de la pagina turnos.html

// =============== ESPECIALIDADES ===============
const obtenerEspecialidades = () => {
    const especialidadesStorage = localStorage.getItem('especialidades');
    return especialidadesStorage ? JSON.parse(especialidadesStorage) : [];
};

// =============== MÉDICOS ===============
const obtenerMedicos = () => {
    const medicosStorage = localStorage.getItem('medicosStorage');
    return medicosStorage ? JSON.parse(medicosStorage) : [];
};

// =============== OBRAS SOCIALES ===============
const obtenerObrasSociales = () => {
    const obrasSocialesStorage = localStorage.getItem('obrasSociales');
    return obrasSocialesStorage ? JSON.parse(obrasSocialesStorage) : [];
};

// =============== TURNOS ===============
const obtenerTurnos = () => {
    const turnosStorage = localStorage.getItem('turnos');
    return turnosStorage ? JSON.parse(turnosStorage) : [];
};

const guardarTurnos = (turnos) => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
};

// =============== RESERVAS ===============
const obtenerReservas = () => {
    const reservasStorage = localStorage.getItem('reservas');
    return reservasStorage ? JSON.parse(reservasStorage) : [];
};

const guardarReservas = (reservas) => {
    localStorage.setItem('reservas', JSON.stringify(reservas));
};
