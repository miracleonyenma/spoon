document.getElementById("recipe-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeName = document.getElementById("recipe-name").value;
  const recipeIngredients = document.getElementById("recipe-ingredients").value;

  addRecipe(recipeName, recipeIngredients);

  // Clear input fields
  document.getElementById("recipe-name").value = "";
  document.getElementById("recipe-ingredients").value = "";
});

let editingIndex = -1; // Variable to track the index of the recipe being edited

function addRecipe(name, ingredients) {
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
  });

  // Delete button functionality
  deleteButton.addEventListener("click", function () {
    recipeList.removeChild(li);
  });

  li.appendChild(editButton);
  li.appendChild(deleteButton);

  recipeList.appendChild(li);
}
