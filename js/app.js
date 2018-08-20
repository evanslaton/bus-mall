'use strict';

var productObjectsArray = [];

// Constructor function
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClicked = 0;
  this.timesShown = 0;
  productObjectsArray.push(this);
}

// Determines how many numbers to display
/* ============================ */
Product.numOfProductsToDisplay = 3;
/* ============================ */

Product.ulEl = document.getElementById('product-images');
Product.previousProductsShown = [];
Product.currentProductsShown = [];

Product.getRandomNum = function() {
  return Math.floor(Math.random() * productNameArray.length);
};

var productNameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// IIFE that creates a new object for each product using the constructor function
(function() {
  productNameArray.forEach(function(product) {
    return new Product(product);
  });
})();

// Generates unique random numbers that are different than the previous unique random numbers
var currentRandomNums = function() {
  var randomNum;
  Product.previousProductsShown = Product.currentProductsShown;
  Product.currentProductsShown = [];

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

currentRandomNums();

// Renders products to the screen
var renderProducts = function() {

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
  }
};

renderProducts();


