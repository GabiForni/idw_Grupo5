let profesionales = [];
let currentPage = 1;
const itemsPerPage = 6;

async function cargarProfesionales() {
  const res = await fetch("../data/medicos.json"); 
  profesionales = await res.json();
  renderPage(currentPage);
  renderPagination();
}

function renderPage(page) {
  const container = document.getElementById("profesionalesContainer");
  container.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = profesionales.slice(start, end);

  items.forEach(prof => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${prof.imagen}" class="card-img-top" alt="${prof.nombre}">
          <div class="card-body">
            <h5 class="card-title">${prof.nombre}</h5>
            <p class="card-text">${prof.descripcion}</p>
            <div class="mb-2">
              ${prof.especialidades.map(e => `<span class="badge bg-primary me-1">${e}</span>`).join("")}
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="rating">
                ${renderStars(prof.calificacion)}
                <span class="ms-1">${prof.calificacion}</span>
              </div>
              <div>
                <span class="availability-dot ${prof.disponibilidad === "available" ? "available":"unavailable"}"></span>
                <small class="text-muted">${prof.disponibilidad === "available" ? "Disponible":"No disponible"}</small>
              </div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between">
              <span><i class="fas fa-graduation-cap me-2"></i>Experiencia</span>
              <span>${prof.experiencia}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span><i class="fas fa-map-marker-alt me-2"></i>Ubicación</span>
              <span>${prof.ubicacion}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span><i class="fas fa-clock me-2"></i>Horario</span>
              <span>${prof.horario}</span>
            </li>
          </ul>
          <div class="card-body d-flex justify-content-between">
            <a href="#" class="btn btn-primary ${prof.disponibilidad !== "available" ? "disabled":""}">
              <i class="fas fa-calendar-check me-1"></i> ${prof.disponibilidad === "available" ? "Reservar":"No disponible"}
            </a>
            <a href="#" class="btn btn-outline-secondary"><i class="fas fa-info-circle me-1"></i> Más info</a>
          </div>
        </div>
      </div>`;
  });
}

function renderPagination() {
  const pageCount = Math.ceil(profesionales.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a href="#" class="page-link" onclick="changePage(${i})">${i}</a>
      </li>`;
  }
}

function changePage(page) {
  currentPage = page;
  renderPage(page);
  renderPagination();
}

function renderStars(rating) {
  let stars = "";
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) stars += `<i class="fas fa-star"></i>`;
  if (half) stars += `<i class="fas fa-star-half-alt"></i>`;
  for (let i = full + (half?1:0); i < 5; i++) stars += `<i class="far fa-star"></i>`;
  return stars;
}

cargarProfesionales();