
function getId() {
    const param = window.location.search; 
    const id = param.replace("?id=", ""); 
    return id; 
}

const id = getId(); 

function getFetch() {
    const fetchId = "http://localhost:3000/api/teddies/" + id ; 
    return fetchId;
   
}

const fetchId = getFetch();
const panierFullHtml = document.getElementById('panierFull');


let ours;

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

//impression des differents éléments de la div produit

function printOursName() {
    document.getElementById('oursName').innerHTML = ours.name;
}

function printOursDescription() {
    document.getElementById('oursDescription').innerHTML = ours.description;
}


function printOursPrice() {
    document.getElementById('oursPrice').innerHTML += `${ours.price/100} €`; 
}

function printOursImg() {
    document.getElementById('oursImg').src = ours.imageUrl; 
}

function printOursSelect() {
    colorCount = 0; 

         for (let color of ours.colors) {

            document.querySelector('.selector').innerHTML +=  `<option value="${color}">${color}</option>`;
           colorCount ++; 
           
         
           }  
}

//rassemble tous les élements de la div 
function printProduit() {
    printOursName();
    printOursPrice(); 
    printOursDescription(); 
    printOursImg(); 
    printOursSelect();
}

//creation de l'event listenner sur le button ajout panier

const btn = document.getElementById('ajoutPanier'); 
// let quantite = 1;

btn.addEventListener("click", function (e) {
  console.log('Ajout panier clicked'); 
  const teddieColors = document.getElementsByTagName('select'); 
  const teddieColorSelected = teddieColors[0].value;

  if (teddieColorSelected != "Couleur...") {
    
    // 1. Récupérer la quantité de larticle à ajouter au panier
    
    // quantite ++;
    // clickCount ++; 
    // console.log(clickCount);


    // 2. Créer un objet JSON de l'article à ajouter au panier
    let article = {
      "id": id
      // "quantite": quantite
    }

    console.log(article); 

    // 3. Récupérer le panier stocké dans localStorage
    let panierStr = localStorage.getItem("panier");
    console.log('etape 3 :'+ panierStr);
    
   
    

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
      // const panierFullHtml = document.getElementById('panierFull');
      // panierFullHtml.remove(); 
      panierHandler();

      
    }





    
  } else {
    console.log("Merci de choisir une couleur"); 
    alert('Merci de choisir une couleur');
    e.preventDefault();
  }


  
}); 

