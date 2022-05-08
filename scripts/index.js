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
        for (let i = 0; i < all_ingredients.length; i++) {
          // console.log(all_ingredients);
          const allIng = document.querySelector(".allIng");
          allIng.append(all_ingredients[i].ingredient + " ");
        }

        // récupération des données pour les appareils
        const all_appliance = recipe.appliance;
        const allApp = document.querySelector(".allApp");
        allApp.append(all_appliance + " ");

        // récupération des données des ustensiles
        const all_ustensils = recipe.ustensils;
        for (let i = 0; i < all_ustensils.length; i++) {
          // console.log(all_ustensils[i]);
          const allUst = document.querySelector(".allUst");
          allUst.append(all_ustensils[i] + " ");
        }
      });
    });
}

async function init() {
  displayRecipe();
}

init();
