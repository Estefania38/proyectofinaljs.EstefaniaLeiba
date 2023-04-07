const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
    modalHeader.append(modalbutton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p> $ ${product.precio}</p> 
    <span class="restar"> ➖ </span>
    <p> cantidad: ${product.cantidad}</p>   
    <span class="sumar"> ➕ </span>
    <p>Total: $  ${product.cantidad * product.precio}</p>
    <span class="delete-product"> ✖ </span>   
    `;
        modalContainer.append(carritoContent);

        // para restar productos
        let restar = carritoContent.querySelector('.restar');
        restar.addEventListener('click', () => {
            if (product.cantidad !== 1) {
                product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });
        // para sumar productos
        let sumar = carritoContent.querySelector('.sumar');
        sumar.addEventListener('click', () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });
        console.log(carrito.length);
        //para eliminar productos 
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: $ ${total}`;
    modalContainer.append(totalCompra);
};
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    /*agregando boton de alerta con libreria sweetalert*/
    Swal.fire({
        title: 'Quieres eliminar los productos?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        denyButtonText: `No eliminar`,
    }).then((result) => {
        if (result.isConfirmed) {
            const foundId = carrito.find((element) => element.id === id);
            console.log(foundId);
            carrito = carrito.filter((carritoId) => {
                return carritoId !== foundId;
            });
            carritoCounter();
            saveLocal();
            pintarCarrito();
            Swal.fire('Producto eliminado!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Tu producto sigue disponible', '', 'info')
        }
    });
};
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();
