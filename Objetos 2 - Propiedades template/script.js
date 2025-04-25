
function Carro(marca, modelo, anio, color, cantidad) {
    
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
    
}

function agregarCarro(event) {
    event.preventDefault();
    
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const anio = parseInt(document.getElementById('anio').value);
    const color = document.getElementById('color').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    const nuevoCarro = new Carro(marca, modelo, anio, color, cantidad);
    
    listaCarros.push(nuevoCarro);

    renderCarList();
    
    form.reset();
    document.getElementById('cantidad').value = 1;
}

function eliminarCarro(index) {
    listaCarros.splice(index, 1);
    renderCarList();
}

form.addEventListener('submit', agregarCarro);

renderCarList();