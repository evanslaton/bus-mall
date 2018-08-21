'use strict';

// Declare array to store objects created via constructor function
var productObjectsArray = [];

// Constructor function
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClicked = 0;
  this.timesShown = 0;
  productObjectsArray.push(this);
}

// Determines how many products to display
/* ============================ */
Product.numOfProductsToDisplay = 3;
/* ============================ */

Product.ulEl = document.getElementById('product-images');
Product.previousProductsShown = [];
Product.currentProductsShown = [];
Product.totalUserClicks = 0;
Product.productNameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates a random number
Product.getRandomNum = function() {
  return Math.floor(Math.random() * Product.productNameArray.length);
};

// Generates unique random numbers that are different than the previous unique random numbers
Product.currentRandomNums = function() {
  var randomNum;
  Product.previousProductsShown = Product.currentProductsShown;
  Product.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (Product.currentProductsShown.length < Product.numOfProductsToDisplay) {
    randomNum = Product.getRandomNum();
    if (Product.currentProductsShown.indexOf(randomNum) === -1 && Product.previousProductsShown.indexOf(randomNum) === -1) {
      Product.currentProductsShown.push(randomNum);
    }
  }
  console.log('Previous', Product.previousProductsShown);
  console.log('Current', Product.currentProductsShown);
  console.log('***********************************************');
};

// Renders products to the screen
Product.renderProducts = function() {
  Product.currentRandomNums();
  Product.ulEl.innerHTML = '';

  for (var i = 0; i < Product.numOfProductsToDisplay; i++) {
    var ilEl = document.createElement('li');
    var figureEl = document.createElement('figure');
    var imgEl = document.createElement('img');
    imgEl.src = productObjectsArray[Product.currentProductsShown[i]].path;
    imgEl.alt = productObjectsArray[Product.currentProductsShown[i]].name;
    var figCaptionEl = document.createElement('figcaption');
    figCaptionEl.textContent = productObjectsArray[Product.currentProductsShown[i]].name;

    Product.ulEl.appendChild(ilEl);
    ilEl.appendChild(figureEl);
    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCaptionEl);

    productObjectsArray[Product.currentProductsShown[i]].timesShown++;
  }
};

// Retrieves the object that was clicked on then increments its timesClicked value and totalUserClicks
Product.clickedOn = function(event) {
  var elementClickedOn = event.target.textContent;

  if (!elementClickedOn) {
    elementClickedOn = event.target.alt;
  }

  // Returns an array with one value, the object that was clicked on
  var objectToUpdate = productObjectsArray.filter(function(object) {
    return object.name === elementClickedOn;
  });

  objectToUpdate[0].timesClicked++;
  Product.totalUserClicks++;

  // Checks to see if the user has more clicks and terminates the program if not
  if (Product.totalUserClicks === 25) {
    Product.displayData();
  } else {
    Product.renderProducts();
  }
};

// Displays end data
Product.displayData = function() {
  Product.ulEl.removeEventListener('click', Product.clickedOn);
  Product.ulEl.innerHTML = '';
  for (var i = 0; i < productObjectsArray.length; i++) {
    var pEl = document.createElement('p');
    pEl.textContent = `The ${productObjectsArray[i].name} was shown ${productObjectsArray[i].timesShown} times and voted for ${productObjectsArray[i].timesClicked} times.`;
    Product.ulEl.appendChild(pEl);
  }
};

// IIFE that creates a new object for each product using the constructor function
(function() {
  Product.productNameArray.forEach(function(product) {
    return new Product(product);
  });
})();

// Binds clickedOn to ulEl
Product.ulEl.addEventListener('click', Product.clickedOn);

Product.renderProducts();


