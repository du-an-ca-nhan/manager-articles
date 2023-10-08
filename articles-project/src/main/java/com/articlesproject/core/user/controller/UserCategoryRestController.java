package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.BaseController;
import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.UserCategoryRequest;
import com.articlesproject.core.user.model.request.UserCreateCategoryRequest;
import com.articlesproject.core.user.model.request.UserUpdateCategoryRequest;
import com.articlesproject.core.user.service.UserCategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class UserCategoryRestController extends BaseController {
    @Autowired
    private UserCategoryService userCategoryService;

    @GetMapping("/censor/crud")
    public ResponseObject getAllCategoryByCensor(final UserCategoryRequest request) {
        return new ResponseObject(userCategoryService.getAllCategoryByCensor(request));
    }

    @GetMapping("")
    public ResponseObject getAllCategory() {
        return new ResponseObject(userCategoryService.getAllCategory());
    }

    @GetMapping("/censor")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(userCategoryService.getAllListCategory());
    }

    @PostMapping("/add-category")
    public ResponseObject addCategory(@Valid @RequestBody UserCreateCategoryRequest request) {
        return new ResponseObject(userCategoryService.addCategory(request));
    }

    @PutMapping("/update-category/{id}")
    public ResponseObject updateCategory(@Valid @RequestBody UserUpdateCategoryRequest request, @PathVariable("id") String id) {
        return new ResponseObject(userCategoryService.updateCategory(request, id));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(userCategoryService.getOne(id));
    }

    @DeleteMapping("/delete-category/{id}")
    public void updateCategory(@PathVariable("id") String id) {
        userCategoryService.deleteCategory(id);
    }


}
