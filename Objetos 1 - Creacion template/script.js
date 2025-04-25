function Carro(marca, modelo, anio, color) {

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
            <div class="car-info">
                <h3>${carro.marca} ${carro.modelo}</h3>
                <p>Año: ${carro.anio}</p>
                <p>Color: ${carro.color}</p>
            </div>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        `;
        
        carsContainer.appendChild(carCard);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            eliminarCarro(index);
        });
    });
}

function agregarCarro(event) {
    
}

function eliminarCarro(index) {
   
}

form.addEventListener('submit', agregarCarro);

renderCarList()