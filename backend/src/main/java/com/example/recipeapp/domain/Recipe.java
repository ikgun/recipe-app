package com.example.recipeapp.domain;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "Recipe")
public class Recipe {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String ingredients;

    @Column(nullable = false)
    private String instructions;

    @Column(nullable = false)
    private String image;

    public Recipe(UUID id, String title, String ingredients, String instructions, String image) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.image = image;
    }

    public Recipe() {

    }


    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String imageUrl) {
        this.image = imageUrl;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", ingredients=" + ingredients +
                ", instructions='" + instructions + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
