function Carro(marca, modelo, anio, color) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.color = color;
}

/*
let miCarro = new Carro("Ford", "Mustang", 2022, "Rojo"); //usamos new para crear un nuevo objeto de la clase Carro

console.log(miCarro); 
*/

let listaCarros = [];

const form = document.getElementById('carForm');
const carsContainer = document.getElementById('carsContainer');

function renderCarList() {
    carsContainer.innerHTML = '';
    
    if (listaCarros.length === 0) {
        carsContainer.innerHTML = '<p class="no-cars">No hay carros en la lista</p>';
        return;
    }
    
    //forEach se usa para iterar sobre cada elemento de la listaCarros, toma cada elemento y su índice
    listaCarros.forEach((carro, index) => {
        console.log(carro);
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
    event.preventDefault();

    const marca = document.getElementById('marca').value; //.value obtiene el valor del input
    const modelo = document.getElementById('modelo').value;
    const anio = document.getElementById('anio').value;
    const color = document.getElementById('color').value;

    console.log(marca, modelo, anio, color); //imprimimos los valores en la consola

    const nuevoCarro = new Carro(marca, modelo, anio, color); //creamos un nuevo objeto de la clase Carro

    listaCarros.push(nuevoCarro); 

    renderCarList(); //actualizamos la lista de carros
}

function eliminarCarro(index) {
    listaCarros.splice(index)
    renderCarList(); //actualizamos la lista de carros
}

form.addEventListener('submit', agregarCarro);

//Estos carros se mostrarán al iniciar la página

listaCarros.push(new Carro('Ford', 'Mustang', 2022, 'Rojo'));
listaCarros.push(new Carro('Chevrolet', 'Camaro', 2021, 'Azul'));
listaCarros.push(new Carro('Dodge', 'Charger', 2020, 'Negro'));

renderCarList()