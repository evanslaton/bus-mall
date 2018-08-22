'use strict';

// Declare array to store objects created via constructor function
var allProducts = [];

// Constructor function that create an object for each product
function Product(name) {
  this.name = name;
  this.path = `img/${name}.jpg`;
  this.timesClicked = 0;
  this.timesDisplayed = 0; // This property is not in use
}

// Constructor function that will contain all data the user will interact with
function UiController(){}

// Determines how many products to display
/* ============================ */
UiController.NUMBER_OF_PRODUCTS_TO_DISPLAY = 3;
/* ============================ */

UiController.ulEl = document.getElementById('product-images');
UiController.spanEl = document.getElementById('votes');
UiController.graphOfProductVoteCounts = document.getElementById('graph-content');
UiController.previousProductsShown = [];
UiController.currentProductsShown = [];
UiController.productsVoteCounts = [];
UiController.totalUserClicks = 0;
UiController.MAX_VOTES = 25;
UiController.productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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
  UiController.totalUserClicks++;

  UiController.updateTimesClickedToLocalStorage();
  UiController.checkIfFinishedVoting();
};

// Adds products vote counts to the UiController.productsVoteCounts array
UiController.gatherProductsVoteCounts = function() {
  UiController.productsVoteCounts = [];
  allProducts.forEach(function(product) {
    UiController.productsVoteCounts.push(product.timesClicked);
  });
};

// Changes styles of the canvas and main > p elements to be used when the user finishes voting
UiController.changeElementStyles = function() {
  var instructionPEl = document.getElementById('instructions-to-user');
  var resultsPEl = document.getElementById('results-graph-label');

  UiController.graphOfProductVoteCounts.style.display = 'block';
  instructionPEl.style.display = 'none';
  resultsPEl.style.display = 'block';
};

// Calculates product vote counts and sends to localStorage
UiController.updateTimesClickedToLocalStorage = function() {
  UiController.gatherProductsVoteCounts();
  localStorage.setItem('voteCounts', JSON.stringify(UiController.productsVoteCounts));
};

// If 'voteCounts' is in localStorage, updates the timesClicked values on each object
UiController.updateVoteCountsWithLocalStorage = function() {
  var storedProductVoteCounts =  JSON.parse(localStorage.getItem('voteCounts'));
  if (storedProductVoteCounts !== null) {
    for (var i = 0; i < allProducts.length; i++) {
      allProducts[i].timesClicked = storedProductVoteCounts[i];
    }
  }
};

// Displays the graph if the user is done voting
UiController.checkIfFinishedVoting = function() {
  if (UiController.totalUserClicks === UiController.MAX_VOTES) {
    UiController.ulEl.removeEventListener('click', UiController.clickedOn);
    UiController.ulEl.innerHTML = '';
    // UiController.gatherProductsVoteCounts();
    UiController.changeElementStyles();
    drawGraphOfProductsVoteCounts();
  } else {
    UiController.renderProducts();
  }
};

// Generates a random number
var getRandomNumber = function() {
  return Math.floor(Math.random() * UiController.productNames.length);
};

// Starts the app
(function() {
  // Creates a new object for each product using the constructor function
  UiController.productNames.forEach(function(product) {
    allProducts.push(new Product(product));
  });

  UiController.spanEl.textContent = UiController.MAX_VOTES;

  // Binds clickedOn to ulEl
  UiController.ulEl.addEventListener('click', UiController.clickedOn);

  UiController.renderProducts();
  UiController.updateVoteCountsWithLocalStorage();
})();

// Graph information
var drawGraphOfProductsVoteCounts = function() {
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

  var context = UiController.graphOfProductVoteCounts.getContext(TWO_D);

  new Chart(context, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: UiController.productNames,
      responsive: true,
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