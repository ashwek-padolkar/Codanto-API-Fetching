// Fetching from API

let filteredDrinks = [];

let cocktailAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')           // API URL
    .then(res=> {                                                                          // promise chain
        if (!res.ok){
            console.log('Problem')
            return;
        }
        console.log(res.status);                   // response status: 200
        console.log(res.ok);
        return res.json();                         // converts the response body(data) to JSON format
    })
    cocktailAPI.then(data =>{

        let value = '';                            // Initializes value from the search box to empty string

        // console.log(data);                      // data contains drinks array[25]

        // data.drinks: data inside the drinks array
        // filter(drinks => drinks.strDrink.includes(value)): filter updates the drinks array by checking each element that includes value(here value = '')
        filteredDrinks = data.drinks.filter(drinks => drinks.strDrink.includes(value));     // stores this in filteredDrinks

        let cocktail = '';                         // Initializes cocktail to empty string
        filteredDrinks.forEach(drinks =>{          // adds HTML data of all cards to cocktail string using filteredDrinks array using forEach loop
            cocktail += `
                <div class="cards">
                    <img src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
                    <div class="cap">${drinks.strDrink}</div>
                </div>
            `;
        });
        appendData.innerHTML = cocktail;           // puts the above HTML content inside the element having id="appendData" in index.html
    });


// Displays searched cards after clicking Search button

function display(){
    let value = document.getElementById("searchInput").value;                 // takes value of the element having id="searchInput"
    search(value);                                                            // pass the above value in search function
}

function search(value) {
    cocktailAPI.then(data => {
        filteredDrinks = data.drinks.filter(drinks => drinks.strDrink.toLowerCase().includes(value)); // same as above but (here value='searched by the user')

        // same as above
        let cocktail = '';
        filteredDrinks.forEach(drinks => {
            cocktail += `
                <div class="cards">
                    <img src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
                    <div class="cap">${drinks.strDrink}</div>
                </div>
            `;
        });
        appendData.innerHTML = cocktail;
    });
}


// Modal Popup

// selects elements inside the element having class="container"
// single element: querySelector
// many elemens: querySelectorAll
const container = document.querySelector('.container');
const modalWrapper = document.querySelector('.modal__wrapper');
const closeBtn = document.querySelector('.modal__wrapper');

// 
container.addEventListener('click', function (e) {
    if (( e.target.tagName === 'IMG') || (e.target.classList.contains('cap')) || (e.target.classList.contains('cards'))) {
        // Array.from(this.children): converts the children of container to an array
        // indexOf(e.target.closest('.cards'): finds the index of the closest ancestor element with the class cards
        const cardIndex = Array.from(this.children).indexOf(e.target.closest('.cards'));
        modalWrapper.classList.add('active');
        previewFunction(cardIndex, filteredDrinks); // Pass the filtered drinks array
    }
});

closeBtn.addEventListener('click', function(e) {
    if ((e.target.classList.contains('close'))) {
        modalWrapper.classList.remove('active');
    }
});

function previewFunction(cardIndex, filteredDrinks) {
    const drinks = filteredDrinks[cardIndex];
    const preview = `
        <div class="modal__container">
            <div class="header">
                <button class="close">&times;</button>
                <div class="modalTitle">Drink : ${drinks.strDrink}</div>
            </div>

            <div class="body">
                <div class="container1">
                    <div class="modal_image">
                        <img src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
                    </div>
                    <div class="details">
                        <h3>Category : ${drinks.strCategory}</h3>
                        <h3>Alcoholic : ${drinks.strAlcoholic}</h3>
                        <h3>Glass : ${drinks.strGlass}</h3>
                    </div>
                </div>

                <div class="container2">
                    <div class="title">
                        <div class="instructions">Instructions : </div>
                        <p>English - ${drinks.strInstructions}</p>
                        <p>Spanish - ${drinks.strInstructionsES}</p>
                        <p>German - ${drinks.strInstructionsDE}</p>
                        <p>Italian - ${drinks.strInstructionsIT}</p>
                    </div>
                    <div class="title">
                        <div class="ingredients">Ingredients:</div>
                        <ul>
                            <li>${drinks.strIngredient1}</li>
                            <li>${drinks.strIngredient2}</li>
                            <li>${drinks.strIngredient3}</li>
                            <li>${drinks.strIngredient4}</li>
                            <li>${drinks.strIngredient5}</li>
                            <li>${drinks.strIngredient6}</li>
                        </ul>
                    </div>
                    <div class="title">
                        <div class="measurements">Measurements:</div>
                        <ul>
                            <li>${drinks.strMeasure1}</li>
                            <li>${drinks.strMeasure2}</li>
                            <li>${drinks.strMeasure3}</li>
                            <li>${drinks.strMeasure4}</li>
                            <li>${drinks.strMeasure5}</li>
                            <li>${drinks.strMeasure6}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;

    addData.innerHTML = preview;
}