package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserCategoryRequest;
import com.articlesproject.core.user.model.request.UserCreateCategoryRequest;
import com.articlesproject.core.user.model.request.UserUpdateCategoryRequest;
import com.articlesproject.core.user.model.response.UserCategoryRespone;
import com.articlesproject.core.user.repository.UserCategoryRepository;
import com.articlesproject.core.user.service.UserCategoryService;
import com.articlesproject.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserCategoryServiceImpl implements UserCategoryService {

    @Autowired
    private UserCategoryRepository userCategoryRepository;

    @Override
    public PageableObject<UserCategoryRespone> getAllCategoryByCensor( UserCategoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserCategoryRespone> res = userCategoryRepository.getAllCategoryByCensor(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public List<UserCategoryRespone> getAllCategory() {
        return userCategoryRepository.getAllCategory();
    }

    @Override
    public List<UserCategoryRespone> getAllListCategory() {
        return userCategoryRepository.getAllListCategory();
    }

    @Override
    public Category addCategory(UserCreateCategoryRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("CA%04d", number);
        Category ca = new Category();
        ca.setCode(code);
        ca.setName(request.getName());
        userCategoryRepository.save(ca);
        return ca;
    }

    @Override
    public Category updateCategory(UserUpdateCategoryRequest request, String id) {
        Optional<Category> categoryOptional = userCategoryRepository.findById(id);
        categoryOptional.get().setName(request.getName());
        userCategoryRepository.save(categoryOptional.get());
        return categoryOptional.get();
    }

    @Override
    public void deleteCategory(String id) {
        Optional<Category> categoryOptional = userCategoryRepository.findById(id);
        userCategoryRepository.delete(categoryOptional.get());
    }

    @Override
    public Category getOne(String id) {
        Optional<Category> categoryOptional = userCategoryRepository.findById(id);
        return categoryOptional.get();
    }

}
