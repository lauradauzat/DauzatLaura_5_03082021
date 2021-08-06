// En haut du fichier, référencer l'élément HTML  --> ID de Main //
const teddieName = document.getElementById('test');

function renderTeddies() {
    teddieName.innerHTML = 'Coucou';
}

renderTeddies(); 

//utiliser fetch, et executer renderTeddies en passant en paramettre l'Array Teddies 

//While teddies ..

//Tentative d'accès a l'API 
fetch('http://localhost:3000/api/teddies/')
  .then(response => response.json())
  .then(data =>
    console.log(data));