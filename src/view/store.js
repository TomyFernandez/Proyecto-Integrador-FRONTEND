//========STORE========

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localStorage";
import { closeModal, openModal } from "./modal";


//trae los elementos y llama al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductLocalStorage();
    if (Array.isArray(products)){
        handleRenderList(products);
    }else {
        console.error("Error: handleGetProductLocalStorage did not return a valid array.");
    }    
};
//filtrar y renderizar la sección con todos sus respectivos elementos
export const handleRenderList= (productsIn) =>{
    //filtrado de arrays por categorias
    const burgers = productsIn.filter((el) => el.categorias === "Hamburguesas");
    const papas = productsIn.filter((el) => el.categorias === "Papas");
    const gaseosas = productsIn.filter((el) => el.categorias === "Gaseosas");
//renderiza los elementos de la seccion
    const renderProductGroup = (products, title) => {
        if(products.length > 0) {
            const productsHTML = products.map((product, index) => {
                return `
                <div class='containerTargetItem' id='product-${product.categorias}-${index}'>
                    <div>
                        <img src='${product.imagen}' alt="${product.nombre}"/>
                        <div>
                            <h2>${product.nombre}</h2>
                        </div>
                        <div  class='targetProps'>
                           <p><b>Precio:</b>$ ${product.precio}</p>
                        </div>
                    </div>
                </div>`;     
            });
            return `
                <section class= 'sectionStore'>
                <div class ='containerTitleSection'>
                    <h3>${title}</h3>    
                </div>
                <div class= 'containerProductStore'>
                    ${productsHTML.join("")}
                </div>
                </section>
            `;
        } else {
            return "";
        }
    };

    //renderizar cada uno de los productos dentro de us categoria

    const appContainer = document.getElementById("storeContainer");
    if (appContainer) {
        appContainer.innerHTML = `
           ${renderProductGroup(burgers, "Hamburguesas")}
           ${renderProductGroup(papas, "Papas")}
           ${renderProductGroup(gaseosas, "Gaseosas")} 
        `;
    } else {
        console.error("Error: storeContainer element not found.");
    }

    const addEvents = (productsIn) => {
         console.log(productsIn);
        if(productsIn) {
            productsIn.forEach((product, index) => {
                const productContainer = document.getElementById(`product-${product.categorias}-${index}`);
            productContainer.addEventListener("click", () =>{
                setProductoActivo(product);
                openModal();
            });
            
            });
        }
    };
    addEvents(burgers);
    addEvents(papas);
    addEvents(gaseosas);
};

