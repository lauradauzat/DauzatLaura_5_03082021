

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

window.addEventListener('storage', () => {

  panierHandler(); 
  console.log('window panier handler')

});

window.onload = panierHandler(); 