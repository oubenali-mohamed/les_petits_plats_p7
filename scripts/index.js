let url = "data/recipes.json";

async function displayRecipe() {
  // Penser à remplacer par les données récupérées dans le json
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.recipes);
      const all_recipes = document.querySelector(".all_recipes");
      const recipes = data.recipes;
      return recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        const recipCardDOM = recipeModel.getRecipe();
        all_recipes.appendChild(recipCardDOM);
        for (let i = 0; i < data.recipes.length; i++) {
          const data_recipes = data.recipes[i];
          // console.log(data_recipes);
          const all_ingredients = data_recipes.ingredients;
          for (leti = 0; i < all_ingredients.length; i++) {
            // console.log(all_ingredients);
            const allIng = document.querySelector(".allIng");
            // console.log(allIng);
            allIng.append(all_ingredients[i].ingredient);
          }
          const all_appliance = data_recipes.appliance;
          // console.log(all_appliance);
          const allApp = document.querySelector(".allApp");
          allApp.append(all_appliance);

          const all_ustensils = data_recipes.ustensils;
          for (let i = 0; i < all_ustensils.length; i++) {
            console.log(all_ustensils[i]);
            const allUst = document.querySelector(".allUst");
            allUst.append(all_ustensils[i]);
          }
        }
      });
    });
}

async function init() {
  // Récupère les datas des photographes
  displayRecipe();
}

init();
