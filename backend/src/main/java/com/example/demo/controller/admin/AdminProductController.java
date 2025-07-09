package com.example.demo.controller.admin;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.admin.product.productService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor

public class AdminProductController {
    private final productService adminProductService;
    private final ProductRepository productRepository;

    @PostMapping("/admin/add_product")
    public ResponseEntity<ProductDto> addProduct(@ModelAttribute ProductDto productDto) throws IOException {
        ProductDto productDto1 = adminProductService.addProduct(productDto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(productDto1);
    }

    @GetMapping("admin/products")
    public ResponseEntity<List<ProductDto>> getAllProducts()
    {
        List<ProductDto> productDtos = adminProductService.getAllProducts();
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("admin/search/{name}")
    public ResponseEntity<List<ProductDto>> getAllProductByname(@PathVariable String name)
    {
        List<ProductDto> productDtos = adminProductService.getAllProductByname(name);
        return ResponseEntity.ok(productDtos);
    }

    @DeleteMapping("admin/deleteProduct/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id)
    {
        boolean deleted = adminProductService.deleteProduct(id);
        if (deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();

    }

    @GetMapping("admin/product/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId)
    {
        ProductDto productDto = adminProductService.getProductByID(productId);
        if (productDto != null){
            return ResponseEntity.ok(productDto);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("admin/product/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @ModelAttribute ProductDto productDto) throws IOException {
        ProductDto updateProduct = adminProductService.updateProduct(productId,productDto);
        if (updateProduct != null){
            return ResponseEntity.ok(updateProduct);
        }
        else
        {
            return ResponseEntity.notFound().build();
        }
    }
}
