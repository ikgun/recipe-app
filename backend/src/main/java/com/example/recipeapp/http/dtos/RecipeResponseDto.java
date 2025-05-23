package com.example.recipeapp.http.dtos;

import com.example.recipeapp.domain.Recipe;

import java.util.UUID;

public record RecipeResponseDto(UUID id,
                                String title,
                                String ingredients,
                                String instructions,
                                String image) {

    public static RecipeResponseDto fromRecipe(Recipe recipe) {
        return new RecipeResponseDto(recipe.getId(), recipe.getTitle(), recipe.getIngredients(), recipe.getInstructions(), recipe.getImage());
    }
}
