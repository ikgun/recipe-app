package com.example.recipeapp.domain.exceptions;

public class InvalidUuidException extends RuntimeException {
  public InvalidUuidException(String message) {
    super(message);
  }
}
