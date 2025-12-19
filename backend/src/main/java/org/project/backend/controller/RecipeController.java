package org.project.backend. controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.backend. dto.recipes.RecipeRequest;
import org.project.backend. dto.recipes.RecipeResponse;
import org.project.backend. exception.UnauthorizedException;
import org. project.backend.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<RecipeResponse> create(
            @Valid @RequestBody RecipeRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new UnauthorizedException("You must be logged in to create a recipe");
        }

        RecipeResponse response = recipeService.create(request, userId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getById(@PathVariable Long id) {
        RecipeResponse response = recipeService.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<RecipeResponse>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long authorId
    ) {
        List<RecipeResponse> recipes;

        if (search != null && !search.isEmpty()) {
            recipes = recipeService.search(search);
        }
        else if (categoryId != null) {
            recipes = recipeService.filterByCategory(categoryId);
        }
        else if (authorId != null) {
            recipes = recipeService.filterByAuthor(authorId);
        }
        else {
            recipes = recipeService.getAll();
        }

        return ResponseEntity.ok(recipes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody RecipeRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new UnauthorizedException("You must be logged in to update a recipe");
        }

        RecipeResponse response = recipeService.update(id, request, userId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new UnauthorizedException("You must be logged in to delete a recipe");
        }
        recipeService.delete(id, userId);
        return ResponseEntity. noContent().build();
    }
}