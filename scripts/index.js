import { createRecipe, loadRecipes, setFilters } from "./functions.js";
import { renderRecipes } from "./views.js"

renderRecipes()

// listen for new note creation
document.querySelector("#create-recipe").addEventListener("click", (e) => {
    location.assign(`edit.html#${createRecipe()}`)
})

// listen for search 
document.querySelector("#search-text").addEventListener("input", (e) => {
    setFilters(e.target.value)
    renderRecipes()
})

// listen for storag change and update all open pages
window.addEventListener("storage", (e) => {
    if (e.key === "recipes") {
        loadRecipes()
        renderRecipes()
    }
})
