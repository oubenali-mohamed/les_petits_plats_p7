class Recipe {
  constructor(data) {
    this.name = data.name
    this.image = data.image
    this.id = data.id
    this.description = data.description
    this.ingredients = data.ingredients
    this.appliance = data.appliance
    this.servings = data.servings
    this.ustensils = data.ustensils
    this.time = data.time
  }
  getRecipe() {
    const recipeContent = document.createElement('div')
    recipeContent.className = 'recipe_content'

    const imgRecipe = document.createElement('div')
    imgRecipe.className = 'bg_img'
    imgRecipe.style.backgroundImage = `url(images/${this.image})`
    recipeContent.appendChild(imgRecipe)

    const infos_recipe = document.createElement('div')
    infos_recipe.className = 'info_recipe'

    const title_time = document.createElement('div')
    title_time.className = 'title_time'

    const title_recipe = document.createElement('p')
    title_recipe.className = 'title_name'
    title_recipe.textContent = this.name
    title_time.appendChild(title_recipe)

    const time_recipe = document.createElement('span')
    time_recipe.className = 'time'
    time_recipe.textContent = this.time + ' min'
    title_time.appendChild(time_recipe)

    infos_recipe.appendChild(title_time)

    const detail_recipe = document.createElement('div')
    detail_recipe.className = 'detail_recipe'

    const ingredient_recipe = document.createElement('div')
    ingredient_recipe.className = 'all_ingredients'
    for (let i = 0; i < this.ingredients.length; i++) {
      const ul_ingredient = document.createElement('ul')
      const li_ingredient = document.createElement('li')
      li_ingredient.className = 'liIngredient'
      const quantity_ing = this.ingredients[i].quantity
      const ingredient_ing = this.ingredients[i].ingredient
      const unit_ing = this.ingredients[i].unit

      li_ingredient.innerHTML =
        ingredient_ing + ': ' + quantity_ing + ' ' + unit_ing
      ul_ingredient.appendChild(li_ingredient)
      ingredient_recipe.appendChild(ul_ingredient)
    }

    const desc_recipe = document.createElement('div')
    desc_recipe.className = 'the_description'
    desc_recipe.textContent = this.description
    const enSavoirPlus = document.createElement('button')
    enSavoirPlus.textContent = 'Plus...'
    enSavoirPlus.className = 'enSavoirPlus'
    enSavoirPlus.addEventListener('click', function (e) {
      e.preventDefault()
      desc_recipe.style.whiteSpace = 'normal'
    })
    detail_recipe.appendChild(ingredient_recipe)
    detail_recipe.appendChild(desc_recipe)
    detail_recipe.appendChild(enSavoirPlus)

    infos_recipe.appendChild(detail_recipe)

    recipeContent.appendChild(infos_recipe)
    return recipeContent
  }
}
