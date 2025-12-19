package org.project.backend. mapper;

import org.project.backend.dto.categories.CategoryRequest;
import org.project.backend.dto.categories.CategoryResponse;
import org.project.backend. model.Category;
import org. springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toCategoryResponse(Category category) {
        if (category == null) {
            return null;
        }
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setSlug(category.getSlug());
        response.setCreatedAt(category. getCreatedAt());
        response.setUpdatedAt(category. getUpdatedAt());

        return response;
    }

    public Category toCategory(CategoryRequest request) {
        if (request == null) {
            return null;
        }
        Category category = new Category();
        category.setName(request.getName());
        category.setSlug(request.getSlug());

        return category;
    }

    public void updateCategoryFromRequest(CategoryRequest request, Category category) {
        if (request == null || category == null) {
            return;
        }
        category. setName(request.getName());
        category.setSlug(request.getSlug());
    }
}