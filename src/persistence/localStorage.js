//=========LOCALSTORAGE==========//

export const handleGetProductLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem('products'));
    return products ? products : [];
};

//guardar en localstorage

export const setInLocalStorage = (productIn)=>{
    //traer los elementos
    let productsInLocal = handleGetProductLocalStorage();
    const existingIndex = productsInLocal.findIndex((productsLocal) =>
     productsLocal.id === productIn.id
    );
    if(existingIndex !== -1){
        productsInLocal[existingIndex] = productIn;
    }else {
        productsInLocal.push(productIn);
    }
    //set new array
    localStorage.setItem("products", JSON.stringify(productsInLocal));
};