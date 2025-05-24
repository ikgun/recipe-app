package com.example.recipeapp.domain;

import com.example.recipeapp.domain.exceptions.RecipeAlreadyExistsException;
import com.example.recipeapp.domain.exceptions.RecipeNotFoundException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Service
public class RecipeService {

    private final RecipeRepository repository;

    @Autowired
    public RecipeService(RecipeRepository repository) {
        this.repository = repository;
    }

//    private void writeToJson() throws IOException {
//        mapper.writeValue(Files.newBufferedWriter(jsonFile), recipes);
//    }

    public Recipe getById(UUID recipeId) {
//        if (!recipes.containsKey(recipeId)) {
//            throw new RecipeNotFoundException("Recipe with ID " + recipeId.toString() + " not found.");
//        }

        if(!repository.existsById(recipeId)){
            throw new RecipeNotFoundException("Recipe with ID " + recipeId + " not found.");
        }
//        return recipes.get(recipeId);
        return repository.findById(recipeId).orElse(null);
    }

    public List<Recipe> listAll() {
//        return new ArrayList<>(recipes.values());
        return repository.findAll();
    }

    public List<Recipe> listAllByQuery(String queryTerm) {
        String lowerQuery = queryTerm.toLowerCase().trim();
        List<Recipe> matchingRecipes = new ArrayList<>();

        for (Recipe recipe : repository.findAll() /*had recipes.values()*/) {

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


    public Recipe createRecipe(String title, String ingredients, String instructions, String image) throws IOException {
        Recipe recipe = new Recipe();
        recipe.setTitle(title);
        recipe.setIngredients(ingredients);
        recipe.setInstructions(instructions);
        recipe.setImage(image);
        repository.save(recipe);
        return recipe;
    }

    public Recipe updateRecipe(Recipe recipe) {
//        if (!recipes.containsKey(recipe.getId())) {
//            throw new RecipeNotFoundException("Recipe with ID " + recipe.getId() + " not found.");
//        }

        if (!repository.existsById(recipe.getId())) {
            throw new RecipeNotFoundException("Recipe with ID " + recipe.getId() + " not found.");
        }
//        recipes.put(recipe.getId(), recipe);
//        writeToJson();
        repository.save(recipe);
        return recipe;
    }

    public void deleteRecipe(UUID recipeId){
//        if (!recipes.containsKey(recipeId)) {
//            throw new RecipeNotFoundException("Recipe with ID " + recipeId + " not found.");
//        }
        if (!repository.existsById(recipeId)) {
            throw new RecipeNotFoundException("Recipe with ID " + recipeId + " not found.");
        }
//        recipes.remove(recipeId);
//        writeToJson();
        repository.deleteById(recipeId);
    }

}
