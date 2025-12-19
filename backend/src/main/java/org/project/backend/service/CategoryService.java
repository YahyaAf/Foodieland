package org.project.backend.service;

import lombok.RequiredArgsConstructor;
import org.project.backend.dto.categories.CategoryRequest;
import org.project. backend.dto.categories.CategoryResponse;
import org.project.backend.exception.ResourceNotFoundException;
import org.project. backend.exception.DuplicateResourceException;
import org.project.backend.mapper.CategoryMapper;
import org.project.backend. model.Category;
import org. project.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryResponse create(CategoryRequest request) {
        if (categoryRepository. existsByName(request.getName())) {
            throw new DuplicateResourceException("Category name already exists");
        }

        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateResourceException("Category slug already exists");
        }

        Category category = categoryMapper.toCategory(request);
        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.toCategoryResponse(savedCategory);
    }

    public CategoryResponse findById(Long id) {
        Category category = categoryRepository. findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        return categoryMapper.toCategoryResponse(category);
    }

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toCategoryResponse)
                .collect(Collectors. toList());
    }

    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepository. findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (categoryRepository.existsByNameAndIdNot(request.getName(), id)) {
            throw new DuplicateResourceException("Category name already exists");
        }
        if (categoryRepository.existsBySlugAndIdNot(request.getSlug(), id)) {
            throw new DuplicateResourceException("Category slug already exists");
        }
        categoryMapper.updateCategoryFromRequest(request, category);
        Category updatedCategory = categoryRepository.save(category);

        return categoryMapper. toCategoryResponse(updatedCategory);
    }

    public void delete(Long id) {
        if (!categoryRepository. existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id:  " + id);
        }

        categoryRepository.deleteById(id);
    }
}