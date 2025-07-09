package com.example.demo.service.admin.product;

import com.example.demo.dto.ProductDto;

import java.io.IOException;
import java.util.List;

public interface productService {
    ProductDto addProduct(ProductDto productDto) throws java.io.IOException;
    List<ProductDto> getAllProducts();
    List<ProductDto> getAllProductByname(String name);
    boolean deleteProduct(Long id);
    ProductDto getProductByID(Long productId);
    ProductDto updateProduct(Long productId, ProductDto productDto) throws IOException;
}
