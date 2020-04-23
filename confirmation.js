const confirmationMessageContenair = document.querySelector("#confirmationMessage");

const confirmCommand = () => {  //Fonction qui va nous permettre de remercier le client à sa commande

    if(localStorage.hasOwnProperty("prenomClient") && localStorage.hasOwnProperty("orderID") && localStorage.hasOwnProperty("totalPrice")){    //On s'assure que le client a bien respecté le chemin de vente prévu
    
        const prenomClient = localStorage.prenomClient;
        const orderId = localStorage.orderID;
        const totalPrice = localStorage.totalPrice;
        
        localStorage.clear();

        confirmationMessageContenair.innerHTML = `<p>${prenomClient} toute l'équipe d'orinoco vous remercie pour votre commande</p><br><p>D'un montant de ${totalPrice}</p><br><p>Votre numéro de commande est ${orderId}</p><br><p>A très bientôt sur Orinoco</p>`

    }
    else{
        confirmationMessageContenair.innerHTML = `<p>Désolé mais nous n'avons aucune commande de votre part</p><br><a href="index.html">Faites un tour dans la boutique vous trouverez votre bonheur</a>`;
    }
};

confirmCommand();