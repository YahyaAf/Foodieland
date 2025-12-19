package org.project.backend.repository;

import org.project.backend.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Optional<Recipe> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsBySlugAndIdNot(String slug, Long id);
    List<Recipe> findByCategoryId(Long categoryId);
    List<Recipe> findByAuthorId(Long authorId);
}