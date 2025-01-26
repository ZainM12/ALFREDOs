const apiKey = '2f298348b41f4572ae6ebc695fbfd145';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');


async function searchRecipes(query) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=Italian&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// Function to display recipes
function displayResults(recipes) {
  resultsDiv.innerHTML = ''; // Clear previous results
  if (recipes.length === 0) {
    resultsDiv.innerHTML = '<p>No recipes found.</p>';
    return;
  }
  recipes.forEach((recipe) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" style="max-width:100px;">
    `;
    resultsDiv.appendChild(recipeDiv);
  });
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) searchRecipes(query);
});
