let panier =[]; //On initialise une variable qui va nous servir de panier
const addButton = document.getElementsByClassName("addButton");



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
    console.log(productsContainer.classList);
    if(productsContainer.classList != "oribear"){productsContainer.classList = "oribear"}; //On gère les classes et le CSS adéquat grace à cette condition
    products.forEach((product)=> {
        const afficherProduit = `<div class="products"><img src="${product.imageUrl}"><h3>${product.name}</h3><p>${product.price}</p><a href="#" class = "addButton"><i class="fas fa-plus-circle"></i></a>`;
        
        document.querySelector("#productsContainer").innerHTML += afficherProduit;
    });
    
};

// On recuperere les ours en peluche
xhr.open("GET","http://localhost:3000/api/teddies",true);
xhr.onerror =()=>{
    console.log("API introuvable à cette adresse");
}
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
        products.forEach((product)=> {
            const afficherProduit = `<div class="products"><img src="${product.imageUrl}"><h3>${product.name}</h3><p>${product.price}</p><i class="fas fa-plus-circle addButton"></i>`;
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
                //!! Fin de la création concernant les caméras !!//
    

    

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
        products.forEach((product)=> {
            const afficherProduit = `<div class="products"><img src="${product.imageUrl}"><h3>${product.name}</h3><p>${product.price}</p><i class="fas fa-plus-circle addButton"></i>`;
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



