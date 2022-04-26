class Recipe {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.appliance = data.appliance;
    this.servings = data.servings;
    this.ustensils = data.ustensils;
    this.time = data.time;
  }
  getRecipe() {
    //const recipes = document.querySelector(".recipes");
    const recipeContent = document.createElement("div");
    recipeContent.className = "recipe_content";

    const imgRecipe = document.createElement("div");
    imgRecipe.className = "img";
    recipeContent.appendChild(imgRecipe);

    const infos_recipe = document.createElement("div");
    infos_recipe.className = "info_recipe";

    const title_time = document.createElement("div");
    title_time.className = "title_time";

    const title_recipe = document.createElement("p");
    title_recipe.className = "title_name";
    title_recipe.textContent = this.name;
    title_time.appendChild(title_recipe);

    const time_recipe = document.createElement("span");
    const clock_time = document.createElement("i");
    clock_time.className = "far fa-clock clock_time";
    title_time.appendChild(clock_time);
    time_recipe.className = "time";
    time_recipe.textContent = this.time + " min";
    title_time.appendChild(time_recipe);

    infos_recipe.appendChild(title_time);

    const detail_recipe = document.createElement("div");
    detail_recipe.className = "detail_recipe";

    const ingredient_recipe = document.createElement("div");
    ingredient_recipe.className = "all_ingredients";
    ingredient_recipe.textContent = this.ingredients;

    const desc_recipe = document.createElement("div");
    desc_recipe.className = "the_description";
    desc_recipe.textContent = this.description;

    detail_recipe.appendChild(ingredient_recipe);
    detail_recipe.appendChild(desc_recipe);

    infos_recipe.appendChild(detail_recipe);

    recipeContent.appendChild(infos_recipe);
    return recipeContent;
  }
}
