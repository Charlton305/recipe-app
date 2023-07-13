import { toggleIngredient, saveRecipes, removeIngredient } from "./functions.js"

// display ingredients
const displayIngredients = function (recipe) {
    const ingredients = recipe.ingredients
    const ingredientsElement = document.querySelector('#ingredients')

    ingredientsElement.innerHTML = ''

    // generate DOM elements
    ingredients.forEach(ingredient => {
        const ingredientEl = document.createElement('label')
        const containerEl = document.createElement("div")

        // Setup checkbox
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.classList.add("cb1")
        checkbox.checked = ingredient.hasIngredient
        checkbox.addEventListener("change", function (e) {
            toggleIngredient(ingredient, recipe)
            saveRecipes()
        })
        containerEl.appendChild(checkbox)

        // Setup the text element
        const ingredientText = document.createElement('span')
        ingredientText.textContent = ingredient.ingredient
        containerEl.appendChild(ingredientText)

        // setup container
        ingredientEl.classList.add("list-item-ingredient")
        containerEl.classList.add("list-item__container")
        ingredientEl.appendChild(containerEl)

        // Setup the remove button
        const removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.classList.add("button", "button--text")
        removeButton.addEventListener('click', function () {
            removeIngredient(ingredient.ingredient, recipe)
        })
        ingredientEl.appendChild(removeButton)

        ingredientsElement.appendChild(ingredientEl)
    })
}

export { displayIngredients }