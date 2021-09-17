
const id = getId(); 
const btn = document.getElementById('ajoutPanier'); 

function getId() {
    const param = window.location.search; 
    const id = param.replace("?id=", ""); 
    return id; 
}

function getFetch() {
    const fetchId = "http://localhost:3000/api/teddies/" + id ; 
    return fetchId;  
}

const fetchId = getFetch();
const panierFullHtml = document.getElementById('panierFull');
let ours;

//récupère les données de l'API sur un teddie 
fetch(fetchId)
.then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        ours = data; 

        //rassemble tout le code pour creer la div
        printProduit();
          

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });


//traitement des données pour le select avant le print
function printOursSelect() {
    colorCount = 0; 
         for (let color of ours.colors) {
            document.querySelector('.selector').innerHTML +=  `<option value="${color}">${color}</option>`;
           colorCount ++; 
           }  
}

//rassemble tous les élements de la div 
function printProduit() {
    document.getElementById('oursName').innerHTML = ours.name;
    document.getElementById('oursDescription').innerHTML = ours.description;
    document.getElementById('oursPrice').innerHTML += `${ours.price/100} €`; 
    document.getElementById('oursDescription').innerHTML = ours.description;
    document.getElementById('oursImg').src = ours.imageUrl; 
    printOursSelect();
}

btn.addEventListener("click", function (e) {
  const teddieColors = document.getElementsByTagName('select'); 
  const teddieColorSelected = teddieColors[0].value;

  if (teddieColorSelected != "Couleur...") {
    
    // Créer un objet JSON de l'article à ajouter au panier
    let article = {
      "id": id
    }

    // Récupérer le panier stocké dans localStorage
    let panierStr = localStorage.getItem("panier");
  
    if (panierStr == null) {
      let panierObj = [article];
      panierStr = JSON.stringify(panierObj);
      localStorage.setItem("panier", panierStr);
      panierHandler();
      
    }
    else {
      let panierObj = JSON.parse(panierStr);
      panierObj.push(article);
      panierStr = JSON.stringify(panierObj);
      localStorage.setItem("panier", panierStr);
      panierHandler();
      
    }
    
  } else {
    console.log("Merci de choisir une couleur"); 
    alert('Merci de choisir une couleur');
    e.preventDefault();
  }
  
}); 

