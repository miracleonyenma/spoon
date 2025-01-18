document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const recipeName = document.getElementById('recipe-name').value;
    const recipeIngredients = document.getElementById('recipe-ingredients').value;

    addRecipe(recipeName, recipeIngredients);
    
    // Clear input fields
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
});

function addRecipe(name, ingredients) {
    const recipeList = document.getElementById('recipe-list');
    
    const li = document.createElement('li');
    li.textContent = `${name}: ${ingredients}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    deleteButton.addEventListener('click', function() {
        recipeList.removeChild(li);
    });
    
    li.appendChild(deleteButton);
    
    recipeList.appendChild(li);
}

