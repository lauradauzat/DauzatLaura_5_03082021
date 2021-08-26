

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
       
        console.log(ours.colors); 
        
        document.getElementById('oursName').innerHTML = ours.name;
        document.getElementById('oursDescription').innerHTML = ours.description;
        document.getElementById('oursPrice').innerHTML += ours.price; 
        document.getElementById('oursImg').src = ours.imageUrl; 


        colorCount = 0; 

         for (let color of ours.colors) {

            document.querySelector('.selector').innerHTML +=  `<option value="${colorCount}">${color}</option>`;
           colorCount ++; 
         
           }     

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  

