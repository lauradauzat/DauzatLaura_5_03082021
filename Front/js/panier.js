
const table = document.getElementById('teddieTable'); 
const totalHtml = document.getElementById('total'); 
let display; 
var price; 
let total = 0; 



//V1
// for (let i = 0; i < localStorage.length; i++ ) {
//     const key = localStorage.key(i); 
//     const value = localStorage.getItem(key); 
//     var parsed = JSON.parse(value); 
//     console.log(parsed); 
//     console.log(Object.values(parsed));


//     for (let i = 0 ; i < parsed.length; i++ ) {

//     test.innerHTML += 
//      `
//       ${Object.values(parsed)} loop ${i}
//      `;
  
//     }

// }


// 1. Récupérer les articles dans le localStorage
let panierStr = localStorage.getItem("panier");
let panierObj = JSON.parse(panierStr);


// 2. Récuperer les informations sur l'article
panierObj.forEach(article => {
    fetchArticle(article.id, article.quantite);
  

    fetch("http://localhost:3000/api/teddies/"+article.id)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            display = data;
            price = (display.price / 100); 
           


        });

        
        }

        
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    
    });

   
   
// 3. Afficher l'article sur la page
function displayArticle(article, quantite) {

        table.innerHTML += `
        <tr>
        <th scope="row"> ${display.name}</th>
        <td>${quantite}</td>
        <td>${price}</td>
        
        </tr>
    `;

  
    
   
}


// displayTotal();

// function displayTotal() {
//     totalHtml.innerHTML += `
//         ${total} €`;
// }



function fetchArticle(id, quantite) {
    url_article = 'http://localhost:3000/api/teddies/' + id; 
    console.log(url_article); 
    fetch(url_article, {
        method: 'GET',
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => displayArticle(data, quantite))
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      })
}



//a remettre v2
    // test.innerHTML += 
    // `
    // ${key}: ${value} loop ${i}
    // `;

    // table.innerHTML += `
    // <tr>
    // <th scope="row"> ${key}</th>
    // <td>Mark</td>
    // <td>${value}</td>
    
    //  </tr>
    // `;




// A faire : creer un objet teddie pour pouvoir stocker plusieurs key:value

// var output = JSON.parse(localStorage.getItem()); 
// console.log(output);

// const ted = localStorage(key); 
// var noString = localStorage.getItem(teddieObject); 
// console.log(noString); 

 

// for (let i = 0 ; i < localStorage.length; i++ ) {

//     const key = localStorage.key(i); 
//     const value = localStorage.getItem(key); 

//     test.innerHTML += 
//      `
//      ${key}: ${value}
//      end loop ${i}
//      `;

//      table.innerHTML += `
//      //     <tr>
//      //     <th scope="row"> ${key}</th>
//      //     <td>Mark</td>
//      //     <td>${value}</td>
         
//      //      </tr>
//      //     `; 
    
// };




