// Falta Constructor para Doctores
function Doctor(id, nombre, especialidad) {

}

// Falta Constructor para Pacientes
function Paciente(id, nombre, edad, telefono) {

}

// Falta Constructor para Citas
function Cita(id, pacienteId, doctorId, fecha, motivo) {

}

// Base de datos simulada
const database = {
    doctores: [],
    pacientes: [],
    citas: [],
    nextDoctorId: 1,
    nextPacienteId: 1,
    nextCitaId: 1,
    
    agregarDoctor: function(nombre, especialidad) {
        const doctor = new Doctor(this.nextDoctorId++, nombre, especialidad);
        this.doctores.push(doctor);
        return doctor;
    },
    
    agregarPaciente: function(nombre, edad, telefono) {
        const paciente = new Paciente(this.nextPacienteId++, nombre, edad, telefono);
        this.pacientes.push(paciente);
        return paciente;
    },
    
    agregarCita: function(pacienteId, doctorId, fecha, motivo) {
        const cita = new Cita(this.nextCitaId++, pacienteId, doctorId, fecha, motivo);
        this.citas.push(cita);
        return cita;
    },
    
    getDoctorById: function(id) {
        return this.doctores.find(d => d.id === id);
    },
    
    getPacienteById: function(id) {
        return this.pacientes.find(p => p.id === id);
    },
    
    getCitaById: function(id) {
        return this.citas.find(c => c.id === id);
    },
    
    actualizarCita: function(citaActualizada) {
        const index = this.citas.findIndex(c => c.id === citaActualizada.id);
        if (index !== -1) {
            this.citas[index] = citaActualizada;
            return true;
        }
        return false;
    },
    
    eliminarDoctor: function(id) {
        const index = this.doctores.findIndex(d => d.id === id);
        if (index !== -1) {
            this.doctores.splice(index, 1);
            return true;
        }
        return false;
    },
    
    eliminarPaciente: function(id) {
        const index = this.pacientes.findIndex(p => p.id === id);
        if (index !== -1) {
            this.pacientes.splice(index, 1);
            return true;
        }
        return false;
    }
};

// Funciones para renderizar las tablas
function renderDoctores() {
    const tbody = document.querySelector('#doctoresTable tbody');
    tbody.innerHTML = '';
    
    database.doctores.forEach(doctor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.nombre}</td>
            <td>${doctor.especialidad}</td>
            <td>
                <button class="action-btn delete-btn" onclick="eliminarDoctor(${doctor.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPacientes() {
    const tbody = document.querySelector('#pacientesTable tbody');
    tbody.innerHTML = '';
    
    database.pacientes.forEach(paciente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paciente.id}</td>
            <td>${paciente.nombre}</td>
            <td>${paciente.edad}</td>
            <td>${paciente.telefono}</td>
            <td>
                <button class="action-btn delete-btn" onclick="eliminarPaciente(${paciente.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Actualizar select de pacientes en citas
    const select = document.getElementById('citaPaciente');
    select.innerHTML = '';
    database.pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.getInfo();
        select.appendChild(option);
    });
}

function renderCitas() {
    const tbody = document.querySelector('#citasTable tbody');
    tbody.innerHTML = '';
    
    database.citas.forEach(cita => {
        const paciente = database.getPacienteById(cita.pacienteId);
        const doctor = database.getDoctorById(cita.doctorId);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cita.id}</td>
            <td>${paciente ? paciente.nombre : 'Desconocido'}</td>
            <td>${doctor ? doctor.nombre : 'Desconocido'}</td>
            <td>${cita.fecha.toLocaleString()}</td>
            <td>${cita.motivo}</td>
            <td>${cita.estado}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editarCita(${cita.id})">Cambiar Fecha</button>
                <button class="action-btn delete-btn" onclick="cancelarCita(${cita.id})">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Funciones para actualizar selects
function actualizarSelects() {
    const doctorSelect = document.getElementById('citaDoctor');
    doctorSelect.innerHTML = '';
    
    database.doctores.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.getInfo();
        doctorSelect.appendChild(option);
    });
    
    renderPacientes(); // Esto actualiza el select de pacientes también
}

// Funciones para manejar eventos
function agregarDoctor() {
    const nombre = document.getElementById('doctorNombre').value;
    const especialidad = document.getElementById('doctorEspecialidad').value;
    
    if (!nombre || !especialidad) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    database.agregarDoctor(nombre, especialidad);
    renderDoctores();
    actualizarSelects();
    
    // Limpiar formulario
    document.getElementById('doctorNombre').value = '';
    document.getElementById('doctorEspecialidad').value = '';
}

function agregarPaciente() {
    const nombre = document.getElementById('pacienteNombre').value;
    const edad = parseInt(document.getElementById('pacienteEdad').value);
    const telefono = document.getElementById('pacienteTelefono').value;
    
    if (!nombre || isNaN(edad) || !telefono) {
        alert('Por favor complete todos los campos correctamente');
        return;
    }
    
    database.agregarPaciente(nombre, edad, telefono);
    renderPacientes();
    
    // Limpiar formulario
    document.getElementById('pacienteNombre').value = '';
    document.getElementById('pacienteEdad').value = '';
    document.getElementById('pacienteTelefono').value = '';
}

function agregarCita() {
    const pacienteId = parseInt(document.getElementById('citaPaciente').value);
    const doctorId = parseInt(document.getElementById('citaDoctor').value);
    const fecha = document.getElementById('citaFecha').value;
    const motivo = document.getElementById('citaMotivo').value;
    
    if (!pacienteId || !doctorId || !fecha || !motivo) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    database.agregarCita(pacienteId, doctorId, fecha, motivo);
    renderCitas();
    
    // Limpiar formulario
    document.getElementById('citaFecha').value = '';
    document.getElementById('citaMotivo').value = '';
}

function eliminarDoctor(id) {
    if (confirm('¿Está seguro de eliminar este doctor? Esto podría afectar citas programadas.')) {
        if (database.eliminarDoctor(id)) {
            renderDoctores();
            actualizarSelects();
            renderCitas(); // Para actualizar si algún doctor fue eliminado
        }
    }
}

function eliminarPaciente(id) {
    if (confirm('¿Está seguro de eliminar este paciente? Esto también eliminará sus citas programadas.')) {
        // Eliminar citas asociadas primero
        database.citas = database.citas.filter(c => c.pacienteId !== id);
        
        if (database.eliminarPaciente(id)) {
            renderPacientes();
            renderCitas();
        }
    }
}

function cancelarCita(id) {
    const cita = database.getCitaById(id);
    if (cita) {
        cita.cancelar();
        database.actualizarCita(cita);
        renderCitas();
    }
}

function editarCita(id) {
    const cita = database.getCitaById(id);
    if (!cita) return;
    
    const nuevaFecha = prompt('Ingrese la nueva fecha y hora (YYYY-MM-DD HH:MM):', 
                           cita.fecha.toISOString().slice(0, 16));
    
    if (nuevaFecha) {
        cita.cambiarFecha(nuevaFecha);
        database.actualizarCita(cita);
        renderCitas();
    }
}

// Event listeners
document.getElementById('agregarDoctor').addEventListener('click', agregarDoctor);
document.getElementById('agregarPaciente').addEventListener('click', agregarPaciente);
document.getElementById('agregarCita').addEventListener('click', agregarCita);

// Inicializar con algunos datos de ejemplo
function inicializarDatosEjemplo() {
    // Doctores
    database.agregarDoctor('Dr. Pérez', 'Cardiología');
    database.agregarDoctor('Dra. Gómez', 'Pediatría');
    database.agregarDoctor('Dr. Rodríguez', 'Neurología');
    
    // Pacientes
    database.agregarPaciente('Juan Martínez', 35, '555-1234');
    database.agregarPaciente('María López', 28, '555-5678');
    database.agregarPaciente('Carlos Sánchez', 42, '555-9012');
    
    // Citas
    const hoy = new Date();
    const manana = new Date();
    manana.setDate(hoy.getDate() + 1);
    
    database.agregarCita(1, 1, hoy.toISOString(), 'Consulta rutinaria');
    database.agregarCita(2, 2, manana.toISOString(), 'Control infantil');
    
    // Renderizar todo
    renderDoctores();
    renderPacientes();
    renderCitas();
    actualizarSelects();
}

// Iniciar la aplicación
window.onload = function() {
    inicializarDatosEjemplo();
    
    // Hacer las funciones accesibles desde el onclick en HTML
    window.eliminarDoctor = eliminarDoctor;
    window.eliminarPaciente = eliminarPaciente;
    window.cancelarCita = cancelarCita;
    window.editarCita = editarCita;
};