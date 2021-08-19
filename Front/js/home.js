

fetch("http://localhost:3000/api/teddies/")
    .then( data => data.json())
    .then( jsonListArticle => {

        for(let jsonArticle of jsonListArticle) {
            let teddieCount = 0; 
            let article = new Article(jsonArticle);
            let colorCount = 0; 

         
            document.querySelector('#teddies-card-container').innerHTML += `  
            <div class="card col-sm-5 col-md-4 col-lg-3 m-3 shadow" >
            <img class="card-img-top p-3" src="${article.imageUrl}" alt="">
            <div class="card-body">
              <h4 class="card-title" id="test">${article.name}</h4>
              <p class="card-text">
                ${article.description}
              </p>
              <div class="input-group mb-3">
                <select class="custom-select selector" id="inputGroupSelect02">
                  <option selected>Couleur...</option>
              
                </select>
                
              </div>
              <p class="card-text">
              Prix : ${article.price}€            
              </p>
              <a href="#!" class="btn btn-primary">Ajouter au panier</a>
            </div>
          </div>
          `;

          for (let color of article.colors) {
            console.log(color); 
            document.querySelector('.selector').innerHTML +=  `<option value="${colorCount}">${color}</option>`;
            colorCount ++; 
            console.log(colorCount);
            
        }      
        }


      
        
       
    });