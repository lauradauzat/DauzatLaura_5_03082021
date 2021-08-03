// En haut du fichier, référencer l'élément HTML  --> ID de Main //
const teddiesElement = document.getElementById('teddies');

function renderTeddies() {
    teddiesElement.innerHTML = `<div>
    <h1> Coucou </h1>
    </div>
    `
}

renderTeddies(); 

//utiliser fetch, et executer renderTeddies en passant en paramettre l'Array Teddies 