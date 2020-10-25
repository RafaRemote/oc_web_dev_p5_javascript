// creates a  async function, returns the order id included in the url
async function thanks() {
    if (localStorage.length <= 0) {
        goBackToHomePage();
    } else {
    idFinder = new URLSearchParams(document.location.search);
    let id = await idFinder.get("orderId");
    return id;
    }
}

// once the above promise resolved, then theses functions are called
thanks()
    .then((id) => {
    // sets the counter at the top right of the screen to zero
    let count = document.getElementById("counter");
    count.textContent = 0;

    // get the data from the local storage. (total)
    let total = localStorage.getItem('total');
    console.log("the total of this command is: " + total);

    //displays the informations on the screen and a thanks
    let confirmation_box =  document.getElementById('confirmation');
    let confirmation =      document.createElement('div');
    confirmation.innerHTML = "Thanks for your purchase @ Orinoco! Your order id is: <br /><br /> " + id;
    confirmation_box.appendChild(confirmation);

    let total_price = document.createElement('p');
    total_price.innerHTML = "your order total is: <br /><br /> " + total;
    confirmation.appendChild(total_price);

    // clearing the local storage
    localStorage.clear();
    })
    .catch(function(e) {
        showError();
        console.error("error catched!: " + e.message);
})

// show to the user that an error occured 
function showError(){
    let main = document.querySelector('main');
    main.classList.add('design_fiche_de_liste');
    main.style.margin = "7rem";
    main.innerHTML = "oops, something went wrong!";
}


// send back the user to the homepage (when the local storage is empty)
function goBackToHomePage(){
    let main = document.querySelector('main');
    main.remove();
    let body = document.querySelector("body");
    body.style.background = "rgba(0,0,0,90%)";
    setTimeout(() => { alert("nothing in the cart, you are going to be redirected to the homepage"), 2000; });
    window.location.href = 'index.html';
    window.open(window.location.href);
  }