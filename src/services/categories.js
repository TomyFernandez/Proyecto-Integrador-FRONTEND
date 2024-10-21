//=====CATEGORIA

import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../view/store";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch(categoryIn) {
        case categoriaActiva:
            handleRenderList(products)
            break;
        case "Todo":
            handleRenderList(products)
            break;
        case "Hamburguesas":
        case "Papas":
        case "Gaseosas":
            const result = products.filter((el)=> el.categorias === categoryIn);
            handleRenderList(result);
            break;
        case "mayorPrecio":
          const resultMayorPrecio = products.sort((a,b)=> b.precio - a.precio)  
          handleRenderList(resultMayorPrecio);
          break;
        case "menorPrecio":
           const resultMenorPrecio = products.sort((a,b)=> a.precio - b.precio)
           handleRenderList(resultMenorPrecio);  
        break;
        default:
            break;
    }
}


// Render de la vista categorias
export const renderCategories = () => {
    // Tomamos elementos de la lista HTML
    const ulList = document.getElementById('listFilter');
    // Creamos esos elementos dentro de la lista
    ulList.innerHTML = `
        <li id="Todo"> Todos los productos </li>
        <li id="Hamburguesas"> Hamburguesas </li>
        <li id="Papas"> Papas</li>
        <li id="Gaseosas"> Gaseosas </li>
        <li id="mayorPrecio"> Mayor Precio </li>
        <li id="menorPrecio"> Menor Precio </li>
    `;
    // Añadimos dinámicamente el evento click
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener('click', () => {
            handleClick(liElement);
        });
    });
};

const handleClick = (elemento) => {
    handleFilterProductsByCategory(elemento.id);
    const liElements = document.querySelectorAll("#listFilter li");
    liElements.forEach((el) => {
        if (el.classList.contains("liActive")) {
            el.classList.remove("liActive");
        } else {
            if (elemento === el) {
                el.classList.add("liActive");
            }
        }
    });
}