
const contenedorPrincipal = document.getElementById("contenedorPrincipal");
const carro = document.getElementById("carro");
const contenedorPrecio = document.getElementById("contenedorPrecio");
const contenedorBotones = document.getElementById("contenedorBotones");



  fetch("./js/productos.json")
 .then(response => response.json())
 .then(data=> productos = data)
 .then(data => {data.forEach(producto => { crearCard(producto)})});




// CARRITO -----------------------------------------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function mostrarCarrito(carrito) {

    carro.innerHTML = "";

    let valorTotal = carrito.reduce((a, b) => a + b.precio * b.cantidad, 0);


    carrito.forEach(producto => {

        const card = document.createElement("div");
        card.className = "card";

        const nombre = document.createElement("p");
        nombre.className = "nombre";
        nombre.innerText = producto.nombre;

        const categoria = document.createElement("p");
        categoria.className = "categoria";
        categoria.innerText = `( ${producto.categoria} )`;

        const cantidad = document.createElement("p");
        cantidad.className = "cantidad";
        cantidad.innerText = `( Cantidad: ${producto.cantidad} )`;

        const imagen = document.createElement("img");
        imagen.className = "imagen";
        imagen.src = producto.imagen;

        const precio = document.createElement("p");
        precio.innerText = `$${producto.precio * producto.cantidad}`;
        precio.className = "precio";

        const botonCompra = document.createElement("button");
        botonCompra.innerText = "Eliminar";
        botonCompra.className = "botonDel";
        botonCompra.onclick = () => eliminarCarrito(producto.id);

        
        card.appendChild(nombre);
        card.appendChild(imagen);
        card.appendChild(categoria);
        card.appendChild(cantidad);
        card.appendChild(precio);
        card.appendChild(botonCompra);

 
        carro.appendChild(card);

    });




    contenedorPrecio.innerHTML= "";
    const contenedorTotal = document.createElement("div");
    contenedorTotal.className = "contenedorPrecio"

    const textoTotal = document.createElement("p");
    textoTotal.className = "Total";
    textoTotal.innerText = "Total: ";

    const total = document.createElement("p");
    total.className = "Total";
    total.innerText = ` $${valorTotal}`;

    contenedorTotal.appendChild(textoTotal);
    contenedorTotal.appendChild(total);
    contenedorPrecio.appendChild(contenedorTotal)


};


function agregarCarrito(id) {
    const productoAAgregar = productos.find(el => el.id === id);

    if (carrito.some(element => element.id === productoAAgregar.id)) {
        let productoEnCarro = carrito.findIndex(el => el.id === productoAAgregar.id);
        carrito[productoEnCarro].cantidad++;

    } else {
        carrito.push(productoAAgregar);
        console.log(carrito);
    };
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(carrito);
};




function eliminarCarrito(id) {

    Swal.fire({
        title: "Estas seguro de eliminar el producto?",
        text: "perderas una planta increible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            let productoEnCarro = carrito.find(el => el.id === id);

            if (productoEnCarro) {
                if (productoEnCarro.cantidad > 1) {
                    productoEnCarro.cantidad--;
                } else {
                    carrito = carrito.filter(el => el.id !== id);
                };
            };
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito(carrito);
            console.log(carrito);

          Swal.fire({
            title: "eliminado",
            text: "eliminado correctamente",
            icon: "success"
          });
        }
      });

};


// CREAR CARTA ---------------------------------
function crearCard(producto) {

   
    const card = document.createElement("div");
    card.className = "card";

    const nombre = document.createElement("p");
    nombre.className = "nombre";
    nombre.innerText = producto.nombre;

    const categoria = document.createElement("p");
    categoria.className = "categoria";
    categoria.innerText = `( ${producto.categoria} )`;

    const imagen = document.createElement("img");
    imagen.className = "imagen";
    imagen.src = producto.imagen;

    const precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;
    precio.className = "precio";

    const botonCompra = document.createElement("button");
    botonCompra.innerText = "Agregar";
    botonCompra.className = "botonAdd";
    botonCompra.onclick = () => agregarCarrito(producto.id);


    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(categoria);
    card.appendChild(precio);
    card.appendChild(botonCompra);

    contenedorPrincipal.appendChild(card);

}

//   productos.forEach(el => crearCard(el, "contenedorPrincipal"));


// FILTRO BOTONES ------------------------
function mostrarProducto(categoria) {
    contenedorPrincipal.innerHTML = "";

     let filtro = productos.filter(el => el.categoria === categoria);
    filtro.forEach(el => crearCard(el, "contenedorPrincipal"));

}
const botones = document.createElement("div");
botones.className = "botonesFiltro";

    const calathea = document.createElement("button");
    calathea.innerText = "Calatheas";
    calathea.className = "botonFiltro";
    calathea.onclick = () => mostrarProducto("calathea");

    const floral = document.createElement("button");
    floral.innerText = "Florales";
    floral.className = "botonFiltro";
    floral.onclick = () => mostrarProducto("flor");

    const aromatica = document.createElement("button");
    aromatica.innerText = "Aromaticas";
    aromatica.className = "botonFiltro";
    aromatica.onclick = () => mostrarProducto("aromaticas");

    const todos = document.createElement("button");
    todos.innerText = "Todos";
    todos.className = "botonFiltro";
    todos.onclick = () => productos.forEach(el => crearCard(el, "contenedorPrincipal"));

    botones.appendChild(calathea);
    botones.appendChild(floral);
    botones.appendChild(aromatica);
    botones.appendChild(todos);

    contenedorBotones.appendChild(botones);



