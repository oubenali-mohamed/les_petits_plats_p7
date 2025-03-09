let url = 'data/recipes.json'
const chevronIng = document.querySelector('.chevronIng')
const all_Ing = document.querySelector('.allIng')
const chevronApp = document.querySelector('.chevronApp')
const all_App = document.querySelector('.allApp')
const chevronUst = document.querySelector('.chevronUst')
const all_Ust = document.querySelector('.allUst')
const searchBar = document.querySelector('#search')
const all_recipes = document.querySelector('.all_recipes')
const msgRecipe = document.querySelector('.msgRecipe')
const selectedTagsContainer = document.querySelector('.selected_tags')
const noFound = document.querySelector('.noFound')

let arrayIngredient = []
let arrayAppliance = []
let arrayUstensil = []
let allRecipes = []
const filters = {
  ingredients: new Set(),
  ustensiles: new Set(),
  appareils: new Set(),
}

async function displayRecipe() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes

      allRecipes.forEach((recipe) => {
        const recipeModel = new Recipe(recipe)
        const recipCardDOM = recipeModel.getRecipe()
        all_recipes.appendChild(recipCardDOM)

        recipe.ingredients.forEach((ing) =>
          arrayIngredient.push(ing.ingredient)
        )
        arrayAppliance.push(recipe.appliance)
        recipe.ustensils.forEach((ust) => arrayUstensil.push(ust))
      })

      // Supprimer les doublons
      arrayIngredient = [...new Set(arrayIngredient)]
      arrayAppliance = [...new Set(arrayAppliance)]
      arrayUstensil = [...new Set(arrayUstensil)]

      // Afficher les filtres (Ingrédients, Appareils, Ustensiles)
      populateFilters(arrayIngredient, all_Ing, 'ingredients')
      populateFilters(arrayAppliance, all_App, 'appareils')
      populateFilters(arrayUstensil, all_Ust, 'ustensiles')

      // Activer la recherche
      searchBar.addEventListener('input', () => {
        if (searchBar.value.length >= 3) {
          filterRecipes()
        }
      })
    })
}

// Ajout des éléments de filtre (Ingrédients, Appareils, Ustensiles)
function populateFilters(array, container, type) {
  container.innerHTML = ''
  const list = document.createElement('ul')
  array.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.textContent = item
    listItem.className = `list_tag${type}`
    listItem.addEventListener('click', () => addTag(item, type))
    list.appendChild(listItem)
  })
  container.appendChild(list)
}

// Ajouter un tag sélectionné
function addTag(tag, type) {
  if (!filters[type].has(tag)) {
    filters[type].add(tag)

    const tagElement = document.createElement('span')
    tagElement.classList.add('tag')
    tagElement.innerHTML = `${tag} <i class="fas fa-times remove-tag"></i>`
    tagElement.querySelector('.remove-tag').addEventListener('click', () => {
      filters[type].delete(tag)
      tagElement.remove()
      filterRecipes()
    })

    selectedTagsContainer.appendChild(tagElement)
    filterRecipes()
  }
}

// Filtrer les recettes selon la recherche et les tags
function filterRecipes() {
  const searchText = searchBar.value.toLowerCase()
  let filteredRecipes = allRecipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchText)
      )
    )
  })

  // Appliquer les filtres avancés
  filters.ingredients.forEach((tag) => {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.ingredients.some((ing) => ing.ingredient === tag)
    )
  })
  filters.ustensiles.forEach((tag) => {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.ustensils.includes(tag)
    )
  })
  filters.appareils.forEach((tag) => {
    filteredRecipes = filteredRecipes.filter(
      (recipe) => recipe.appliance === tag
    )
  })

  displayRecipes(filteredRecipes)
}

// Afficher les recettes après filtrage
function displayRecipes(recipes) {
  all_recipes.innerHTML = ''
  if (recipes.length === 0) {
    msgRecipe.innerHTML = 'Aucune recette ne correspond à votre critère…'
    noFound.classList.add('show-close')
  } else {
    msgRecipe.innerHTML = ''
    noFound.classList.remove('show-close');
  }

  recipes.forEach((recipe) => {
    const recipeModel = new Recipe(recipe)
    const recipCardDOM = recipeModel.getRecipe()
    all_recipes.appendChild(recipCardDOM)
  })
}

// Ouvrir les menus de filtre
chevronIng.addEventListener('click', () => toggleFilter(all_Ing, chevronIng))
chevronApp.addEventListener('click', () => toggleFilter(all_App, chevronApp))
chevronUst.addEventListener('click', () => toggleFilter(all_Ust, chevronUst))

function toggleFilter(container, chevron) {
  if (container.style.display === 'block') {
    container.style.display = 'none'
    chevron.style.transform = 'rotate(0deg)'
  } else {
    container.style.display = 'block'
    chevron.style.transform = 'rotate(180deg)'
  }
}
const closeIcon = document.querySelector('.noFound .close')
if (closeIcon) {
  closeIcon.addEventListener('click', () => {
    noFound.style.display = 'none' // Masquer le message
  })
}
// Lancer l'affichage des recettes au chargement
async function init() {
  displayRecipe()
}

init()
