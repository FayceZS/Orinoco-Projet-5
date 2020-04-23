

// console.log(localStorage);
const panierVide = document.querySelector(".panierVide");           
const formulaire = document.querySelector("#formulaireCommande");
const productContenairCaddy = document.querySelector("#productsContenairCaddy");
let totalPrice = 0;         //On initialise une variable qui nous permettra de calculer le prix total
let panierProducts = []; ; //On récupére notre panier dans le local storage qu'on transformera en tableau pour s'en servir après via des boucles
const firstNameForm = document.querySelector("#firstName"); //On stocke les champs du formulaire dans des variables pour les utiliser plus tard
const lastNameForm = document.querySelector("#lastName");
const adressForm = document.querySelector("#adress");
const cityForm = document.querySelector("#city");
const emailForm = document.querySelector("#email");
const submitButton = document.querySelector("#submitButton");
const inputs = document.querySelectorAll("input");
const totalPriceContenair = document.querySelector("#totalPrice")


// submitButton.addEventListener("click",(e)=>{                                //On enlève le comportement par défaut du formulaire pour ne pas rafraichir la page à l'envoi
//     e.preventDefault();
// })

class contactCreate  {                                                      //On crée une classe pour générer l'objet contact
    constructor(firstName,lastName,address,city,email,panierProducts){  
    
        this.firstName =firstName,
        this.lastName =lastName,
        this.address =address,
        this.city =city,
        this.email =email;
     
    }
    /**
 *
 * Expects request to contain:                                      !!!!!!!!! CECI EST LA REQUETE ATTENDUE PAR LE SERVEUR !!!!!!!!!!
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


const addToCard = (product)=>{     //Fonction qui ajoute nos produits au panier
                                        
    //On stocke le panier dans localStorage pour pouvoir s'en servir sur les autres pages
console.log(`Vous avez ajouté ${product} à votre panier`);


panierProducts.push(product); 
localStorage.setItem("panier",panierProducts);
productContenairCaddy.innerHTML = "";
totalPrice = 0;
loadPanierProducts();
};

const removeToCard = (id)=>{                //Fonction qui supprime nos produits du panier
    const idToDelete = panierProducts.indexOf(id); //On recherche le produit avec son id pour être sur qu'il est bien dans le panier
    
    if(idToDelete>= 0){
        panierProducts.splice(idToDelete,1);        //On supprime le produit s'il est présent   
        localStorage.clear();                   //On vide le localstorage pour le recharger ensuite sans le produit supprimé
        localStorage.setItem("panier",panierProducts);  
        console.log(id + " à était supprimé");
        productContenairCaddy.innerHTML = "";
        totalPrice = 0;
        loadPanierProducts;
    }
    
    
    if(idToDelete > -1){                        //Le produit recherché n'existe pas
    
        loadPanierProducts();
        checkPanier();
        
    }
}







const checkPanier = ()=>{                                               //Fonction qui va nous permettre de connaitre le panier

        if(localStorage.hasOwnProperty('panier')){                          //On vérifie si le localStorage à la propriété panier et donc qu'il n'est pas vide
            panierProducts=localStorage.getItem("panier").split(",");
            panierVide.classList.add("deleteThis");
            panierVide.classList.remove("panierVide");
            // formulaire.innerHTML =  '<label>Formulaire de commande</label><input type="text" id="firstName" name="firstName"   placeholder="   Prénom" required><input type="text" id="lastName" name="lastName"  placeholder="   Nom" required><input type="text" id="adress" name="address"  placeholder="   Adresse" required><input type="text" id = "city" name="city" placeholder="   Ville" required><input type="email" id="email" name="email" placeholder="    Email" required><input type="submit" id="submitButton" onclick="submitForm()"></input>'
            
            if(panierProducts[0] == "" ){panierProducts.splice(0,1)}           //On supprime le bug de la chaine de caractères vides
            else if(panierProducts.length == 0){
                panierVide.classList.remove("deleteThis");
                panierVide.classList.add("panierVide");
            };
        }
        if(panierProducts.length == 0){
            panierVide.classList.remove("deleteThis");
            panierVide.classList.add("panierVide");
            formulaire.classList.add("deleteThis");

        };
        

}

checkPanier();



    





const loadPanierProducts = () => {                          //On crée une fonction qui va intégrer nos produits à la page panier
    const xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        const product = JSON.parse(xhr.responseText);
       
        
         
    const afficherProduit =`<div class="productsCaddy" id="${product._id}" > <img src="${product.imageUrl}"><div class="productInfoCaddy"><div id="panierPageButtons"><h3>${product.name}</h3><div id="shoppingButtons"><span class = "addButton" onclick="addToCard('${product._id}')"><i class="fas fa-plus-circle" ></i></span><i class="fas fa-minus-circle" onclick = "removeToCard('${product._id}')"></i></div></div><p>Prix : ${product.price}</p><p>${product.description}</p>`;
    let colors = "<select placeholder='Choisissez votre couleur'>";
    product.colors.forEach(color => {
        colors += `<option value = "${color}">${color}</option>`
    });

    document.querySelector("#productsContenairCaddy").innerHTML += afficherProduit + colors + "</select>";
    totalPrice += product.price;                                                                                    //On calcule le prix total
    
    }
    if(panierProducts.length>0){
        panierProducts.forEach(id => {                                          //On obtient les informations propres à chaque produit en faisant une boucle qui va parcourir notre panier
        xhr.open("GET","http://localhost:3000/api/teddies/" + id, false);   //On utilise les id des produits pour récupérer leurs données dans l'API
        xhr.onerror =()=>{
            console.log("API introuvable à cette adresse");
        }
        xhr.send();
        });
    }
    totalPriceContenair.innerHTML = `Prix total : ${totalPrice}`;   //Intégration du prix total
    };


    
        

loadPanierProducts();                        //On lance la fonction qui va charger les produits du client



const submitForm = ()=>{                    //On crée la fonction qui nous permettra d'envoyer notre formulaire

    

    submitButton.addEventListener("click",(e)=>{
        e.preventDefault();
        checkForm();
        if(document.querySelectorAll(".goodInput").length == 5){
            submitRequest();
        }
        
        else
        {
            checkForm();
            
    
        }
        });   

    let contact = new contactCreate(firstNameForm.value,lastNameForm.value,adressForm.value,cityForm.value,emailForm.value); 
    const submitRequest = ()=>{
       
    const xhr = new XMLHttpRequest();
    const products = panierProducts;
    let requestToSend = {                                   //On crée l'objet attendu par l'API pour répondre correctement
        contact : contact,
        products : products
    } ;
    xhr.onload = (e)=>{
        
        
        const orderConfirm = JSON.parse(xhr.responseText);
        console.log(orderConfirm.orderId);
        localStorage.setItem("prenomClient",firstNameForm.value);
        localStorage.setItem("totalPrice",totalPrice)
        localStorage.setItem("orderID",orderConfirm.orderId); 
        document.location.href = `confirmation.html#${orderConfirm.orderId}`;

        
    }
    xhr.open("POST", "http://localhost:3000/api/teddies/order", false);
    xhr.setRequestHeader("Content-Type", "application/json");
        
    xhr.send(JSON.stringify(requestToSend));                            //On converti l'objet au format JSON avant de l'envoyer
       
        
    }
    
     
    const checkForm = ()=>{      //Fonction qui va nous permettre de vérifier si l'utilisateur à entrer des données valides dans le formulaire avant de l'envoyer
        
    
    inputs.forEach( input =>{
        
        const verifLetters = new RegExp("/D")                                                       //Expressions régulières qui vont vérifier ce que leurs noms indiquent
        const verifNumbers = new RegExp("[0-9]");
        const verifMail = new RegExp(/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i);
        // console.log(input.name + "  " +verifLetters.test(input.value));
        // console.log(input.name + " " + input.value)
       if(input.value == "" && input != submitButton) {
            
            input.classList.add("badInput");
            input.classList.remove("goodInput");
            input.placeholder = `Merci d'indiquer votre ${input.name}`;
            
            
            
           
       
       }
       else if(verifNumbers.test(input.value) == false && input.name != "submitButton" && input.name != "Adresse" ){
                        
                        input.classList.remove("badInput");
                        input.classList.add("goodInput");    
            
                    }
        else if(input.name == "Prénom" && input.value != "" || input.name == "Nom" && input.value != "" || input.name == "Ville" && input.value != ""){
                        if(verifNumbers.test(input.value) == true){
                                    
                                    console.log("Mauvaise entrée à " + input.name);
                                    input.classList.add("badInput");
                                    input.classList.remove("goodInput");
                                    input.value="";
                                    input.placeholder = "Merci de n'entrer que des lettres dans cette case";
                                }

                        
                    };

        if(input.name == "Adresse" && input.value != ""){
            input.classList.add("goodInput");
            input.classList.remove("badInput");
        }
        else if(input.name == "Adresse" && input.value != ""){
            input.classList.add("goodInput");
            input.classList.remove("badInput");
        };

       if(input.name == "Adresse électronique" && input.value != ""){
            console.log(verifMail.test(input.value));
            if(verifMail.test(input.value) == false){
                console.log("Mauvaise entrée à " + input.name);
                input.classList.add("badInput");
                input.classList.remove("goodInput");
                input.value="";
                input.placeholder = "Merci d'entrer une adresse électronique valide";
            }
            else{
                input.classList.remove("badInput");
                input.classList.add("goodInput");
            }
       };             
    
        

    })

    

    };      

    
    
    

    
    };

 submitForm();   
    
 