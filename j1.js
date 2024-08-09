// Fetching from API

const appendData = document.getElementById('appendData');

let updatedDrinks = [];

let cocktailAPI = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(res=>{
        if (!res.ok){
            console.log('Problem')
            return;
        }
        console.log(res.status);
        console.log(res.ok);
        return res.json();
    })
    cocktailAPI.then(data=>{

        let value = '';

        // console.log(data);

        updatedDrinks = data.drinks.filter(drinks => drinks.strDrink.includes(value));

        let cocktail = '';
        updatedDrinks.forEach(drinks=>{
            cocktail += `
                <div class="cards">
                    <img src="${drinks.strDrinkThumb}" alt="${drinks.strDrink}">
                    <div class="cap">${drinks.strDrink}</div>
                </div>
            `;
        });
        appendData.innerHTML = cocktail;
    });


// Displays searched cards after clicking Search button

function display(){
    let value = document.getElementById("searchInput").value;
    search(value);
}

function search(value){
    cocktailAPI.then(data=>{

        updatedDrinks = data.drinks.filter(drinks => drinks.strDrink.toLowerCase().includes(value));

        // same as above
        let cocktail = '';
        updatedDrinks.forEach(drinks=>{
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

const container = document.querySelector('.container');
const modalWrapper = document.querySelector('.modal__wrapper');
const closeBtn = document.querySelector('.modal__wrapper');
const addData = document.getElementById('addData');

container.addEventListener('click',function(e){
    if(( e.target.tagName == 'IMG') || (e.target.classList.contains('cap')) || (e.target.classList.contains('cards'))){
        const cardIndex = Array.from(this.children).indexOf(e.target.closest('.cards'));
        modalWrapper.classList.add('active');
        previewFunction(cardIndex, updatedDrinks);
    }
});

closeBtn.addEventListener('click',function(e){
    if((e.target.classList.contains('close'))){
        modalWrapper.classList.remove('active');
    }
});

function previewFunction(cardIndex, updatedDrinks){
    const drinks = updatedDrinks[cardIndex];
    const preview = `
        <div class="modal__container">
            <div class="modal_header">
                <button class="close">&times;</button>
                <div class="modalTitle">Drink : ${drinks.strDrink}</div>
            </div>

            <div class="modal_body">
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