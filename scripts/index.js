let url = "data/recipes.json";

async function displayRecipe() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // récupération des données du fichier json
      // console.log(data.recipes);
      const all_recipes = document.querySelector(".all_recipes");
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
        list_li_appliance.innerHTML = all_appliance;
        listAppliance.appendChild(list_li_appliance);
        const allApp = document.querySelector(".allApp");
        allApp.append(listAppliance);

        // récupération des données des ustensiles
        const all_ustensils = recipe.ustensils;
        const listUstensil = document.createElement("ul");
        const list_li_ustensil = document.createElement("li");
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
const searchBar = document.querySelector("#search");
searchBar.addEventListener("keyup", function (e) {
  const searchLettre = e.target.value;
  const recipeContent = document.querySelectorAll(".recipe_content");
  filterRecipe(searchLettre, recipeContent);
});

function filterRecipe(lettre, element) {
  if (lettre.length < 3) {
    const msgRecipe = document.querySelector(".msgRecipe");
    console.log(msgRecipe);
    msgRecipe.innerHTML = "Aucune recette ne correspond à votre critère…";
  } else if (lettre.length > 2) {
    const msgRecipe = document.querySelector(".msgRecipe");
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
async function init() {
  displayRecipe();
}

init();
