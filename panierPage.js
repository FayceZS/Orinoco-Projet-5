console.log(localStorage);
const panierVide = document.querySelector(".panierVide");
let panierProducts ; //On récupére notre panier dans le local storage qu'on transforme en tableau pour s'en servir après via des boucles

const checkPanier = ()=>{                                               //Fonction qui va nous permettre de connaitre le panier

        if(localStorage.hasOwnProperty('panier')){
            panierProducts=localStorage.getItem("panier").split(",");
            panierVide.classList.add("deleteThis");
            panierVide.classList.remove("panierVide");
            if(panierProducts[0] == "" ){panierProducts.splice(0,1)};
            if(panierProducts.length == 0){
                panierVide.classList.remove("deleteThis");
                panierVide.classList.add("panierVide");
            }
        }
        

}

checkPanier();





const loadPanierProducts = () => {                          //On crée une fonction qui va intégrer nos produits à la page panier
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        const product = JSON.parse(xhr.responseText);
        const productsContainer = document.getElementById("productsContenairCaddy"); // On stocke le contenair des produits pour pouvoir le modifier
        console.log(product);
        const afficherProduit = 
    `<div class="productsCaddy" id="${product._id}" > <img src="${product.imageUrl}"><div class="productInfoCaddy"><h3>${product.name}</h3><p>Prix : ${product.price}</p><p>${product.description}</p><p>quantité : 1 </p>`;
    let colors = "<select placeholder='Choisissez votre couleur'>";
    product.colors.forEach(color => {
        colors += `<option value = "${color}">${color}</option>`
    });
    document.querySelector("#productsContenairCaddy").innerHTML += afficherProduit + colors + "</select>";
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