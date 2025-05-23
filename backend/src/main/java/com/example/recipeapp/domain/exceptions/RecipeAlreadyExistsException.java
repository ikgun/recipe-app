package com.example.recipeapp.domain.exceptions;

public class RecipeAlreadyExistsException extends RuntimeException {
    public RecipeAlreadyExistsException(String message) {
        super(message);
    }
}
