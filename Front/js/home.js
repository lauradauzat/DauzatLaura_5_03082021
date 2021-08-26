class Article {
  constructor(jsonArticle) {
      jsonArticle && Object.assign(this, jsonArticle); 
  }
}

class ArticleManager {
  constructor(listArticle) {
      this.listArticle = listArticle; 
  }
}

fetch("http://localhost:3000/api/teddies/")
    .then( data => data.json())
    .then( jsonListArticle => {

        for(let jsonArticle of jsonListArticle) {
            let teddieCount = 0; 
            let article = new Article(jsonArticle);
            console.log(article); 
           

         
            document.querySelector('#teddies-card-container').innerHTML += `  
            <div class="card col-sm-5 col-md-4 col-lg-3 m-3 shadow" >
            <img class="card-img-top p-3" src="${article.imageUrl}" alt="">
            <div class="card-body">
              <h4 class="card-title" id="test">${article.name}</h4>
              <p class="card-text">
                ${article.description}
              </p>
              
              </div>
              <p class="card-text">
              Prix : ${article.price}€            
              </p>
              <a href="/Front/html/produit.html?id=${article._id}" class="btn btn-primary">Détails</a>
            </div>
          </div>
          `;

         
       
        }


      
        
       
    });


  