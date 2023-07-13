import { getFilters, getRecipes, calculateItemsNeeded } from "./functions.js"

// generate the dom structure for a note
const generateRecipeDom = (recipe) => {
    const recipeEl = document.createElement("a")
    const textEl = document.createElement("p")
    const statusEl = document.createElement("p")

    // setup the link
    recipeEl.href = `edit.html#${recipe.id}`
    recipeEl.classList.add("list-item")

    // setup note title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = "Unnamed recipe"
    }
    textEl.classList.add("list-item__title")
    recipeEl.appendChild(textEl)

    // setup ingredients needed text
    statusEl.textContent = calculateItemsNeeded(recipe.ingredients)
    statusEl.classList.add("list-item__subtitle")
    recipeEl.appendChild(statusEl)
    return recipeEl
}

// render app notes
const renderRecipes = () => {
    const recipesEl = document.querySelector("#render-recipes")
    const filter = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filter.toLowerCase())
    )

    recipesEl.innerHTML = ""

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const newEl = generateRecipeDom(recipe)
            recipesEl.appendChild(newEl)
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.textContent = "You have no recipes"
        emptyMessage.classList.add("empty-message")
        recipesEl.appendChild(emptyMessage)
    }
}

export { renderRecipes }