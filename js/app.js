'use strict';

// Declare array to store objects created via constructor function
// Vinicio - Remove array from name
var productObjectsArray = [];

// Constructor function
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClicked = 0;
  this.timesShown = 0;
  // Vinicio - (smell) - this code is trying to do too much
  //           creating a product AND maintaining a list of products
  productObjectsArray.push(this);
}

// Vinicio - you can have an empty constructor
// function UiController(){
// }

// Product.objects = [];

// Determines how many products to display
/* ============================ */
Product.numOfProductsToDisplay = 3;
/* ============================ */

// vinicio - I'm not sure if these variables need to be on the Product object
//         - you could do something like
// var uiControl = {
//   totalUserClicks: 0,
// };
Product.ulEl = document.getElementById('product-images');
Product.previousProductsShown = [];
Product.currentProductsShown = [];
Product.productsVoteCounts = [];
Product.totalUserClicks = 0;
Product.productNameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates a random number
// Vinicio - functions CAN be on the global scope
Product.getRandomNum = function() {
  return Math.floor(Math.random() * Product.productNameArray.length);
};

// Generates unique random numbers that are different than the previous unique random numbers
// Vinicio - this function, though, can be on the product since it's specific to the product 
//         - in can also be on your uiControl object/constructor
Product.currentRandomNums = function() {
  var randomNum; // vinicio - some people will complain about num
  Product.previousProductsShown = Product.currentProductsShown;
  Product.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (Product.currentProductsShown.length < Product.numOfProductsToDisplay) {
    randomNum = Product.getRandomNum();
    // Vinicio - people will frown upon lines greater than 100 characters
    if (Product.currentProductsShown.indexOf(randomNum) === -1 && 
    Product.previousProductsShown.indexOf(randomNum) === -1) {
      Product.currentProductsShown.push(randomNum);
    }
  }
  console.log('Previous', Product.previousProductsShown);
  console.log('Current', Product.currentProductsShown);
  console.log('***********************************************');
};

// Renders products to the screen
// Vinicio - I would create the uiController constructor and put all these functions here
Product.renderProducts = function() {
  Product.currentRandomNums();
  Product.ulEl.innerHTML = '';

  // Vinicio - I like the placement of the var inside the for loop
  //         - you could extract the string literals to their own separate variables
  // var FIGURE = 'figure';
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

  // Vinicio - magic number
  objectToUpdate[0].timesClicked++;
  Product.totalUserClicks++;

  // Checks to see if the user has more clicks and terminates the program if not
  // Vinicio - (magic number)
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
  gatherProductsVoteCounts();
  drawGraphOfProductsVoteCounts();
};

// Adds products vote counts to the Product.productsVoteCounts arrays
var gatherProductsVoteCounts = function() {
  productObjectsArray.forEach(function(product) {
    Product.productsVoteCounts.push(product.timesClicked);
  });
};

// IIFE that creates a new object for each product using the constructor function
(function() {
  Product.productNameArray.forEach(function(product) {
    return new Product(product);
    // Vinicio - this would fix the smell in line 13-14
    // productObjectArray.push();
  });
})();

// Binds clickedOn to ulEl
// Vinicio - this could be moved into the iife OR the contents of the iife could be moved here
Product.ulEl.addEventListener('click', Product.clickedOn);
Product.renderProducts();

// Graph information
// Vinicio - great code
var red = 'rgba(255, 99, 132, 0.2)';
var blue = 'rgba(54, 162, 235, 0.2)';
var yellow = 'rgba(255, 206, 86, 0.2)';
var green = 'rgba(75, 192, 192, 0.2)';
var purple = 'rgba(153, 102, 255, 0.2)';

var redBorder = 'rgba(255, 99, 132, 1)';
var blueBorder = 'rgba(54, 162, 235, 1)';
var yellowBorder = 'rgba(255, 206, 86, 1)';
var greenBorder = 'rgba(75, 192, 192, 1)';
var purpleBorder = 'rgba(153, 102, 255, 1)';

var drawGraphOfProductsVoteCounts = function() {
  // Vinicio - here you could extract all the string literals
  var graphOfProductVoteCounts = document.getElementById('graph-content');
  var ctx = graphOfProductVoteCounts.getContext('2d');
  // Vinicio - I don't like the name ctx, I prefer context
  var productVoteCountsGraph = new Chart(ctx, {
    type: 'bar',
    maintainAspectRatio: true,
    data: {
      labels: Product.productNameArray,
      datasets: [{
        label: 'Number of Votes',
        data: Product.productsVoteCounts,
        backgroundColor: [
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
          red,
          blue,
          yellow,
          green,
          purple,
        ],
        borderColor: [
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
          redBorder,
          blueBorder,
          yellowBorder,
          greenBorder,
          purpleBorder,
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true
          }
        }]
      }
    }
  });
};