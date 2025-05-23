package com.example.recipeapp.domain;

import com.example.recipeapp.domain.exceptions.InvalidUuidException;
import com.example.recipeapp.domain.exceptions.RecipeAlreadyExistsException;
import com.example.recipeapp.domain.exceptions.RecipeNotFoundException;
import com.example.recipeapp.http.RecipeController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.stream.Collectors;

@RestControllerAdvice(assignableTypes = RecipeController.class)
public class RecipeControllerAdvice {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ResponseEntity<String> handleValidationExceptions(BindingResult bindingResult) {
        String messages = bindingResult.getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest().body(messages);
    }

    @ExceptionHandler({IllegalArgumentException.class, InvalidUuidException.class})
    protected ResponseEntity<Void> handleIllegalArgumentExceptions() {
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(RecipeNotFoundException.class)
    protected ResponseEntity<String> handleRecipeNotFoundExceptions(RecipeNotFoundException e) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }

    @ExceptionHandler(RecipeAlreadyExistsException.class)
    protected ResponseEntity<String> handleRecipeAlreadyExistsException(RecipeAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(e.getMessage());
    }

    @ExceptionHandler(IOException.class)
    protected ResponseEntity<String> handleIOException(IOException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An I/O error occurred: " + ex.getMessage());
    }
}