let panier =[]; //On initialise une variable qui va nous servir de panier
let produitDispo = []; //On crée une variable qui va nous servir à stocker chaque produit
const addButton = document.getElementsByClassName("addButton");         //Bouton pour ajouter au panier
let cardQuantity = document.getElementById("quantityCard");            //Nombre de produits que contient le panier
let localPanier = [] ;                      //Le panier local sous forme de tableau 





const addToCard = (product)=>{     
                     //On stocke le panier dans localStorage pour pouvoir s'en servir sur les autres pages                                    //Fonction qui ajoute nos produits au panier
    localPanier.push(product);
    console.log(`Vous avez ajouté ${product} à votre panier`);
   localStorage.setItem("panier",localPanier); 
    calculCardQuantity();
};

const calculCardQuantity = ()=>{                        //Fonction qui nous permet de calculer le panier actuel du client
    
        if(localStorage.hasOwnProperty('panier'))
            {localPanier=localStorage.getItem("panier").split(",");
            if(localPanier[0] == "" ){localPanier.splice(0,1)};
        
        }
        else if(localPanier.length>0){
            localPanier = localStorage.getItem("panier").split(",");   //On récupère le panier du client s'il est revenu sur la page
            for(i=0;i<localPanier.length;i++){console.log(i)}
            cardQuantity.innerHTML = localPanier.length;
            if(localStorage.getItem("panier").split(",")>0){localPanier = localStorage.getItem("panier").split(",");};
        };
        cardQuantity.innerHTML = localPanier.length;
        
    }

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


const goToProduct = (_id)=>{
    console.log(_id);
}


//Création des requêtes et fonctions qui vont nous permettre d'accéder aux produits
//Création de la requête afin d'accéder à l'API teddies

        // !! Création de la requête concernant les ours en peluche !! ///
const loadTeddies = () => {
const xhr = new XMLHttpRequest();
xhr.onload = ()=>{
    const products = JSON.parse(xhr.responseText);
    const productsContainer = document.getElementById("productsContainer"); // On stocke le contenair des produits pour pouvoir le modifier
    console.log(products);
    productsContainer.innerHTML = "";
    if(productsContainer.classList != "oribear"){productsContainer.classList = "oribear"}; //On gère les classes et le CSS adéquat grace à cette condition
    products.forEach((product)=> { //On ajoute les produits correspondants à chaque catégorie par une boucle
        const afficherProduit = `<div class="products"><a href="product.html#${product._id}"><img src="${product.imageUrl}"></a><h3>${product.name}</h3><p>${product.price}</p><div id="shoppingButtons"><span class = "addButton" onclick="addToCard('${product._id}')"><i class="fas fa-plus-circle" ></i></span><i class="fas fa-minus-circle" onclick = "removeToCard('${product._id}')"></i></div>`;
        produitDispo.push(product);
        document.querySelector("#productsContainer").innerHTML += afficherProduit;
    });
   
    
};


xhr.open("GET","http://localhost:3000/api/teddies",true);// On recuperere les ours en peluche
xhr.onerror =()=>{
    console.log("API introuvable à cette adresse");//On prévoit un message en cas d'erreur
};
xhr.send();

};

                //!! Fin de la création de la requête pour les ours en peluche !!//
 
loadTeddies(); //On lance la fonction pour que l'utilisateur n'arrive pas sur une page vide

let oribears = document.getElementById("oribears");
oribears.addEventListener("click",loadTeddies);




                 //!!Création de la requête pour les caméras//
const loadCam = () => {
    const xhr = new XMLHttpRequest(); //On lance la requête Ajax afin d'accéder aux données
    xhr.onload = ()=>{
        const products = JSON.parse(xhr.responseText); //On parse les données pour pouvoir les utliser comme un objet
        const productsContainer = document.querySelector("#productsContainer");
        console.log(products);
        productsContainer.innerHTML = "";
        if(productsContainer.classList != "oricam"){productsContainer.classList = "oricam"}; //On gère les classes et le CSS adéquat grace à cette condition
        products.forEach((product)=> {    //On ajoute les produits correspondants à chaque classe par une boucle
            const afficherProduit = `<div class="products"><a href="product.html#${product._id}"><img src="${product.imageUrl}"></a><h3>${product.name}</h3><p>${product.price}</p><i class="fas fa-plus-circle addButton"></i>`;
            productsContainer.innerHTML += afficherProduit;
                                        });
        
        
    };



    // On recuperere les cameras à l'adresse de l'API
    xhr.open("GET","http://localhost:3000/api/cameras",true);
    xhr.onerror =()=>{ //On prévoit un message en cas d'erreur
        console.log("API introuvable");
    }
    xhr.send();
};
                //!! Fin de la création requête concernant les caméras !!//
    

const oricam = document.getElementById("oricam"); //On récupére le bouton oricam
oricam.addEventListener("click",loadCam); //On ajoute l'événement click pour charger les caméras

                //!! Création de la requête pour les meubles !!//
const loadFurniture = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        const products = JSON.parse(xhr.responseText);
        const productsContainer = document.querySelector("#productsContainer");
        console.log(products);
        productsContainer.innerHTML = "";
        if(productsContainer.classList != "orimeuble"){productsContainer.classList = "orimeuble"}; //On gère les classes et le CSS adéquat grâce à cette condition
        products.forEach((product)=> {      //On ajoute les produits correspondants à chaque classe par une boucle
            const afficherProduit = `<div class="products"><a href="product.html#${product._id}"><img src="${product.imageUrl}"></a><h3>${product.name}</h3><p>${product.price}</p><i class="fas fa-plus-circle addButton"></i>`;
            productsContainer.innerHTML += afficherProduit;
        });
        };
    
    // On recuperere les meubles
    xhr.open("GET","http://localhost:3000/api/furniture",true);
    xhr.onerror =()=>{
        console.log("API introuvable à cette adresse");
    }
    xhr.send();
    
    };      


                //!! FIN DE LA REQUETE CONCERNANT LES MEUBLES !!//

const orimeuble = document.getElementById("orimeuble");
orimeuble.addEventListener("click",loadFurniture); //On ajoute l'événement click pour charger les meubles

if(localStorage.hasOwnProperty('panier'))
        {calculCardQuantity()};






