import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../view/modal";
import { handleGetProductsToStore, handleRenderList } from "../view/store";

/*======PRODUCT====== */

// Guardar o modificar elementos 
const acceptButton = document.getElementById('acceptButton');
acceptButton.addEventListener('click', () => {
    handleSaveOrModifyElements();
});

const handleSaveOrModifyElements = () => {
    const nombre = document.getElementById("name").value,
          imagen = document.getElementById("img").value,
          precio = document.getElementById("precio").value,
          categorias = document.getElementById("categoria").value;
    let object = null;
    if(productoActivo){
        object = {
            ...productoActivo, //operador spreed
            nombre,
            imagen,
            precio,
            categorias,
        }
    }else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categorias,
        };
    } 
    Swal.fire({
        title: "Bien hecho!",
        text: "Producto guardado correctamente!",
        icon: "success"
      });
    
    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
};

//eliminar elemento
export const handleDeleteProduct = ()=>{

    Swal.fire({
        title: "¿Desea eliminar el elemento?",
        text: "La eliminación será permanente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el)=> el.id !== productoActivo.id);
        
                localStorage.setItem("products", JSON.stringify(result));
                const newProducts = handleGetProductLocalStorage();
                handleRenderList(newProducts);
                closeModal();;
        }else {
            closeModal();
        }
      });

    

}