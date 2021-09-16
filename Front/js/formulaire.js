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
submitBtn.disabled = true; 

function panierHandler() {
    const panierMenu = document.getElementById('panier-menu'); 
    
    if (localStorage.getItem('panier') === null) {
   
      console.log('panier = null');
  
    } else if  (localStorage.getItem('panier')) {
   
      
      console.log("panier is set");
      
      let panierStr = localStorage.getItem("panier");
      let panierObj = JSON.parse(panierStr);
      let countPanier = 0; 
      panierObj.forEach(article => {
      countPanier ++;
      });
      panierMenu.innerHTML = '';
      panierMenu.innerHTML += ` Panier <span id="panierFull" > ${countPanier} <i class="bi bi-circle-square"></i> </span> `;
      
    }
}

//handleSubmit 

contactForm.addEventListener("submit", handleFormSubmit); 
function handleFormSubmit(event) {

    event.preventDefault();
    
    var productsContent = [];

    
    var nom = nomInput.value;
    var prenom = prenomInput.value; 
    var email = emailInput.value; 
  
    var adresse = adresseInput.value; 
    var ville = villeInput.value; 
    


    let panierStr = localStorage.getItem("panier");
    let panierObj = JSON.parse(panierStr);
    for (i = 0; i < panierObj.length; i++){
        productsContent.push(panierObj[i].id); 
    }

    // console.log(contact);  
    // console.log(products); 

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

    var dataString = JSON.stringify(data); 
    console.log(dataString); 

    // console.log(data); 

 
    var nomPourCommande = ""; 
    var orderIdCommande = "";

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
        nomPourCommande = data.contact.firstName; 
        console.log(nomPourCommande);
        orderIdCommande = data.orderId;
        console.log(orderIdCommande);
   

        window.location.href = "/Front/html/confirmation.html?id="+orderIdCommande+"&name="+nomPourCommande+"&price="+prixCommande;

    })
    
    .catch((error) => {
        console.error('Error:', error);
    });

}


//form validation

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', e => {
        checkIfEmpty(e); 

    });
})


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
    return (false);
}

function checkIfEmpty() {
    if (nomInput.value === "" || prenomInput.value === ""  || emailInput.value === "" ||  adresseInput.value === "" ||  villeInput.value === "") {
        submitBtn.disabled = true; 

    } else {
        console.log("ok");
        if (ValidateEmail()) {
            submitBtn.disabled =false; 
        }
    }
}


