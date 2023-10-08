package com.articlesproject.core.user.service;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserCategoryRequest;
import com.articlesproject.core.user.model.request.UserCreateCategoryRequest;
import com.articlesproject.core.user.model.request.UserUpdateCategoryRequest;
import com.articlesproject.core.user.model.response.UserCategoryRespone;
import com.articlesproject.entity.Category;

import java.util.List;

public interface UserCategoryService {
    PageableObject<UserCategoryRespone> getAllCategoryByCensor(UserCategoryRequest request);

    List<UserCategoryRespone> getAllCategory();

    List<UserCategoryRespone> getAllListCategory();

    Category addCategory(UserCreateCategoryRequest request);

    Category updateCategory(UserUpdateCategoryRequest request, String id);

    void deleteCategory(String id);

    Category getOne(String id);
}
