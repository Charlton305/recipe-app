import { getRecipes, updateRecipe, removeRecipe, loadRecipes } from "./functions.js"
import { displayIngredients } from "./ingredients.js"

const recipeId = location.hash.substring(1)
const recipeTitle = document.querySelector("#note-title")
const recipeBody = document.querySelector("#recipe-body")

// on page load
const initialiseEditPage = () => {
    loadRecipes()
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    if (!recipe) {
        location.assign("index.html")
    }
    recipeTitle.value = recipe.title
    recipeBody.value = recipe.body
    displayIngredients(recipe)
}

initialiseEditPage()

// EVENT LISTENERS

// title update
recipeTitle.addEventListener("input", (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

// body update
recipeBody.addEventListener("input", (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    })
})

// remove note button click
document.querySelector("#remove-ingredient").addEventListener("click", (e) => {
    removeRecipe(recipeId)
    location.assign("index.html")
})

// listen for storage change and update all open pages
window.addEventListener("storage", (e) => {
    if (e.key === "recipes") {
        initialiseEditPage()
    }
})

// add ingredients
document.querySelector('#new-ingredient').addEventListener('submit', function (e) {
    e.preventDefault()
    updateRecipe(recipeId, {
        ingredient: e.target.elements.text.value,
        hasIngredient: false
    })
    e.target.elements.text.value = ''
})
