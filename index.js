// when the DOM is loaded, call ready()
document.addEventListener("DOMContentLoaded", ready());

// below function ready() calls a fetch. 
// if response.ok: call other functions:  extract_liste()-> updateCounter() -> consoleLocalStorage();
// else if error: call showError to show the error to the user then show it in the console
function ready() {
    fetch("http://localhost:3000/api/furniture")
    .then(response => response.json())
    .then(response => {
        extract_liste(response);
        console.log("fetch succeeded!");
    })
    .then(()=>{
        updateCounter();
        console.log("counter updated!")
    })
    .then(()=>{
        consoleLocalStorage();
    })
    .catch(error => {
        showError(error);
        console.log("error, here is the error: ");
        console.error(error.message);
    })
}
// function below: create elements, add css classes, use the response returned by the fetch
// to fill the page. 
let extract_liste = (array) => {        
    array.forEach(function(iterateur) {
        let main =              document.getElementById('div_liste_produits'); 
        let fiche_de_liste =    document.createElement("div");   
        let name =              document.createElement("h3");
        let image =             document.createElement("img");
        let price =             document.createElement('div');
        let newLink =           document.createElement('div');
        let newLink_a =         document.createElement('a');    
        name                    .classList.add("centered", "spaced");
        image                   .classList.add("sized", "rounded", "shadow", "imagez", "borderless");
        price                   .classList.add("price_tag");
        fiche_de_liste          .classList.add("design_fiche_de_liste");
        newLink                 .classList.add("details");
        main                    .classList.add("design_liste");
        image                   .setAttribute("src", iterateur.imageUrl);
        image                   .setAttribute("alt", iterateur.name);
        newLink_a               .href = 'produit.html?id=' + iterateur._id;
        name                    .textContent = iterateur.name;          
        price                   .textContent = iterateur.price/100 + " €";
        newLink                 .innerText = "DETAILS";
        newLink_a               .appendChild(newLink);
        fiche_de_liste          .appendChild(name);
        fiche_de_liste          .appendChild(image);
        fiche_de_liste          .appendChild(price);
        fiche_de_liste          .appendChild(newLink_a);
        main                    .appendChild(fiche_de_liste);   
    });
};  

// update the counter (at the top right of the page)
function updateCounter() {
    let counted = localStorage.length;
    let count = document.getElementById("counter");
    count.textContent = counted;
}

// check the localstorage and console.log its content
function consoleLocalStorage() {
    let content_in = Object.values(localStorage);
    if (localStorage.length === 0) {
        console.log("content of the local storage: empty!")
    } else {
        console.log("content of the local storage: " + content_in)
    }
}

// show to the user that an error occured 
function showError(e){
    let main = document.querySelector('main');
    let h2 = document.createElement('h2');
    h2.innerHTML = "oops, something went wrong! <br /> <br />" + "( " + e.message + " )";
    main.append(h2);
}