let url = "/data/recipes.json";

async function displayRecipe() {
  // Penser à remplacer par les données récupérées dans le json
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const all_recipes = document.querySelector(".all_recipes");
      const recipes = data.recipes;

      return recipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe);
        const recipCardDOM = recipeModel.getRecipe();
        all_recipes.appendChild(recipCardDOM);
        console.log(all_recipes);
      });
    });
}

async function init() {
  // Récupère les datas des photographes
  const { recipes } = displayRecipe();
  displayRecipe(recipes);
}

init();
