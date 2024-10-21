/*======POPUP====== */

import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

// Con cancel se cierra
const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', () => {
    closeModal();
});



// Abrir y cerrar el modal
export const openModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = 'flex';
    const buttonDelete = document.getElementById("deleteButton");
    if(productoActivo){
        buttonDelete.style.display = "block";
    }else{
        buttonDelete.style.display = "none";

    }


    if(productoActivo){
        const nombre = document.getElementById("name"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categorias = document.getElementById("categoria");
        imagen.value = productoActivo.imagen;
        precio.value= productoActivo.precio;
        nombre.value = productoActivo.nombre;
        categorias.value="Seleccione una categoría";
    }
};

export const closeModal = () => {
    const modal = document.getElementById("modalPopUP");
    modal.style.display = 'none';
    setProductoActivo(null);
    resetModal();
};

const resetModal = ()=>{
    const nombre = document.getElementById("name"),
          imagen = document.getElementById("img"),
          precio = document.getElementById("precio"),
          categorias = document.getElementById("categoria");
        imagen.value ="";
        precio.value=0;
        nombre.value="";
        categorias.value="Seleccione una categoría";
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener('click', () =>{
    handleButtonDelete();
})

const handleButtonDelete = () => {
    handleDeleteProduct();
}
