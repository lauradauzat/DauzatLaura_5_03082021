const queryString = window.location.search; 

console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const idClient = urlParams.get('id'); 
const nameClient = urlParams.get('name'); 
const prixCommande = urlParams.get('price').replace(/['"]+/g, '');
let contentHtml = document.getElementById('confirmation-content');


if (idClient && nameClient) {
    contentHtml.innerHTML = `
    
    <h1> Merci de votre commande ${nameClient} </h1>

    <p> Votre commande d'un montant de ${prixCommande}€ à bien été réglée. <br>Elle va être transmise à notre partenaire La Postoco pour son transport </p>
    <p> Vous pouvez le suivre avec le numéro de suivi : ${idClient} </p>
    
    `;

    localStorage.clear(); 
    
    panierHandler(); 
}