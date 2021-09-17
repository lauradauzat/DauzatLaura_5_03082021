//gestion du panier dans le menu 
function panierHandler() {
  const panierMenu = document.getElementById('panier-menu'); 
  const panierFull = document.getElementById('panierFull');
  if  (localStorage.getItem('panier')) {
 
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

//écouter les changements sur localStorage pour updater le menu 
window.addEventListener('storage', () => {
  panierHandler(); 
});

//à l'ouverture de la page - lancer panierHandler 
window.onload = panierHandler(); 