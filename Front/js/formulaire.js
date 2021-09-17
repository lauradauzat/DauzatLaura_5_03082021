const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);

let nomInput = document.getElementById('inputNom'); 
let prenomInput = document.getElementById('inputPrenom'); 
let emailInput = document.getElementById('inputEmail'); 
let adresseInput = document.getElementById('inputAdresse'); 
let villeInput = document.getElementById('inputVille'); 
let contactForm = document.getElementById("contact-form"); 
let prixCommande = urlParams.get('price');
let submitBtn = document.getElementById('submitBtn');

//Par defaut le bouton d'envoi est bloqué
submitBtn.disabled = true; 

//form validation
//vérifie a chaque modification si le formulaire est pret à l'envoie
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', e => {
        checkIfEmpty(e); 
    });
})

//contrôle de l'email en regex
emailInput.addEventListener('input', (event) => {
     ValidateEmail(event);
 });

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))
  {
    emailInput.style.border = '1px solid #ced4da';
    return (true);
  } else if (emailInput.value === "") {
    emailInput.style.border = '1px solid #ced4da';
    return (false);
  }
    emailInput.style.border = 'red solid 1px';
    submitBtn.disabled = true; 
    return (false);
}

function checkIfEmpty() {
    if (nomInput.value === "" || prenomInput.value === ""  || emailInput.value === "" ||  adresseInput.value === "" ||  villeInput.value === "") {
        submitBtn.disabled = true; 

    } else {
        console.log("ok");
        if (ValidateEmail()) {
            //if tout est compélété et que l'email est valide en regex - rendre le button envoyer accessible 
            submitBtn.disabled =false; 
        }
    }
}

//on Submit click -> handleSubmit 
contactForm.addEventListener("submit", handleFormSubmit); 

function handleFormSubmit(event) {

    event.preventDefault();
    
    var productsContent = [];

    var nom = nomInput.value;
    var prenom = prenomInput.value; 
    var email = emailInput.value; 
    var adresse = adresseInput.value; 
    var ville = villeInput.value; 
    
    //recupère les données (ids) sur localStorage pour les stocker dans une array producsContent 
    let panierStr = localStorage.getItem("panier");
    let panierObj = JSON.parse(panierStr);
    for (i = 0; i < panierObj.length; i++){
        productsContent.push(panierObj[i].id); 
    }

    //creation de 'data' a envoyer a l'API
    var data = {
        contact: {
            firstName: prenom, 
            lastName: nom, 
            address: adresse, 
            city: ville, 
            email: email
        },
        products: productsContent
    }; 

    var nomPourCommande = ""; 
    var orderIdCommande = "";

    //envoi de la commmande a l'API 
    fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    .then(response => response.json())
    
    .then(data => {
        console.log('Success:', data);

        //récupération de données renvoyé par l'API
        nomPourCommande = data.contact.firstName; 
        orderIdCommande = data.orderId;
   
        //creation de l'url de la page de confirmation
        window.location.href = "/Front/html/confirmation.html?id="+orderIdCommande+"&name="+nomPourCommande+"&price="+prixCommande;
    })
    
    .catch((error) => {
        console.error('Error:', error);
    });

}



