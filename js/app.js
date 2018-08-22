'use strict';

// Declare array to store objects created via constructor function
var allProducts = [];

// Constructor function that create an object for each product
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
}

// Constructor function that will contain all data the user will interact with
function UiController(){}

// Determines how many products to display
/* ============================ */
UiController.NUMBER_OF_PRODUCTS_TO_DISPLAY = 3;
/* ============================ */

UiController.ulEl = document.getElementById('product-images');
UiController.previousProductsShown = [];
UiController.currentProductsShown = [];
UiController.productsVoteCounts = [];
UiController.TOTAL_USER_CLICKS = 0;
UiController.NUMBER_OF_TIMES_VOTES = 25;
UiController.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Generates a random number
var getRandomNumber = function() {
  return Math.floor(Math.random() * UiController.productNames.length);
};

// Generates unique random numbers that are different than the previous unique random numbers
UiController.getUniqueRandomNumbers = function() {
  var randomNumer;
  UiController.previousProductsShown = UiController.currentProductsShown;
  UiController.currentProductsShown = [];

  // Makes sure the new randomly generated number is not a duplicate
  while (UiController.currentProductsShown.length < UiController.NUMBER_OF_PRODUCTS_TO_DISPLAY) {
    randomNumer = getRandomNumber();
    if (UiController.currentProductsShown.indexOf(randomNumer) === -1 &&
    UiController.previousProductsShown.indexOf(randomNumer) === -1) {
      UiController.currentProductsShown.push(randomNumer);
    }
  }
};

// Renders products to the screen
// Vinicio - I would create the uiController constructor and put all these functions here
UiController.renderProducts = function() {
  UiController.getUniqueRandomNumbers();
  UiController.ulEl.innerHTML = '';

  var LI = 'li';
  var FIGURE = 'figure';
  var IMG = 'img';
  var FIGCAPTION = 'figcaption';

  for (var i = 0; i < UiController.NUMBER_OF_PRODUCTS_TO_DISPLAY; i++) {
    var ilEl = document.createElement(LI);
    var figureEl = document.createElement(FIGURE);
    var imgEl = document.createElement(IMG);
    imgEl.src = allProducts[UiController.currentProductsShown[i]].path;
    imgEl.alt = allProducts[UiController.currentProductsShown[i]].name;
    var figCaptionEl = document.createElement(FIGCAPTION);
    figCaptionEl.textContent = allProducts[UiController.currentProductsShown[i]].name;

    UiController.ulEl.appendChild(ilEl);
    ilEl.appendChild(figureEl);
    figureEl.appendChild(imgEl);
    figureEl.appendChild(figCaptionEl);

    allProducts[UiController.currentProductsShown[i]].timesDisplayed++;
  }
};

// Retrieves the object that was clicked on then increments its timesClicked value and totalUserClicks
UiController.clickedOn = function(event) {
  var elementClickedOn = event.target.textContent;

  if (!elementClickedOn) {
    elementClickedOn = event.target.alt;
  }

  // Returns an array with one value, the object that was clicked on
  var objectToUpdate = allProducts.filter(function(object) {
    return object.name === elementClickedOn;
  });

  objectToUpdate[0].timesClicked++;
  UiController.TOTAL_USER_CLICKS++;

  // Checks to see if the user has more clicks and terminates the program if not
  if (UiController.TOTAL_USER_CLICKS === UiController.NUMBER_OF_TIMES_VOTES) {
    UiController.ulEl.removeEventListener('click', UiController.clickedOn);
    UiController.ulEl.innerHTML = '';
    UiController.gatherProductsVoteCounts();
    drawGraphOfProductsVoteCounts();
  } else {
    UiController.renderProducts();
  }
};

// Adds products vote counts to the UiController.productsVoteCounts arrays
UiController.gatherProductsVoteCounts = function() {
  allProducts.forEach(function(product) {
    UiController.productsVoteCounts.push(product.timesClicked);
  });
};

// IIFE that creates a new object for each product using the constructor function
(function() {
  UiController.productNames.forEach(function(product) {
    allProducts.push(new Product(product));
  });

  // Binds clickedOn to ulEl
  UiController.ulEl.addEventListener('click', UiController.clickedOn);

  UiController.renderProducts();
})();

// Graph information
var drawGraphOfProductsVoteCounts = function() {
  var GRAPH_CONTENT = 'graph-content';
  var TWO_D = '2d';
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

  var graphOfProductVoteCounts = document.getElementById(GRAPH_CONTENT);
  var context = graphOfProductVoteCounts.getContext(TWO_D);

  new Chart(context, { // eslint-disable-line
    type: 'bar',
    maintainAspectRatio: true,
    data: {
      labels: UiController.productNames,
      datasets: [{
        label: 'Number of Votes',
        data: UiController.productsVoteCounts,
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