package com.example.recipeapp.http;

import com.example.recipeapp.domain.Recipe;
import com.example.recipeapp.domain.RecipeService;
import com.example.recipeapp.domain.exceptions.InvalidUuidException;
import com.example.recipeapp.http.dtos.RecipeListResponseDto;
import com.example.recipeapp.http.dtos.RecipeRequestDto;
import com.example.recipeapp.http.dtos.RecipeResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({"/api/recipes", "/api/recipes/"})
@CrossOrigin
public class RecipeController {

    public static final String API_CONTEXT_ROOT = "/api/recipes/";

    RecipeService recipeService;
 
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<?> listRecipes() {
        List<RecipeListResponseDto> response = recipeService.listAll()
                .stream()
                .map(recipe -> new RecipeListResponseDto(recipe.getId(),
                        recipe.getTitle(), recipe.getIngredients(), recipe.getInstructions(), recipe.getImage()))
                .toList();

        if (response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No recipes found.");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<?> getRecipe(@PathVariable String id) {

        Recipe recipe = recipeService.getById(validateId(id));
        return ResponseEntity.ok(RecipeResponseDto.fromRecipe(recipe));

    }

    @GetMapping(path = "/search")
    public ResponseEntity<?> getAllByQuery(@RequestParam String query) {
        List<RecipeListResponseDto> response = recipeService.listAllByQuery(query)
                .stream()
                .map(recipe -> new RecipeListResponseDto(recipe.getId(),
                        recipe.getTitle(), recipe.getIngredients(), recipe.getInstructions(), recipe.getImage()))
                .toList();

        if (response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No recipes found.");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createPresident(@RequestBody @Valid RecipeRequestDto dto) throws IOException {

        Recipe recipe = recipeService.createRecipe(dto.title(), dto.ingredients(), dto.instructions(), dto.image());

        return ResponseEntity
                .created(URI.create(API_CONTEXT_ROOT + recipe.getId()))
                .body(RecipeResponseDto.fromRecipe(recipe));

    }

    @PutMapping(path = "{id}")
    public ResponseEntity<?> updatePresident(
            @PathVariable String id,
            @RequestBody @Valid RecipeRequestDto dto) throws IOException {

        Recipe recipe = recipeService.getById(validateId(id));

        recipe.setTitle(dto.title());
        recipe.setIngredients(dto.ingredients());
        recipe.setInstructions(dto.instructions());
        recipe.setImage(dto.image());

        Recipe updatedRecipe = recipeService.updateRecipe(recipe);

        return ResponseEntity.ok(RecipeResponseDto.fromRecipe(updatedRecipe));

    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePresident(@PathVariable String id) throws IOException {
        recipeService.deleteRecipe(validateId(id));
        return ResponseEntity.noContent().build();
    }

    private UUID validateId(String id) {
        try {
            return UUID.fromString(id);
        } catch (IllegalArgumentException e) {
            throw new InvalidUuidException("Invalid UUID format");
        }
    }

}
