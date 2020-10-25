//waiting for the DOM to be loaded, once loaded, calls the getData function
document.addEventListener("DOMContentLoaded", getData())

let counted = localStorage.length;
let count = document.getElementById("counter");
count.textContent = counted;

//async function which waits the answer of the servers, then return the answer as a variable named product
async function getData() {
  idFinder =      new URLSearchParams(document.location.search);
  id =            idFinder.get("id");
  urlApi =        "http://localhost:3000/api/furniture/" + id;
  
  response =      await fetch(urlApi);
  let product =   await response.json();
  
  return product;
}

// once the promise is resolved, we get the variable wich will be passed in these functions
// it creates html elements and populates them
getData()
.then((prod) => {
  let name_title_place        = document.getElementById("name_title");
  let image_place             = document.getElementById("image");
  let description_place       = document.getElementById("description");
  let price_place             = document.getElementById("price");  
  let image_fiche             = document.createElement("img");
  let name_title              = document.createElement('h2');
  let description_paragraph   = document.createElement("p");
  let price_paragraph         = document.createElement("p");
  image_fiche                 .classList.add("two_third", "rounded" );
  let name                    = prod.name;
  let image                   = prod.imageUrl;
  let description             = prod.description;
  let price                   = prod.price; 
  name_title                  .innerText = name;
  description_paragraph       .innerText = description;
  price_paragraph             .innerText = price / 100 + " €";
  name_title                  .classList.add("two_third");
  description_paragraph       .classList.add("purple", "two_third");
  price_paragraph             .classList.add("purple", "two_third");
  image_fiche                 .setAttribute("src", image);
  name_title_place            .appendChild(name_title);
  image_place                 .appendChild(image_fiche);
  description_place           .appendChild(description_paragraph);
  price_place                 .appendChild(price_paragraph);  
  //below it will create the list of options (varnishes) in the select element of the webpage
  const varnish  = prod.varnish;
  varnish.forEach((i) => {
    let option =        document.createElement('option');
    let select =        document.querySelector('select');
    option              .value = i;
    option              .innerText =  i;
    select              .appendChild(option);
  })
})
.catch(function(e) {
  showError();
  console.error("error catched!: " + e.message);
})

// async function addToCart(details) {
//   details = await getData();
//   return details;
// }


// the lines below attributes a class to children of select html element

let select =           document.querySelector('select');                  
select                 .setAttribute("onchange", "addselected(event)");   

let addselected = (e) => { 
  let option = document.getElementsByTagName("option");
  let value = e.target.value
  console.log("Chosen Varnish is: " + value);
  for (let i=0; i < option.length; i++) {
    if(option[i].textContent == value) {
      option[i].parentElement.classList.add("enlightment");
    }
  }
};

// below: adding an event listener to tht element button

let btn = document.querySelector('button');

btn.addEventListener('click', () => {
  getData()                                     // awaiting the return of the function getData()
  .then((result) => {                           // will set an item in the local storage if not already in it 
    let id =            result._id;
    let keyid =         "keyid " + id;
    let name =          result.name;
    let price =         result.price / 100;
    console.log("id of the product added to the cart:" + id);       // show in the console the id of the product added in the cart
    let content = Object.keys(localStorage);                        
    if (content === 0 || (content.includes(keyid) === false ) ) {   // check if the product is already in the cart. 
      alert("item added to the cart")
    } else if (content !== 0 && content.includes(keyid)) {
      alert ("item already in the cart!")
    }     
    localStorage.setItem("keyid "+ id, name + " " + price);
    return localStorage.length
  })
  .then(() => {                                                   // updated the counter at the top right of the screen
    let counted = localStorage.length;
    let count = document.getElementById("counter");
    count.textContent = counted;
  })
  .catch((e) => {
    console.error("error catched!: " + e.message);
  }) 
})  

// show to the user that an error occured 
function showError(){
  let main = document.querySelector('main');
  main.classList.add('design_fiche_de_liste');
  main.style.margin = "7rem";
  main.innerHTML = "oops, something went wrong!";
}