var nomInput = document.getElementById('inputNom'); 
var prenomInput = document.getElementById('inputPrenom'); 

var emailInput = document.getElementById('inputEmail'); 

var adresseInput = document.getElementById('inputAdresse'); 
var villeInput = document.getElementById('inputVille'); 

var contactForm = document.getElementById("contact-form"); 

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
            firstName: nom, 
            lastName: prenom, 
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

        // Pour la suite réféchir a la meilleure manière d'imprimer la nom et l'order id dans la page confirmation, 
        // en attendant j'ai preventDafault l'ouverture de la page confirmation 
        //idee : faire passer les params dans l'url ? 

    })
    
    .catch((error) => {
        console.error('Error:', error);
    });


    // async function postData(url = '', data = {contact, products}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //       mode: 'cors', // no-cors, *cors, same-origin
    //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: 'same-origin', // include, *same-origin, omit
    //       headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       redirect: 'follow', // manual, *follow, error
    //       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //       body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    //   }
      
    //   postData('http://localhost:3000/api/teddies/order', { answer: 42 })
    //     .then(data => {
    //       console.log(data); // JSON data parsed by `data.json()` call
    //     });
    


}



// {
//     "contact": {
//         "firstName": "Jean",
//         "lastName": "Michel", 
//         "address": "12 rue des Oliviers",
//         "city": "Toulouse", 
//         "email": "jeanmichel@gmail.com"
//     },
//     "products": [
//          "5be9c8541c9d440000665243"
//     ]
// }




// function validateEmail()
//     {
//         var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regexEmail.test(emailInput);
//     }


// //En cours --> Obj border vert quand donnée valide au keyup, border rouge, donnée invalide au focus out  

// emailInput.onkeyup = validateEmail; 


// if (validateEmail()) {
//     emailInput.style.borderColor = "green"; 
//     console.log('trueloop'); 
// } 

// if (!validateEmail()) {
//     emailInput.style.borderColor = 'blue'; 
//     console.log('falseloop'); 
// }

// console.log(validateEmail()); 





//ENVOYER LE POST 
// fetch('http://localhost:3000/api/teddies/order', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });