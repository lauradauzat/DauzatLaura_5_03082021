var i = 0;
const table = document.getElementById('teddieTable'); 
const totalHtml = document.getElementById('total'); 
const globalHtml = document.getElementById('global');
let display; 
var price; 
let total = 0; 

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

function test() {
    //code pour supp un item de localStorage 
}

// 1. Récupérer les articles dans le localStorage
let panierStr = localStorage.getItem("panier");
let panierObj = JSON.parse(panierStr);

//Calculer 


if (panierObj == null) {

    while (globalHtml.hasChildNodes()) {
        globalHtml.removeChild(globalHtml.firstChild);
    }
    
    globalHtml.innerHTML = '<div  class="col-12 d-flex align-items-center "><h1> Votre panier est vide </h1></div>';
    
    
}
// 2. Récuperer les informations sur l'article
panierObj.forEach(article => {
    fetchArticle(article.id, article.quantite);
    
    console.log(i);
 
  


    fetch("http://localhost:3000/api/teddies/"+article.id)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

       
        response.json().then(function(data) {
            display = data;
            price = (display.price / 100); 
      
            
       
            //affiche le résultat 
            //voir pour le mettre plutôt dans une fonction 

            //si j'ai envie de compter les quantité correctement, c'est ici que ca se passe ! 
            // creer un nouveau tableau a partir des données data 

            table.innerHTML += `
                <tr>
                <th scope="row"> ${display.name}</th>
                <td> 1 </td>
                <td>${price}</td>
                <td>
                <button onclick="test();"> x </button>
                </td>
                </tr>
            `;
        
            total += price; 
            
            totalHtml.innerHTML = `Total : ${total} €`
            

            

        });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    i++;
    
});

   
   
// 3. Afficher l'article sur la page
// function displayArticle(article, quantite) {

//         table.innerHTML += `
//         <tr>
//         <th scope="row"> ${display.name}</th>
//         <td>${quantite}</td>
//         <td>${price}</td>
        
//         </tr>
//     `;


// }


// displayTotal();

// function displayTotal() {
//     totalHtml.innerHTML += `
//         ${total} €`;
// }



function fetchArticle(id) {
    url_article = 'http://localhost:3000/api/teddies/' + id; 
    console.log(url_article); 
    fetch(url_article, {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    // .then(data => displayArticle(data, quantite))
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
}

