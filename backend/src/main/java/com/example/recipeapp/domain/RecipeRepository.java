package com.example.recipeapp.domain;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecipeRepository extends ListCrudRepository<Recipe, UUID> {
}
