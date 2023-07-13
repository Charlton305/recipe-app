import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { displayIngredients } from './ingredients.js';

let recipes = []
let filter = ""

// read existing notes from local storage
export const loadRecipes = () => {
    const recipesJSON = localStorage.getItem("recipes")
    recipes = recipesJSON ? JSON.parse(recipesJSON) : []
}

// save recipes
const saveRecipes = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
}

// expose recipes
const getRecipes = () => {
    // loadRecipes()
    return recipes
}

// create recipe
export const createRecipe = () => {
    const id = uuidv4()
    recipes.push({
        title: "",
        body: "",
        id,
        ingredients: []
    })

    saveRecipes()
    return id
}

// remove recipe function
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

// Remove ingredient by id
const removeIngredient = function (name, recipe) {
    const ingredients = recipe.ingredients
    const recipeIndex = recipes.findIndex(item => {
        return item.id === recipe.id
    })
    const ingredientIndex = ingredients.findIndex(function (item) {
        return item.ingredient === name
    })
    if (ingredientIndex > -1) {
        recipes[recipeIndex].ingredients.splice(ingredientIndex, 1)
    }
    saveRecipes()
    displayIngredients(recipe)
}

//toggle ingredient
const toggleIngredient = function (ingredient, recipe) {
    const ingredients = recipe.ingredients
    const recipeIndex = recipes.findIndex(item => {
        return item.id === recipe.id
    })
    const ingredientIndex = ingredients.findIndex(item => {
        return item.ingredient === ingredient.ingredient
    })
    if (ingredient === undefined) {
        return
    } else {
        recipes[recipeIndex].ingredients[ingredientIndex].hasIngredient = !recipes[recipeIndex].ingredients[ingredientIndex].hasIngredient
    }
}

//  update recipe
const updateRecipe = (id, updates) => {
    const title = updates.title
    const body = updates.body
    const ingredient = updates.ingredient
    const hasIngredient = updates.hasIngredient
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof title === "string") {
        recipe.title = title
        // .updatedAt = moment().valueOf()
    }

    if (typeof body === "string") {
        recipe.body = body
        // note.updatedAt = moment().valueOf()
    }
    if (typeof ingredient === 'string' && typeof hasIngredient === "boolean") {
        recipe.ingredients.push(updates)
    }

    saveRecipes()
    displayIngredients(recipe)
}

const calculateItemsNeeded = (ingredients) => {
    const haveIngredients = ingredients.filter(item => item.hasIngredient === true)
    const needed = ingredients.length - haveIngredients.length
    const ingredientsLength = ingredients.length
    if (needed < 1 && ingredients.length > 1) {
        return "You have all of the ingredients"
    } else if (needed > 0 && needed < ingredientsLength) {
        return `You have ${haveIngredients.length} out of ${ingredientsLength} ingredients.`
    } else {
        return "You have none of the ingredients."
    }
}

// set and get filters
const setFilters = (update) => {
    filter = update
}

const getFilters = () => filter

// on page load
loadRecipes()

export { setFilters, getFilters, saveRecipes, getRecipes, updateRecipe, removeRecipe, removeIngredient, toggleIngredient, calculateItemsNeeded }