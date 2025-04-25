function Carro(marca, modelo, anio, color, cantidad) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.color = color;
    this.cantidad = cantidad || 1; 
    
    this.getInfo = function() {
        return `${this.marca} ${this.modelo} (${this.anio}) - Color: ${this.color}`;
    };
    
    this.aumentarCantidad = function(valor = 1) {
        this.cantidad += valor;
    };
    
    this.disminuirCantidad = function(valor = 1) {
        this.cantidad = Math.max(0, this.cantidad - valor); 
    };
}

let listaCarros = [];

const form = document.getElementById('carForm');
const carsContainer = document.getElementById('carsContainer');

function renderCarList() {
    carsContainer.innerHTML = '';
    
    if (listaCarros.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">No hay carros en la lista</p>';
        return;
    }
    
    listaCarros.forEach((carro, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        
        carCard.innerHTML = `
            <div class="car-details">
                <h3>${carro.marca} ${carro.modelo}</h3>
                <p>Año: ${carro.anio}</p>
                <p>Color: ${carro.color}</p>
                <p>Cantidad: </p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
                    <span class="quantity-value">${carro.cantidad}</span>
                    <button class="quantity-btn increase-btn" data-index="${index}">+</button>
                </div>
            </div>
            <div class="car-actions">
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            </div>
        `;
        
        carsContainer.appendChild(carCard);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarCarro(index);
        });
    });
    
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            listaCarros[index].aumentarCantidad();
            renderCarList();
        });
    });
    
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            listaCarros[index].disminuirCantidad();
            renderCarList();
        });
    });
}

let todosLosCarros = [];

function agregarCarro(event) {
    event.preventDefault();
    
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = parseInt(document.getElementById('anio').value);
    const color = document.getElementById('color').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    const nuevoCarro = new Carro(marca, modelo, anio, color, cantidad);
    nuevoCarro.fechaAgregado = new Date();
    
    listaCarros.push(nuevoCarro);
    todosLosCarros = [...listaCarros]; 
    
    renderCarList();
    form.reset();
    document.getElementById('cantidad').value = 1;
}

function buscarCarros() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm.trim()) {
        renderCarList();
        return;
    }
    
    const resultados = todosLosCarros.filter(carro => 
        carro.marca.toLowerCase().includes(searchTerm) || 
        carro.modelo.toLowerCase().includes(searchTerm)
    );
    
    listaCarros = resultados;
    renderCarList();
}

function mostrarUltimosAgregados() {
    const ultimos = [...todosLosCarros]
        .sort((a, b) => b.fechaAgregado - a.fechaAgregado)
        .slice(0, 5);
    
    listaCarros = ultimos;
    renderCarList();
}

function mostrarTodos() {
    listaCarros = [...todosLosCarros];
    renderCarList();
}

document.getElementById('searchButton').addEventListener('click', buscarCarros);
document.getElementById('lastAddedButton').addEventListener('click', mostrarUltimosAgregados);
document.getElementById('showAllButton').addEventListener('click', mostrarTodos);

// Permitir búsqueda al presionar Enter en el input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCarros();
    }
});

listaCarros.push(new Carro('Toyota', 'Corolla', 2020, 'Rojo', 3));
listaCarros.push(new Carro('Honda', 'Civic', 2019, 'Azul', 2));
listaCarros.push(new Carro('Ford', 'Mustang', 2021, 'Negro', 1));

listaCarros.forEach(carro => {
    carro.fechaAgregado = new Date();
});
todosLosCarros = [...listaCarros];

renderCarList();