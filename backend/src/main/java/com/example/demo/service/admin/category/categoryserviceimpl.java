package com.example.demo.service.admin.category;

import com.example.demo.dto.CategoryDto;
import com.example.demo.model.Category;
import com.example.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class categoryserviceimpl implements categoryservice {
private final CategoryRepository categoryRepository;
public Category createCategory(CategoryDto categoryDto)
{
    Category category = new Category();
    category.setName(categoryDto.getName());
    category.setDescription(categoryDto.getDescription());
    return categoryRepository.save(category);
}
public List<Category> getAllCategories(){
    return categoryRepository.findAll();
}
}
