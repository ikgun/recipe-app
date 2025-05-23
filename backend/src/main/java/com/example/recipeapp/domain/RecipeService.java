package com.example.recipeapp.domain;

import com.example.recipeapp.domain.exceptions.RecipeAlreadyExistsException;
import com.example.recipeapp.domain.exceptions.RecipeNotFoundException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Service
public class RecipeService {

    private final Path jsonFile;
    ObjectMapper mapper = new ObjectMapper();
    HashMap<UUID, Recipe> recipes;

    public RecipeService(@Value("${recipes.json}") String jsonFile) throws URISyntaxException, IOException {
        Path file = Path.of(Objects.requireNonNull(getClass().getClassLoader().getResource(jsonFile)).toURI());

        if (!Files.exists(file)) {
            throw new FileNotFoundException("'" + jsonFile + "' was not found");
        }

        this.jsonFile = file;
        recipes = mapper.readValue(Files.newBufferedReader(this.jsonFile), new TypeReference<>() {
        });

    }

    private void writeToJson() throws IOException {
        mapper.writeValue(Files.newBufferedWriter(jsonFile), recipes);
    }

    public Recipe getById(UUID recipeId) {
        if (!recipes.containsKey(recipeId)) {
            throw new RecipeNotFoundException("Recipe with ID " + recipeId.toString() + " not found.");
        }
        return recipes.get(recipeId);
    }

    public List<Recipe> listAll() {
        return new ArrayList<>(recipes.values());
    }

    public List<Recipe> listAllByQuery(String queryTerm) {
        String lowerQuery = queryTerm.toLowerCase().trim();
        List<Recipe> matchingRecipes = new ArrayList<>();

        for (Recipe recipe : recipes.values()) {
            
            String[] titleWords = recipe.getTitle().toLowerCase().split("\\W+");
            String[] ingredientWords = recipe.getIngredients().toLowerCase().split("\\W+");

            boolean titleMatch = Arrays.asList(titleWords).contains(lowerQuery);
            boolean ingredientsMatch = Arrays.asList(ingredientWords).contains(lowerQuery);

            if (titleMatch || ingredientsMatch) {
                matchingRecipes.add(recipe);
            }
        }

        return matchingRecipes;
    }



    public void addRecipe(Recipe recipe) throws IOException {
        if (recipes.containsKey(recipe.getId())) {
            throw new RecipeAlreadyExistsException("Recipe already exists.");
        }
        recipes.put(recipe.getId(), recipe);
        writeToJson();
    }

    public Recipe createRecipe(String title, String ingredients, String instructions, String image) throws IOException {
        Recipe recipe = new Recipe(UUID.randomUUID(), title, ingredients, instructions, image);
        addRecipe(recipe);
        return recipe;
    }

    public Recipe updateRecipe(Recipe recipe) throws IOException {
        if (!recipes.containsKey(recipe.getId())) {
            throw new RecipeNotFoundException("Recipe with ID " + recipe.getId() + " not found.");
        }
        recipes.put(recipe.getId(), recipe);
        writeToJson();
        return recipe;
    }

    public void deleteRecipe(UUID recipeId) throws IOException {
        if (!recipes.containsKey(recipeId)) {
            throw new RecipeNotFoundException("Recipe with ID " + recipeId + " not found.");
        }
        recipes.remove(recipeId);
        writeToJson();
    }

}
