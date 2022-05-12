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

async function displayRecipe() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // récupération des données du fichier json
      // console.log(data.recipes);
      const recipes = data.recipes;
      // console.log(recipes);
      return recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        const recipCardDOM = recipeModel.getRecipe();
        all_recipes.appendChild(recipCardDOM);

        // boucle pour parcourir le tableau des ingrédients
        const all_ingredients = recipe.ingredients;
        const listIngredient = document.createElement("ul");
        const list_li_ingredient = document.createElement("li");
        list_li_ingredient.className = "list_ingredient";
        listIngredient.appendChild(list_li_ingredient);
        for (let i = 0; i < all_ingredients.length; i++) {
          // console.log(all_ingredients);
          list_li_ingredient.innerHTML = all_ingredients[i].ingredient;
          const allIng = document.querySelector(".allIng");
          allIng.append(listIngredient);
        }

        // récupération des données pour les appareils
        const all_appliance = recipe.appliance;
        const listAppliance = document.createElement("ul");
        const list_li_appliance = document.createElement("li");
        list_li_appliance.className = "list_appliance";
        list_li_appliance.innerHTML = all_appliance;
        listAppliance.appendChild(list_li_appliance);
        const allApp = document.querySelector(".allApp");
        allApp.append(listAppliance);

        // récupération des données des ustensiles
        const all_ustensils = recipe.ustensils;
        const listUstensil = document.createElement("ul");
        const list_li_ustensil = document.createElement("li");
        list_li_ustensil.className = "list_ustensil";
        listUstensil.appendChild(list_li_ustensil);
        for (let i = 0; i < all_ustensils.length; i++) {
          // console.log(all_ustensils[i]);
          const allUst = document.querySelector(".allUst");
          list_li_ustensil.innerHTML = all_ustensils[i];
          allUst.append(listUstensil);
        }
      });
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
      const listOfIngredient = document.querySelectorAll(".list_ingredient");
      for (let i = 0; i < listOfIngredient.length; i++) {
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
            msgRecipe.style.padding = "10px";
            msgRecipe.style.color = "white";
            msgRecipe.style.borderRadius = "30px";
          });
        } else {
          element[i].style.display = "none";
          listOfIngredient[i].style.display = "none";
        }
      }
      const listOfAppliance = document.querySelectorAll(".list_appliance");
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
            msgRecipe.style.padding = "10px";
            msgRecipe.style.color = "white";
            msgRecipe.style.borderRadius = "30px";
          });
        } else {
          element[i].style.display = "none";
          listOfAppliance[i].style.display = "none";
        }
      }
      const listOfUstensil = document.querySelectorAll(".list_ustensil");
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
            msgRecipe.style.padding = "10px";
            msgRecipe.style.color = "white";
            msgRecipe.style.borderRadius = "30px";
          });
        } else {
          element[i].style.display = "none";
          listOfUstensil[i].style.display = "none";
        }
      }
    }
  }
}
async function init() {
  displayRecipe();
}

init();
