let url = "data/recipes.json";
const chevronIng = document.querySelector(".chevronIng");
const all_Ing = document.querySelector(".allIng");
const chevronApp = document.querySelector(".chevronApp");
const all_App = document.querySelector(".allApp");
const chevronUst = document.querySelector(".chevronUst");
const all_Ust = document.querySelector(".allUst");
const searchBar = document.querySelector("#search");
const all_recipes = document.querySelector(".all_recipes");
const msgRecipe = document.querySelector(".msgRecipe");
let arrayIngredient = [];
let arrayAppliance = [];
let arrayUstensil = [];

async function displayRecipe() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // récupération des données du fichier json
      const recipes = data.recipes;
      recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        const recipCardDOM = recipeModel.getRecipe();
        all_recipes.appendChild(recipCardDOM);

        const all_ingredients = recipe.ingredients;
        for (let i = 0; i < all_ingredients.length; i++) {
          //push des ingredient dans l'array ingredient
          arrayIngredient.push(all_ingredients[i].ingredient);
        }
        // push des appareils dans l'array appliance
        const all_appliance = recipe.appliance;
        arrayAppliance.push(all_appliance);

        const all_ustensils = recipe.ustensils;
        for (let i = 0; i < all_ustensils.length; i++) {
          // push des ustensils dans l'array ustensiles
          arrayUstensil.push(all_ustensils[i]);
        }
      });

      // filtre des ingredients
      const arrayFilterIngredient = arrayIngredient.filter(
        (el, pos) => arrayIngredient.indexOf(el) == pos
      );

      // filtre des appareils
      const arrayFiltreAppliance = arrayAppliance.filter(
        (el, pos) => arrayAppliance.indexOf(el) == pos
      );

      // filtre des ustensiles
      const arrayFiltreUstensil = arrayUstensil.filter(
        (el, pos) => arrayUstensil.indexOf(el) == pos
      );

      //ajout des ingredients au DOM
      const listIngredient = document.createElement("ul");
      for (let i = 0; i < arrayFilterIngredient.length; i++) {
        const list_li_ingredient = document.createElement("li");
        list_li_ingredient.innerHTML = arrayFilterIngredient[i];
        list_li_ingredient.className = "list_ingredient";
        listIngredient.appendChild(list_li_ingredient);
        all_Ing.appendChild(listIngredient);
      }

      //ajout des appareils au DOM
      const listAppliance = document.createElement("ul");
      for (let i = 0; i < arrayFiltreAppliance.length; i++) {
        const list_li_appliance = document.createElement("li");
        list_li_appliance.className = "list_appliance";
        list_li_appliance.innerHTML = arrayFiltreAppliance[i];
        listAppliance.appendChild(list_li_appliance);
        all_App.appendChild(listAppliance);
      }

      //ajout des ustensiles au DOM
      const listUstensil = document.createElement("ul");
      for (let i = 0; i < arrayFiltreUstensil.length; i++) {
        const list_li_ustensil = document.createElement("li");
        list_li_ustensil.className = "list_ustensil";
        list_li_ustensil.innerHTML = arrayFiltreUstensil[i];
        listUstensil.appendChild(list_li_ustensil);
        all_Ust.appendChild(listUstensil);
      }
    });
}

// ouverture des filtre lors du clique sur le bouton down
chevronIng.addEventListener("click", function (e) {
  e.preventDefault();
  chevronIng.style.transform = "rotate(180deg)";
  all_Ing.style.display = "block";
});

chevronApp.addEventListener("click", function (e) {
  e.preventDefault();
  chevronApp.style.transform = "rotate(180deg)";
  all_App.style.display = "block";
});

chevronUst.addEventListener("click", function (e) {
  e.preventDefault();
  chevronUst.style.transform = "rotate(180deg)";
  all_Ust.style.display = "block";
});

// fonction permettant de trier les recettes en fonction de l'entrée dans le champ de recherche

searchBar.addEventListener("keyup", function (e) {
  const searchLettre = e.target.value;
  const recipeContent = document.querySelectorAll(".recipe_content");
  filterRecipe(searchLettre, recipeContent);
});

function filterRecipe(lettre, element) {
  if (lettre.length < 3) {
    msgRecipe.innerHTML = "Aucune recette ne correspond à votre critère…";
  } else {
    msgRecipe.style.display = "none";
    for (let i = 0; i < element.length; i++) {
      if (element[i].textContent.toLowerCase().includes(lettre)) {
        element[i].style.display = "block";
      } else {
        element[i].style.display = "none";
      }
    }
  }
}

/* for (let i = 0; i < listOfIngredient.length; i++) {
        if (element[i].textContent.toLowerCase().includes(lettre)) {
          element[i].style.display = "block";
          listOfIngredient[i].style.display = "block";
          listOfIngredient[i].addEventListener("click", function () {
            msgRecipe.innerHTML = "";
            msgRecipe.appendChild(listOfIngredient[i]);
            all_Ing.style.display = "none";
            msgRecipe.style.display = "block";
            msgRecipe.style.backgroundColor = "#3381f7";
            msgRecipe.style.width = "120px";
          });
        } else {
          element[i].style.display = "none";
          listOfIngredient[i].style.display = "none";
        }
      } */
/*const listOfAppliance = document.querySelectorAll(".list_appliance");
     for (let i = 0; i < listOfAppliance.length; i++) {
        if (element[i].textContent.toLowerCase().includes(lettre)) {
          element[i].style.display = "block";
          listOfAppliance[i].style.display = "block";
          listOfAppliance[i].addEventListener("click", function () {
            msgRecipe.innerHTML = "";
            msgRecipe.appendChild(listOfAppliance[i]);
            all_App.style.display = "none";
            msgRecipe.style.display = "block";
            msgRecipe.style.backgroundColor = "#68d9a4";
            msgRecipe.style.width = "120px";
          });
        } else {
          element[i].style.display = "none";
          listOfAppliance[i].style.display = "none";
        }
      } */
/* const listOfUstensil = document.querySelectorAll(".list_ustensil");
    for (let i = 0; i < listOfUstensil.length; i++) {
      if (element[i].textContent.toLowerCase().includes(lettre)) {
        element[i].style.display = "block";
        listOfUstensil[i].style.display = "block";
        listOfUstensil[i].addEventListener("click", function () {
          msgRecipe.innerHTML = "";
          msgRecipe.appendChild(listOfUstensil[i]);
          all_Ust.style.display = "none";
          msgRecipe.style.display = "block";
          msgRecipe.style.backgroundColor = "#ed6454";
          msgRecipe.style.width = "120px";
        });
      } else {
        element[i].style.display = "none";
        listOfUstensil[i].style.display = "none";
      }
    } */

async function init() {
  displayRecipe();
}

init();
