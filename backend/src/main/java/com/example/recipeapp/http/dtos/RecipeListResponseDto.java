package com.example.recipeapp.http.dtos;

import java.util.UUID;

public record RecipeListResponseDto(UUID id, String title, String ingredients, String instructions, String image) {
}
