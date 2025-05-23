// fetches data or does operations on them using endpoints with GET, POST, DELETE methods

const API_URL = "http://localhost:8080/api/recipes";

//GET request to /api/recipes
export async function getAll() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

//GET request to /api/recipes/{id}
export async function getRecipe(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}

//GET request to /api/recipes/search?query={query}
export async function getQuery(query: string) {
  const response = await fetch(`${API_URL}/search?query=${query}`);
  const data = await response.json();
  return data;
}

//POST request to /api/recipes
export async function createRecipe(requestBody: {
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();
  return data;
}

//PUT request to /api/recipes
export async function updateRecipe(requestBody: {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
}) {
  const response = await fetch(`${API_URL}/${requestBody.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();
  return data;
}

//DELETE request to /api/recipes/{id}
export async function deleteRecipe(id: string) {
 await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}