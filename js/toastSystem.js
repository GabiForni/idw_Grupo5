// toastSystem.js - CORREGIDO
const toastSystem = {
    success: null,
    error: null,
    warning: null,
    info: null,
    
    init: function() {
        this.success = new bootstrap.Toast(document.getElementById('toastSuccess'));
        this.error = new bootstrap.Toast(document.getElementById('toastError'));
        this.warning = new bootstrap.Toast(document.getElementById('toastWarning'));
        this.info = new bootstrap.Toast(document.getElementById('toastInfo'));
    },
    
    showSuccess: function(message) {
        document.getElementById('toastSuccessMessage').textContent = message;
        this.success.show();
    },
    
    showError: function(message) {
        document.getElementById('toastErrorMessage').textContent = message;
        this.error.show();
    },
    
    showWarning: function(message) {
        document.getElementById('toastWarningMessage').textContent = message;
        this.warning.show();
    },
    
    showInfo: function(message) {
        document.getElementById('toastInfoMessage').textContent = message;
        this.info.show();
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    toastSystem.init();
});