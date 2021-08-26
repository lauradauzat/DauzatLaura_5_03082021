

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


let ours

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
    document.getElementById('oursPrice').innerHTML += ours.price; 
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

btn.addEventListener("click", function () {
  console.log('Ajout panier clicked'); 
  const teddieColors = document.getElementsByTagName('select'); 
  const teddieColorSelected = teddieColors[0].value;

  if (teddieColorSelected != "Couleur...") {
   
    localStorage.setItem(ours.name, teddieColorSelected); 
    console.log(localStorage);
    
    
  } else {
    console.log("Merci de choisir une couleur"); 
  }
  
}); 

