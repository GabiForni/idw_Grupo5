# Trabajo Final Integrador - Primera Entrega
## Introducción al Desarrollo Web
### Tecnicatura Universitaria en Desarrollo Web - UNER

## Integrantes del Grupo
- [Natalia Gonzalez]
- [Gabriel Forni]
- [Noelia Rodeiro]
- [Fernando Rodriguez]

## Estructura del Proyecto

Este proyecto constituye la primera entrega del Trabajo Final Integrador para la materia Introducción al Desarrollo Web. Consiste en un sitio web básico con múltiples páginas interconectadas que sienta las bases para el desarrollo posterior.

### Páginas implementadas

1. **index.html** - Página de inicio/portada
2. **institucional.html** - Página de información institucional
3. **profesionales.html** - Página de información sobre los profesionales de la institución
4. **contacto.html** - Página de contacto
5. **turnos.html** - Página para reservar turnos
6. **login.html** - Página para inciar sesión
7. **registro.html** - Página para registrarse
   
## Objetivos Cumplidos

- [x] Estructurar correctamente el contenido de las páginas web
- [x] Crear un sitio con múltiples páginas relacionadas mediante enlaces
- [x] Conectar documentos HTML con archivos CSS externos
- [x] Implementar reglas, propiedades y valores CSS para estilizar el sitio
- [x] Interacción con APIs (LocalStorage y API REST externa) para persistencia de datos
- [x] Formularios funcionales para registro, edición y eliminación de entidades
- [x] Gestión de roles con interfaces diferenciadas (panel de admin no accesible para usuarios)
      

## Tecnologías Utilizadas

- HTML5 para la estructura semántica
- CSS3 para los estilos y diseño
- JavaScript para la lógica de la aplicación e interacción con APIs
- Sistema de control de versiones Git
- Plataforma GitHub para alojamiento del repositorio

## Características Implementadas

### HTML
- Estructura semántica con etiquetas apropiadas (header, nav, main, section, footer)
- Enlaces de navegación entre todas las páginas
- Formulario de contacto en la página correspondiente
- Contenido organizado y jerarquizado

### CSS
- Estilos consistentes en todas las páginas
- Diseño responsive básico
- Uso de variables CSS para mantener consistencia
- Estilizado de formularios y elementos de navegación

### JAVASCRIPT 


- Gestión de dos roles de usuario: visitante yadministrador
- CRUD completo para médicos, especialidades, obras sociales y turnos
- Sistema de reservas de turnos con cálculo de descuento por obras sociales
- Filtros para búsqueda de médicos por especialidad y obra social
- Persistencia de datos usando LocalStorage y consumo de API REST
- Validación de formularios y manejo de errores

## Instrucciones de Visualización

**Rol Visitante**

- Portada institucional e información de la clínica
- Catálogo de médicos con filtros por especialidad y obra social
- Sistema de reserva de turnos con confirmación
- Visualización del costo total según médico y obra social seleccionada
- Página de contacto

**Rol Administrador**

- Gestión completa de médicos (alta, baja, modificación)
- Gestión de especialidades
- Gestión de obras sociales
- Administración de turnos
- Visualización de todas las reservas registradas


1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/GabiForni/idw-2025/tree/main]
