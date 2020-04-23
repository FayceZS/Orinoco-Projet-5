let cardQuantity = document.getElementById("quantityCard");            //Nombre de produits que contient le panier
let productID = window.location.href.substring(window.location.href.indexOf("#")+1,window.location.href.length);   //Variable dans laquelle nous allons stocker l'id du produit voulu grâce à l'url
let localPanier = [];


const calculCardQuantity = ()=>{                        //Fonction qui nous permet de calculer le panier actuel du client
    
    if(localStorage.hasOwnProperty('panier')){
        localPanier=localStorage.getItem("panier").split(",");
        if(localPanier[0] == "" ){localPanier.splice(0,1)};
        if(localStorage.getItem("panier").split(",")>0){localPanier = localStorage.getItem("panier").split(",");};
        cardQuantity.innerHTML = localPanier.length;
    
    }
    // else if(localStorage.hasOwnProperty('panier') && localPanier.length>0){
    //     localPanier = localStorage.getItem("panier").split(",");   //On récupère le panier du client s'il est revenu sur la page
    //     for(i=0;i<localPanier.length;i++){console.log(i)}
    //     cardQuantity.innerHTML = localPanier.length;
    //     if(localStorage.getItem("panier").split(",")>0){localPanier = localStorage.getItem("panier").split(",");};
    // }
    else{
        cardQuantity.innerHTML = 0;
    };
    // cardQuantity.innerHTML = localPanier.length;
    
}

calculCardQuantity();

const addToCard = (product)=>{     //Fonction qui ajoute nos produits au panier
                                        
         //On stocke le panier dans localStorage pour pouvoir s'en servir sur les autres pages
console.log(`Vous avez ajouté ${product} à votre panier`);

localPanier=localStorage.getItem("panier").split(",");
localPanier.push(product); 
localStorage.setItem("panier",localPanier);
calculCardQuantity();
};

const removeToCard = (id)=>{                //Fonction qui supprime nos produits du panier
    const idToDelete = localPanier.indexOf(id); //On recherche le produit avec son id pour être sur qu'il est bien dans le panier
    
    if(idToDelete>= 0){
        localPanier.splice(idToDelete,1);        //On supprime le produit s'il est présent   
        localStorage.clear();                   //On vide le localstorage pour le recharger ensuite sans le produit supprimé
        localStorage.setItem("panier",localPanier);  
        console.log(id + " à était supprimé");
        // calculCardQuantity();
    }
    
    
    if(idToDelete > -1){                        //Le produit recherché n'existe pas
    
        calculCardQuantity();
        
    }
}

const loadUniqueProduct = () => {                          //On crée une fonction qui va intégrer nos produits à la page panier
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        const product = JSON.parse(xhr.responseText);
        const productsContainer = document.getElementById("uniqueProductContainer"); // On stocke le contenair des produits pour pouvoir le modifier
        console.log(product);
        const afficherProduit = 
    `<div class="uniqueProduct" id="${product._id}" > <img src="${product.imageUrl}"><div class="productInfoCaddy"><h3>${product.name}</h3><p>Prix : ${product.price}</p><p>${product.description}</p>`;
    let colors = "<select placeholder='Choisissez votre couleur'>";
    product.colors.forEach(color => {
        colors += `<option value = "${color}">${color}</option>`
    });
    document.querySelector("#uniqueProductContainer").innerHTML += afficherProduit + colors + "</select>" + `<div id="shoppingButtons"><span class = "addButton" onclick="addToCard('${product._id}')"><i class="fas fa-plus-circle" ></i></span><i class="fas fa-minus-circle" onclick = "removeToCard('${product._id}')"></i></div>`;
        
    }

    xhr.open("GET","http://localhost:3000/api/teddies/" + productID, false);   //On utilise les id des produits pour récupérer leurs données dans l'API
    xhr.onerror =()=>{
        console.log("API introuvable à cette adresse");
    }
    xhr.send();
    
    };

    loadUniqueProduct();