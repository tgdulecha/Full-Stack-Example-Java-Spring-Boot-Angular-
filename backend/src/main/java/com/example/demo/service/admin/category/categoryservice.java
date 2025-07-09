package com.example.demo.service.admin.category;

import com.example.demo.dto.CategoryDto;
import com.example.demo.model.Category;

import java.util.List;

public interface categoryservice {
    Category createCategory(CategoryDto categoryDto);
    List<Category> getAllCategories();
}
