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
const searchTag = document.querySelectorAll(".tag_filtre");
const noFound = document.querySelector(".noFound");
const spanMsg = document.createElement("span");
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
        const description = recipe.description;
        // console.log(description);
      });

      // filtre des ingredients pour supprimer les doublons
      const arrayFilterIngredient = arrayIngredient.filter(
        (el, pos) => arrayIngredient.indexOf(el) == pos
      );
      // filtre des appareils pour supprimer les doublons
      const arrayFiltreAppliance = arrayAppliance.filter(
        (el, pos) => arrayAppliance.indexOf(el) == pos
      );

      // filtre des ustensiles pour supprimer les doublons
      const arrayFiltreUstensil = arrayUstensil.filter(
        (el, pos) => arrayUstensil.indexOf(el) == pos
      );

      //ajout des ingredients au DOM
      const listIngredient = document.createElement("ul");
      for (let i = 0; i < arrayFilterIngredient.length; i++) {
        const list_li_ingredient = document.createElement("li");
        list_li_ingredient.innerHTML = arrayFilterIngredient[i];
        list_li_ingredient.className = "list_tagIng";
        listIngredient.appendChild(list_li_ingredient);
        all_Ing.appendChild(listIngredient);
      }

      //ajout des appareils au DOM
      const listAppliance = document.createElement("ul");
      for (let i = 0; i < arrayFiltreAppliance.length; i++) {
        const list_li_appliance = document.createElement("li");
        list_li_appliance.className = "list_tagApp";
        list_li_appliance.innerHTML = arrayFiltreAppliance[i];
        listAppliance.appendChild(list_li_appliance);
        all_App.appendChild(listAppliance);
      }

      //ajout des ustensiles au DOM
      const listUstensil = document.createElement("ul");
      for (let i = 0; i < arrayFiltreUstensil.length; i++) {
        const list_li_ustensil = document.createElement("li");
        list_li_ustensil.className = "list_tagUst";
        list_li_ustensil.innerHTML = arrayFiltreUstensil[i];
        listUstensil.appendChild(list_li_ustensil);
        all_Ust.appendChild(listUstensil);
      }

      // On écoute l'évenement Keyup sur la barre de recherhe principale pour appliquer les fonction de trie
      searchBar.addEventListener("keyup", function (e) {
        e.preventDefault();
        const searchLettre = e.target.value;
        const list_tag = document.querySelectorAll(".list_tag");
        filterRecipe(searchLettre, recipes);
        filtreTag(searchLettre, list_tag);
      });
    
      // function pour filtrer les recettes
      function filterRecipe(lettre, element) {
        if (lettre.length < 3) {
          msgRecipe.innerHTML = "Aucune recette ne correspond à votre critère…";
        } else {
          let ingredientOfElement =""
          msgRecipe.innerHTML = "";
          for (let i = 0; i < element.length; i++) {
            let ingredients_element = element[i].ingredients
             for(let i = 0; i < ingredients_element.length; i++){
               ingredientOfElement = ingredients_element[i].ingredient
             }
            if (element[i].name.toLowerCase().includes(lettre) || 
                element[i].description.toLowerCase().includes(lettre) || 
               ingredientOfElement.toLowerCase().includes(lettre) ) {
                  const recipeContent =
                    document.querySelectorAll(".recipe_content");
                  recipeContent[i].style.display = "block";
                  // console.log(recipeContent[i])

              //ingredient correspondant aux recettes restantes
              const ingredients_recipe = ingredients_element;
              for (let i = 0; i < ingredients_recipe.length; i++) {
               const new_ul_ingredient = document.createElement('ul')
               const new_li_ingredient = document.createElement('li')
               new_li_ingredient.innerHTML = ingredients_recipe[i].ingredient
               new_ul_ingredient.appendChild(new_li_ingredient)
              //  console.log(new_ul_ingredient)
                if (all_Ing.firstChild != null) {
                  all_Ing.removeChild(all_Ing.firstChild);
                }
                  all_Ing.appendChild(new_ul_ingredient)
               }

              //appareils correspondant aux recettes restantes
              const new_ul_appliance = document.createElement('ul')
              const new_li_appliance = document.createElement('li')
              new_li_appliance.innerHTML =  element[i].appliance;
              new_ul_appliance.appendChild(new_li_appliance)
              // console.log(new_ul_appliance)
               if(all_App.firstChild != null){
                all_App.removeChild(all_App.firstChild)
               }
                all_App.appendChild(new_ul_appliance)

              //ustensiles correspondant aux recettes restantes
              const ustensiles_recipe = element[i].ustensils;
              for (let i = 0; i < ustensiles_recipe.length; i++) {
                const new_ul_ustensiles = document.createElement('ul')
                const new_li_ustensiles = document.createElement('li')
                new_li_ustensiles.innerHTML = ustensiles_recipe[i]
                new_ul_ustensiles.appendChild(new_li_ustensiles)
                // console.log(new_ul_ustensiles)
                if(all_Ust.firstChild != null){
                  all_Ust.removeChild(all_Ust.firstChild)
                }
                all_Ust.appendChild(new_ul_ustensiles)
              }
            } else {
              const recipeContent =
                document.querySelectorAll(".recipe_content");
              recipeContent[i].style.display = "none";
            }
          }
        }
      }

      //  On écoute l'évenement Keyup sur les champs de saisie pour appliquer les fonction de trie
      for (let i = 0; i < searchTag.length; i++) {
        searchTag[i].addEventListener("keyup", function (e) {
          e.preventDefault();
          const searchLettre = e.target.value;
          const list_tag = document.querySelectorAll(".list_tag");
          filterRecipe(searchLettre, recipes);
          filtreTag(searchLettre, list_tag);
        });
      }
      //function pour filtrer des tags
      function filtreTag(letter, tag) {
        for (let i = 0; i < tag.length; i++) {
          if (tag[i].textContent.toLowerCase().includes(letter)) {
            tag[i].style.display = "block";
            tag[i].addEventListener("click", function (e) {
              e.preventDefault();
              spanMsg.innerHTML = tag[i].innerHTML;
              noFound.className = "addTag";
              const close = document.querySelector(".close");
              close.style.display = "block";
              noFound.appendChild(spanMsg);
              noFound.appendChild(close);
            });
          } else {
            tag[i].style.display = "none";
          }
        }
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

async function init() {
  displayRecipe();
}

init();
