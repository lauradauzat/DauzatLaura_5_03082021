
const table = document.getElementById('teddieTable'); 
const totalHtml = document.getElementById('total'); 
const globalHtml = document.getElementById('global');
const panierMenu = document.getElementById('panier-menu'); 

//Récupère données du localStorage
let panierStr = localStorage.getItem("panier");
//transforme ces données en objet (from String) pour pouvoir les manipuler
let panierObj = JSON.parse(panierStr);

let display; 
var price; 
let total = 0; 

loadContent();

//function qui gère le visuel de l'icone panier du menu 
function panierHandler(){
    
 
    if (localStorage.getItem('panier') === null) {
   
      console.log('panier = null');
      panierMenu.innerHTML = `Panier <span id="panierFull text text-danger" > <i class="bi bi-app"></i>`;
  
    } else if  (localStorage.getItem('panier')) {
   
      
      console.log("panier is set");
      
      let panierStr = localStorage.getItem("panier");
      let panierObj = JSON.parse(panierStr);
      let countPanier = 0; 
      panierObj.forEach(article => {
      countPanier ++;
      });
      
      panierMenu.innerHTML = ` Panier <span id="panierFull" > ${countPanier} <i class="bi bi-circle-square"></i> </span> `;
      
    }
}

//récupère les dates par l'id pour obtenir le nom et le prix de chaque teddy
function fetchArticle(id) {
    url_article = 'http://localhost:3000/api/teddies/' + id; 
    fetch(url_article, {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
}

//permet de recharger le contenu de la page
function loadContent() {
    // si le panier est vide - afficher "votre panier est vide"
    if (panierObj == null || panierObj.lenght == 0) {
        basketIsEmpty();    
    } else {
    //Récupere les informations sur l'article
    panierObj.forEach((article, index) => {
        fetchArticle(article.id);
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
 
                //affiche les rows du tableau en HTML 
                table.innerHTML += `
                    <tr>
                        <th scope="row"> ${display.name}</th>
                            <td> 1 </td>
                            <td>${price}</td> 
                            <td class='btn'>
                                 <button id='removebtn' class="btn btn-outline-success" onclick="deleteArticle(${index});"> x </button>
                                 </td>
                            </tr> `;

                    //si le fetch est fait sur la page formulaire, la commande est confirmé donc on bloque la possibilité de supprimer des articles
                    if(location.href.indexOf("formulaire") > -1) {
                        document.getElementById('removebtn').remove();
                    }

                total += price; 

                
                totalHtml.innerHTML = `Total : ${total} €`

            });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    
        
    });

    }

}

//function pour supprimer un article du panier via la croix 
function deleteArticle(indexDelete) {

    console.log('index Delete :', indexDelete);
    console.log('panierObj : ', panierObj);
    //deleting on object -> this works !!! 
    panierObj.splice(indexDelete,1);
    console.log('panier apres Splice :', panierObj);

    //sending back modifying the array and sending it back
    panierStr = JSON.stringify(panierObj);
    localStorage.setItem("panier", panierStr);
  
    location.reload();
    

}

//supprime tout le panier
function deleteAll() {
    localStorage.clear();
    basketIsEmpty();
    panierMenu.innerHTML = `Panier <span id="panierFull text text-danger" > <i class="bi bi-app"></i>`;
}

//affiche le HTML du panier vide  
function basketIsEmpty() {
    while (globalHtml.hasChildNodes()) {
        globalHtml.removeChild(globalHtml.firstChild);
    }    
    globalHtml.innerHTML = '<div  class="col-12 d-flex align-items-center "><h1> Votre panier est vide </h1></div>';
}    

//createURLpassingTotalPrice
function goToFormulaire() {
    url = 'formulaire.html?price="'+total+'"'; 
    window.location.href = url; 
}

