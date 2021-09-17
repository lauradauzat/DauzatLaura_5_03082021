
let article ; 

//récupère tous les teddies dans l'API 
fetch("http://localhost:3000/api/teddies/")
.then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        
        for (const article of data)
          {
            console.log(article); 
            // let teddieCount = 0;
            createDiv(article); 
          }

      

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

//création d'un carte en html pour chaque teddie récupéré
function createDiv(article) {
    document.querySelector('#teddies-card-container').innerHTML += `  
    <div class="card col-sm-5 col-md-4 col-lg-3 m-3 shadow" >
    <img class="card-img-top p-3" src="${article.imageUrl}" alt="">
    <div class="card-body">
      <h4 class="card-title" id="test">${article.name}</h4>
      <p class="card-text">
        ${article.description}
      </p>
      
      </div>
      <p class="card-text px-3">
      Prix : ${article.price/100}€            
      </p>
      <a href="/Front/html/produit.html?id=${article._id}" class="btn btn-primary m-3">Détails</a>
    </div>
  </div>
  `; 
}  
