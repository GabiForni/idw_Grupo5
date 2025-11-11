// turnos.js
const turnosIniciales = [
    // Turnos para Raúl Gutierrez (Cardiología - ID: 1)
    { id: 1, medicoId: 1, fechaHora: "2025-11-17T09:00:00", disponible: true },
    { id: 2, medicoId: 1, fechaHora: "2025-11-18T10:30:00", disponible: true },
    { id: 3, medicoId: 1, fechaHora: "2025-11-25T14:00:00", disponible: false},
    { id: 4, medicoId: 1, fechaHora: "2025-12-02T11:00:00", disponible: false},
    { id: 5, medicoId: 1, fechaHora: "2026-01-15T16:00:00", disponible: true },
    { id: 6, medicoId: 1, fechaHora: "2026-02-10T09:30:00", disponible: true },

    // Turnos para Lucía Pérez (Pediatría - ID: 2)
    { id: 7, medicoId: 2, fechaHora: "2025-11-19T08:00:00", disponible: true },
    { id: 8, medicoId: 2, fechaHora: "2025-11-20T13:00:00", disponible: false },
    { id: 9, medicoId: 2, fechaHora: "2025-12-05T10:00:00", disponible: true },
    { id: 10, medicoId: 2, fechaHora: "2026-01-12T15:30:00", disponible: true },
    { id: 11, medicoId: 2, fechaHora: "2026-01-28T11:00:00", disponible: true },
    { id: 12, medicoId: 2, fechaHora: "2026-02-14T14:00:00", disponible: false },

    // Turnos para Carlos Rivas (Dermatología - ID: 3)
    { id: 13, medicoId: 3, fechaHora: "2025-11-21T09:00:00", disponible: false },
    { id: 14, medicoId: 3, fechaHora: "2025-11-24T16:00:00", disponible: false },
    { id: 15, medicoId: 3, fechaHora: "2025-12-10T11:30:00", disponible: true },
    { id: 16, medicoId: 3, fechaHora: "2026-01-22T10:00:00", disponible: true },
    { id: 17, medicoId: 3, fechaHora: "2026-02-05T15:00:00", disponible: true },
    { id: 18, medicoId: 3, fechaHora: "2026-02-25T08:30:00", disponible: false },

    // Turnos para Ana Gómez (Nutrición - ID: 4)
    { id: 19, medicoId: 4, fechaHora: "2025-11-26T10:00:00", disponible: true },
    { id: 20, medicoId: 4, fechaHora: "2025-12-01T14:00:00", disponible: false },
    { id: 21, medicoId: 4, fechaHora: "2025-12-15T09:00:00", disponible: true },
    { id: 22, medicoId: 4, fechaHora: "2026-01-18T16:30:00", disponible: true },
    { id: 23, medicoId: 4, fechaHora: "2026-02-08T11:00:00", disponible: true },
    { id: 24, medicoId: 4, fechaHora: "2026-02-20T13:00:00", disponible: true },

    // Turnos para Sofía Torres (Ginecología - ID: 5)
    { id: 25, medicoId: 5, fechaHora: "2025-11-27T08:30:00", disponible: true },
    { id: 26, medicoId: 5, fechaHora: "2025-12-03T15:00:00", disponible: false },
    { id: 27, medicoId: 5, fechaHora: "2025-12-20T10:00:00", disponible: true },
    { id: 28, medicoId: 5, fechaHora: "2026-01-25T14:30:00", disponible: false },
    { id: 29, medicoId: 5, fechaHora: "2026-02-12T09:00:00", disponible: true },
    { id: 30, medicoId: 5, fechaHora: "2026-02-26T16:00:00", disponible: true },

    // Turnos para Hugo Castro (Kinesiología - ID: 6)
    { id: 31, medicoId: 6, fechaHora: "2025-11-28T09:00:00", disponible: true },
    { id: 32, medicoId: 6, fechaHora: "2025-12-04T11:00:00", disponible: false },
    { id: 33, medicoId: 6, fechaHora: "2025-12-25T15:30:00", disponible: false },
    { id: 34, medicoId: 6, fechaHora: "2026-01-30T08:00:00", disponible: true },
    { id: 35, medicoId: 6, fechaHora: "2026-02-15T13:00:00", disponible: true },
    { id: 36, medicoId: 6, fechaHora: "2026-02-28T10:30:00", disponible: true }
];

