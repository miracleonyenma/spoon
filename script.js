// ./scripts.js

// Initialize editing index to track edits
let editingIndex = -1;

// Load recipes from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedRecipes = loadRecipesFromLocalStorage();
  savedRecipes.forEach((recipe) =>
    addRecipe(recipe.name, recipe.ingredients, false)
  );
});

// Add event listener for the form submission
document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeName = document.getElementById("recipe-name").value.trim();
  const recipeIngredients = document
    .getElementById("recipe-ingredients")
    .value.trim();

  // Prevent adding empty recipes
  if (!recipeName || !recipeIngredients) {
    alert("Please provide both a recipe name and ingredients.");
    return;
  }

  if (editingIndex === -1) {
    // Add a new recipe if not editing
    addRecipe(recipeName, recipeIngredients, true);
  } else {
    // Update an existing recipe
    updateRecipe(recipeName, recipeIngredients);
    editingIndex = -1; // Reset editing index
  }

  // Clear input fields
  document.getElementById("recipe-name").value = "";
  document.getElementById("recipe-ingredients").value = "";
});

// Function to add a new recipe
function addRecipe(name, ingredients, saveToLocalStorage = true) {
  const recipeList = document.getElementById("recipe-list");

  const li = document.createElement("li");
  li.textContent = `${name}: ${ingredients}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Edit button functionality
  editButton.addEventListener("click", function () {
    document.getElementById("recipe-name").value = name; // Populate name input
    document.getElementById("recipe-ingredients").value = ingredients; // Populate ingredients input
    editingIndex = Array.from(recipeList.children).indexOf(li); // Get index of the recipe being edited
    li.remove(); // Remove the current list item for editing
    updateLocalStorageAfterEdit(name, ingredients);
  });

  // Delete button functionality
  deleteButton.addEventListener("click", function () {
    recipeList.removeChild(li); // Remove the list item from UI
    deleteRecipeFromLocalStorage(name, ingredients); // Remove from local storage
  });

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  recipeList.appendChild(li);

  if (saveToLocalStorage) {
    saveRecipeToLocalStorage(name, ingredients);
  }
}

// Function to update an existing recipe during editing
function updateRecipe(name, ingredients) {
  const recipes = loadRecipesFromLocalStorage();

  if (editingIndex >= 0 && editingIndex < recipes.length) {
    recipes[editingIndex] = { name, ingredients }; // Update the specific recipe in local storage
    saveRecipesToLocalStorage(recipes);

    addRecipe(name, ingredients, false); // Add updated recipe to UI without saving again to local storage
  }
}

// Save a single recipe to local storage
function saveRecipeToLocalStorage(name, ingredients) {
  const recipes = loadRecipesFromLocalStorage();
  recipes.push({ name, ingredients });
  saveRecipesToLocalStorage(recipes);
}

// Delete a single recipe from local storage
function deleteRecipeFromLocalStorage(name, ingredients) {
  let recipes = loadRecipesFromLocalStorage();

  recipes = recipes.filter(
    (recipe) => !(recipe.name === name && recipe.ingredients === ingredients)
  );

  saveRecipesToLocalStorage(recipes);
}

// Save all recipes to local storage
function saveRecipesToLocalStorage(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Load all recipes from local storage
function loadRecipesFromLocalStorage() {
  const savedRecipes = localStorage.getItem("recipes");

  return savedRecipes ? JSON.parse(savedRecipes) : [];
}

document.getElementById("search-bar").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();

  const recipeListItems = document.querySelectorAll("#recipe-list li");

  recipeListItems.forEach((item) => {
    const textContent = item.textContent.toLowerCase();

    if (textContent.includes(searchTerm)) {
      item.style.display = ""; // Show matching items
    } else {
      item.style.display = "none"; // Hide non-matching items
    }
  });
});
