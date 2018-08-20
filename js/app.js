'use strict';

var productObjectsArray = [];

// Constructor function
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClick = 0;
  this.timesShown = 0;
  productObjectsArray.push(this);
}

var productNameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


// IIFE that creates a new object for each product using the constructor function
(function() {
  productNameArray.forEach(function(product) {
    return new Product(product);
  });
})();

console.log(productObjectsArray);