
// Busca tanto los medicos dados de alta como los ya registrados en localstorage

const obtenerMedicos = () => {
    const medicosStorage = localStorage.getItem('medicosStorage');
    return medicosStorage ? JSON.parse(medicosStorage) : medicosRegistrados;
};

function cargarMedicos() {
    const medicos = obtenerMedicos();
    const container = document.querySelector('.row.g-5');
    
    if (!container) {
        console.log('No se encontró el contenedor de médicos');
        return;
    }
    
    container.innerHTML = medicos.map(medico => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card shadow border-0 rounded-4 card-gradient-bg p-3">
                <img src="${medico.imagen}" class="card-img-top w-100" alt="${medico.nombre} ${medico.apellido}">
                <div class="card-body d-flex flex-column text-center bg-white rounded-3 gap-1">
                    <h5 class="card-title fw-bold">${medico.nombre} ${medico.apellido}</h5>
                    <p class="card-text text-muted mb-0">Matrícula: ${medico.matricula}</p>
                    <p class="card-text text-muted">Especialidad: ${medico.especialidad}</p>
                    <div class="mt-auto">
                        <button class="btn btn-outline-primary rounded-pill w-100 mt-3" type="button" 
                                data-bs-toggle="collapse" data-bs-target="#obras${medico.id}">
                            Obras Sociales
                        </button>
                        <div class="collapse" id="obras${medico.id}">
                            <div class="mt-3">
                                <ul class="list-group list-group-flush small">
                                    ${medico.obrasSociales.map(obra => 
                                        `<li class="list-group-item">${obra}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Inicializa cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profesionales.js cargado - Médicos:', obtenerMedicos());
    cargarMedicos();
});

// Carga cambios del panel de administrador
window.addEventListener('storage', function(e) {
    console.log('Evento storage detectado:', e.key);
    if (e.key === 'medicosStorage') {
        cargarMedicos();
    }
});