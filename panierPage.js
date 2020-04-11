console.log(localStorage);

const panierProducts = localStorage.getItem("panier").split(","); //On récupére notre panier dans le local storage qu'on transforme en tableau pour s'en servir après via des boucles
console.log(panierProducts);


if(panierProducts.length>0){
    const panierPasVide = document.getElementById("panierVide");
    document.body.removeChild(panierPasVide);
}

const loadPanierProducts = () => {                          //On crée une fonction qui va intégrer nos produits à la page panier
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        const product = JSON.parse(xhr.responseText);
        const productsContainer = document.getElementById("productsContenairCaddy"); // On stocke le contenair des produits pour pouvoir le modifier
        console.log(product);
        const afficherProduit = 
    `<div class="productsCaddy" id="${product._id}" > <img src="${product.imageUrl}"><div class="productInfoCaddy"><h3>${product.name}</h3><p>${product.price}</p><p>${product.description}</p><p>quantité : 1 </p>`;
    let colors = "";
    product.colors.forEach(color => {
        colors += `<p>${color}</p>`
    });
    document.querySelector("#productsContenairCaddy").innerHTML += afficherProduit + colors;
}
panierProducts.forEach(id => {                                          //On obtient les informations propres à chaque produit en faisant une boucle qui va parcourir notre panier
    xhr.open("GET","http://localhost:3000/api/teddies/" + id, false);   //On utilise les id des produits pour récupérer leurs données dans l'API
    xhr.onerror =()=>{
        console.log("API introuvable à cette adresse");
    }
    xhr.send();
    });
    };


    
        

loadPanierProducts();