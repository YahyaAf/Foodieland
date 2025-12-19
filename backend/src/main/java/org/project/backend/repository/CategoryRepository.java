package org.project.backend.repository;

import org.project.backend.model.Category;
import org.springframework.data.jpa.repository. JpaRepository;
import org. springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);
    boolean existsBySlug(String slug);
    boolean existsByNameAndIdNot(String name, Long id);
    boolean existsBySlugAndIdNot(String slug, Long id);
}