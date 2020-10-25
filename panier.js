// if nothing in the local storage = nothing in the cart = user redirected to the homepage

if (localStorage.length === 0) {goBackToHomePage()}

// this function will be call if there is something in the loccalstorage
let checkCartContent = async () => { if( localStorage.length > 0) {console.log("cart not empty")} };

// updating the counter of products (top right of the window)
updateCounter();

// when the promised is resoved, this function is called 
checkCartContent()
.then( () => {
  let content = Object.values(localStorage); 
  let prices = [];                                // creates an array with the prices (strings from the local storage)
  for (let i in content) {
    let filter = content[i].split(" ").pop();     // popping the symbol € from the string
    prices.push(filter);                          // populate the array of prices
  }
  let names = [];                                 // creates an array for the name of the products
  for (let i in content) {
    const regex = /[A-Za-z]/g;                   //  will match letters only
    let found = content[i].match(regex).join();  
    names.push(found);
  }
  let newnames = [];
  for (let i in names) {
    let filtered = names[i].replaceAll(",", ""); // deleting all the comas in the array, we have the names of the products
    newnames.push(filtered);                     // populating the arrays newnames
  }
  for (let i in newnames) {
    let cart_for_name = document.getElementById("cart_for_name");
    let item_name = document.createElement('p');
    item_name.textContent = newnames[i];
    cart_for_name.appendChild(item_name);       // fullfills the order form with name of the products
  }
  for (let i in prices) {
    let cart_for_prices = document.getElementById("cart_for_prices");
    let item_price = document.createElement('p');
    item_price.textContent = prices[i] + " €";
    cart_for_prices.appendChild(item_price);    // fullfills the order form with the prices of the products
  }
  let prices_as_numbers = [];
  for (let i in prices) {
    let a = parseInt(prices[i]);                // parsing the strings prices to integers
    prices_as_numbers.push(a);                  // creates an array of intgeres prices to do operations with them
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue; // calculates the amount of the ordrer
  let totalled = prices_as_numbers.reduce(reducer);
  let total = document.getElementById('total');
  total.textContent = totalled + " €";          // fills the order form with the total amount of the order
  console.log(totalled)                         
  return totalled;                              // returns the total, which will be send to the server
})
.catch( (error) => {
  showError();
  console.log(error)
})

let contact = new Object;                       // creates the contact object to be send to the server



// following functions : one function, for each input
// checking the validity of each one with regular expressions
// returns true when the form is valid
// returns false when the form is not valid and show an alert to the user
// will show also error with a wide red border on the wrong input (for 5 seconds)

function checkSurname() {
  let surnameElt =     document.querySelector("input#surname");
  let surname =        document.getElementById("surname").value;
  let surnameRegex =   /^[a-z ,.'-]{3,30}$/i;
  if (surnameRegex.test(surname)) {
    contact.firstName = surname;
    return true
  } else {
    surnameElt.focus();
    surnameElt.style.border = "10px dashed rgba(255,0,0,80%)";
    setTimeout(() => {surnameElt.style.border = "1px dashed rgba(0,0,0, 50%)"}, 5000); 
    borderNormal();
    alert("insert a valid firstname, no digits or special characters");
    return false
  }
}
  
function checkLastName() {
  let lastnameElt =    document.querySelector("input#lastname");
  let lastname =       document.getElementById("lastname").value;
  let lastnameRegex =   /^[a-z ,.'-]{3,30}$/i;
  if (lastnameRegex.test(lastname)) {
    contact.lastName = lastname;
    return true
  } else {
    lastnameElt.focus();
    lastnameElt.style.border = "10px dashed rgba(255,0,0,80%)";
    setTimeout(() => {lastnameElt.style.border = "1px dashed rgba(0,0,0, 50%)"}, 5000); 
    borderNormal();
    alert("insert a valid lastname, no digits or special characters");
    return false
  }
}
 
function checkAddress() {
  let addressElt =     document.querySelector("input#address");
  let address =        document.getElementById("address").value;
  let addressRegex =   /^[a-z ,.'-\d]{3,30}$/i;
  if (addressRegex.test(address)) {
    contact.address = address;
    return true
  } else {
    addressElt.focus();
    addressElt.style.border = "10px dashed rgba(255,0,0,80%)";
    setTimeout(() => {addressElt.style.border = "1px dashed rgba(0,0,0, 50%)"}, 5000);
    borderNormal();
    alert("insert a valid adress, no special characters");
    return false
  }
}

function checkCity() {
  let cityElt =        document.querySelector("input#city");
  let city =           document.getElementById("city").value;
  let cityRegex = /^[a-z ,.'-\d]{3,30}$/i;
  if (cityRegex.test(city)) {
    contact.city = city;
    return true
  } else {
    cityElt.focus();
    cityElt.style.border = "10px dashed rgba(255,0,0,80%)";
    setTimeout(() => {cityElt.style.border = "1px dashed rgba(0,0,0, 50%)"}, 5000); 
    borderNormal();
    alert("insert a valid city name, no special characters");
    return false
  }
}
 
function checkEmail() {
  let emailElt =       document.querySelector("input#email");
  let email =          document.getElementById("email").value;
  let emailRegex =   /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i;
  if (emailRegex.test(email)) {     
    contact.email = email;
    return true
  } else {
    emailElt.focus();
    emailElt.style.border = "10px dashed rgba(255,0,0,80%)";
    setTimeout(() => {emailElt.style.border = "1px dashed rgba(0,0,0, 50%)"}, 5000); 
    borderNormal();
    alert("insert a valid email address");
    return false
  }
}

// the below function will check the validity of each input
// by checking if booleans returned by the functions are true or false

function checkForm() {
  if (checkSurname() && checkLastName() && checkAddress() && checkCity() && checkEmail()) {
    return true
  }
  else {
    console.log("users inputs are not valid")
  }
}

// below function is triggered when the user click on button html element with onclick="send()" attributed to it
// function check first if the checkform returns true (meaning a valid fullilled contact form)
function send() {
  if(checkForm()) {
    let products = [];                              // creates the array of products to be send to the server
    
    let productList = Object.keys(localStorage);
    
    for (let i in productList) {  
      products.push(productList[i].slice(6,));      // populate products array
    }
    
    let order = {                                   // create the object to be send to the server with contact object and products array
      contact :           contact,
      products :          products
    }
    
    console.log(JSON.stringify(order));             // checking if the order object fits with what is expected by the server
    
    fetch("http:localhost:3000/api/furniture/order", {    // creates the post request
      method: "POST", 
      headers: { 
        "Content-type": "application/json"
      },
      body: JSON.stringify(order)
    }) 
    
    .then(response => response.json())
    .then(data => {                                   // this will put the information of the order in the url
      console.log(data.orderId);
      let newLink =         document.createElement('a');  
      newLink               .href='confirmation.html?orderId=' + data.orderId; // confirmation.html will use these datas
      let total =           document.getElementById('total').textContent;
      localStorage          .setItem("total", total);
      window.location.href = newLink;
      window.open(newLink);                           // opens the confirmation page
    })
  }
}


// updates the counter top right of the screen with the number of products in the localstorage
function updateCounter() {
  let counted = localStorage.length;
  let count = document.getElementById("counter");
  count.textContent = counted;
}

// send back the user to the homepage (when the local storage is empty)
function goBackToHomePage(){
  let body = document.querySelector("body");
  body.style.background = "rgba(0,0,0,90%)";
  setTimeout(() => { alert("nothing in the cart, you are going to be redirected to the homepage"), 2000; }); // let something appear on the screen with the zero counter in red, instead of a plain white aggressive page
  window.location.href = 'index.html';
  window.open(window.location.href);
}

// function which gives back a normal border aspect to the inputs, after having being wrong (wide red border)
function borderNormal() {
  let input = document.getElementsByTagName('input');
  input[0].style.border = "border: 3px solid black";  
}

// show to the user that an error occured 
function showError(){
  let main = document.querySelector('main');
  let h2 = document.createElement('h2');
  h2.innerHTML = "oops, something went wrong!";
  main.append(h2);
}