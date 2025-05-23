package com.example.recipeapp.http.dtos;

import jakarta.validation.constraints.NotNull;

public record RecipeRequestDto(@NotNull String title, @NotNull String ingredients, @NotNull String instructions, @NotNull String image){
}
