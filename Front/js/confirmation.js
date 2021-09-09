const queryString = window.location.search; 


console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const idClient = urlParams.get('id'); 
const nameClient = urlParams.get('name'); 

console.log(idClient); 
console.log(nameClient); 

var contentHtml = document.getElementById('confirmation-content');

function panierHandler() {
  const panierMenu = document.getElementById('panier-menu'); 
  const panierFull = document.getElementById('panierFull');
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

if (idClient && nameClient) {
    contentHtml.innerHTML = `
    
    <h1> Merci de votre commande ${nameClient} </h1>

    <p> Votre commande va être transmise à notre partenaire La Postoco pour son transport </p>
    <p> Vous pouvez le suivre avec le numéro de suivi : ${idClient} </p>
    
    
    `;

    localStorage.clear(); 
    
    panierHandler(); 
}