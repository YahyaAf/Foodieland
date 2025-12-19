package org.project. backend.service;

import lombok. RequiredArgsConstructor;
import org.project.backend.dto.recipes.RecipeRequest;
import org.project.backend.dto.recipes.RecipeResponse;
import org.project.backend.exception.ResourceNotFoundException;
import org. project.backend.exception.DuplicateResourceException;
import org.project.backend. exception.UnauthorizedException;
import org. project.backend.mapper.RecipeMapper;
import org.project. backend.model.Category;
import org.project.backend.model.Recipe;
import org.project.backend.model.User;
import org.project.backend.repository.CategoryRepository;
import org.project.backend. repository.RecipeRepository;
import org.project.backend.repository. UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final RecipeMapper recipeMapper;

    public RecipeResponse create(RecipeRequest request, Long authorId) {
        if (recipeRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Recipe slug already exists");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + authorId));

        Recipe recipe = recipeMapper.toRecipe(request);
        recipe.setCategory(category);
        recipe.setAuthor(author);

        Recipe savedRecipe = recipeRepository. save(recipe);
        return recipeMapper.toRecipeResponse(savedRecipe);
    }

    public RecipeResponse findById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id:  " + id));

        return recipeMapper.toRecipeResponse(recipe);
    }

    public List<RecipeResponse> getAll() {
        return recipeRepository.findAll()
                .stream()
                .map(recipeMapper::toRecipeResponse)
                .collect(Collectors.toList());
    }

    public List<RecipeResponse> search(String keyword) {
        return recipeRepository.findAll()
                .stream()
                .filter(recipe -> recipe.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                .map(recipeMapper::toRecipeResponse)
                .collect(Collectors.toList());
    }

    public List<RecipeResponse> filterByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }

        return recipeRepository.findByCategoryId(categoryId)
                .stream()
                .map(recipeMapper::toRecipeResponse)
                .collect(Collectors. toList());
    }

    public List<RecipeResponse> filterByAuthor(Long authorId) {
        if (!userRepository. existsById(authorId)) {
            throw new ResourceNotFoundException("User not found with id: " + authorId);
        }

        return recipeRepository.findByAuthorId(authorId)
                .stream()
                .map(recipeMapper::toRecipeResponse)
                .collect(Collectors. toList());
    }

    public RecipeResponse update(Long id, RecipeRequest request, Long currentUserId) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));

        if (!recipe.getAuthor().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You are not authorized to update this recipe");
        }

        if (recipeRepository.existsBySlugAndIdNot(request.getSlug(), id)) {
            throw new DuplicateResourceException("Recipe slug already exists");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        recipeMapper.updateRecipeFromRequest(request, recipe);
        recipe.setCategory(category);

        Recipe updatedRecipe = recipeRepository.save(recipe);
        return recipeMapper.toRecipeResponse(updatedRecipe);
    }

    public void delete(Long id, Long currentUserId) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with id: " + id));

        if (!recipe.getAuthor().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You are not authorized to delete this recipe");
        }

        recipeRepository.deleteById(id);
    }
}