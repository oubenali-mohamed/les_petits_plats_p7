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
          msgRecipe.innerHTML = "";
          for (let i = 0; i < element.length; i++) {
            if (element[i].name.toLowerCase().includes(lettre)) {
              const recipeContent =
                document.querySelectorAll(".recipe_content");
              recipeContent[i].style.display = "block";

              const ingredients_recipe = element[i].ingredients;
              for (let i = 0; i < ingredients_recipe.length; i++) {
                const addTagIng = document.querySelector(".list_tagIng");
                addTagIng.innerHTML = ingredients_recipe[i].ingredient;
                listIngredient.append(addTagIng);
              }

              const appliance_recipe = element[i].appliance;
              const addTagApp = document.querySelector(".list_tagApp");
              addTagApp.innerHTML = appliance_recipe;
              listAppliance.appendChild(addTagApp);

              const ustensiles_recipe = element[i].ustensils;
              for (let i = 0; i < ustensiles_recipe.length; i++) {
                const addTagUst = document.querySelector(".list_tagUst");
                addTagUst.innerHTML = ustensiles_recipe[i];
                listUstensil.appendChild(addTagUst);
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
          filtreTag(searchLettre, list_tag);
          filterRecipe(searchLettre, recipes);
        });
      }
      //function pour filtrer des tags
      function filtreTag(letter, tag) {
        for (let i = 0; i < tag.length; i++) {
          if (tag[i].textContent.toLowerCase().includes(letter)) {
            tag[i].style.display = "block";
            tag[i].addEventListener("click", function (e) {
              e.preventDefault();
              msgRecipe.className = "addTag";
              msgRecipe.innerHTML = tag[i].innerHTML;
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
