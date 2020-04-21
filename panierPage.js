

// console.log(localStorage);
const panierVide = document.querySelector(".panierVide");
const formulaire = document.querySelector("#formulaireCommande");
let totalPrice = 0;         //On initialise une variable qui nous permettra de calculer le prix total
let panierProducts ; //On récupére notre panier dans le local storage qu'on transformera en tableau pour s'en servir après via des boucles
const firstNameForm = document.querySelector("#firstName");
const lastNameForm = document.querySelector("#lastName");
const adressForm = document.querySelector("#adress");
const cityForm = document.querySelector("#city");
const emailForm = document.querySelector("#email");
const submitButton = document.querySelector("#submitButton");


submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
})

class contactCreate  {
    constructor(firstName,lastName,address,city,email,panierProducts){  
    
        this.firstName =firstName,
        this.lastName =lastName,
        this.address =address,
        this.city =city,
        this.email =email;
     
    }
    /**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
};







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
       
        
         
    const afficherProduit =`<div class="productsCaddy" id="${product._id}" > <img src="${product.imageUrl}"><div class="productInfoCaddy"><h3>${product.name}</h3><p>Prix : ${product.price}</p><p>${product.description}</p><p>quantité : 1 </p>`;
    let colors = "<select placeholder='Choisissez votre couleur'>";
    product.colors.forEach(color => {
        colors += `<option value = "${color}">${color}</option>`
    });
    document.querySelector("#productsContenairCaddy").innerHTML += afficherProduit + colors + "</select>";
    totalPrice += product.price;
}
panierProducts.forEach(id => {                                          //On obtient les informations propres à chaque produit en faisant une boucle qui va parcourir notre panier
    xhr.open("GET","http://localhost:3000/api/teddies/" + id, false);   //On utilise les id des produits pour récupérer leurs données dans l'API
    xhr.onerror =()=>{
        console.log("API introuvable à cette adresse");
    }
    xhr.send();
    });
    };

formulaire.addEventListener("submit",(e)=>{
        console.log("HELLO");
})
    
        

loadPanierProducts();

const submitForm = ()=>{                    //On crée la fonction qui nous permettra d'envoyer notre formulaire
    
    let contact = new contactCreate(firstNameForm.value,lastNameForm.value,adressForm.value,cityForm.value,emailForm.value); 
    const submitResquet = ()=>{
       
    const xhr = new XMLHttpRequest();
    const products = panierProducts;
    let requestToSend = {                                   //On crée l'objet attendu par l'API pour répondre correctement
        contact : contact,
        products : products
    } ;
    xhr.onload = (e)=>{
        
        
        
        console.log(JSON.parse(xhr.responseText));
        
    }
    xhr.open("POST", "http://localhost:3000/api/teddies/order", false);
    xhr.setRequestHeader("Content-Type", "application/json");
     
                                                           
    xhr.send(JSON.stringify(requestToSend));                            //On converti l'objet au format JSON avant de l'envoyer
    
    
    
    
    };

    submitResquet();


}