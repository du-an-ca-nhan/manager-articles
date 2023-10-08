package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.BaseController;
import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.*;
import com.articlesproject.core.user.service.UserArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/article")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class UserArticleRestController extends BaseController {

    @Value("${app.UserId}")
    private String userId;

    @Autowired
    private UserArticleService userArticleService;


    @GetMapping("")
    public ResponseObject findAllArticle(final UserFindArticleRequest request) {
        System.out.println(request.converCategoryId);
        return new ResponseObject(userArticleService.findAllArticle(userId,request));
    }

    @GetMapping("/search")
    public ResponseObject findArticleBySearch(final UserFindArticleRequest request) {
        System.out.println(request.converCategoryId);
        return new ResponseObject(userArticleService.findAllArticle(userId,request));
    }

    @GetMapping("/find-article-name-category")
    public ResponseObject findAllArticleByNameCategory(final UserFindArticleByNameCategoryRequest request) {
        return new ResponseObject(userArticleService.findAllArticleByNameCategory(userId,request));
    }

    @GetMapping("/find-article-id-category")
    public ResponseObject findAllArticleByIdCategory(final UserFindArticleByIdCategoryRequest request) {
        return new ResponseObject(userArticleService.findAllArticleByIdCategory(userId,request));
    }

    @GetMapping("/find-article-hashtag")
    public ResponseObject findAllArticleByHashtag(final UserFindArticleByHashtagRequest request) {
        return new ResponseObject(userArticleService.findAllArticleByHashtag(userId,request));
    }

    @GetMapping("/by-browse-date")
    public ResponseObject findAllArticleByBrowseDate(final UserFindArticleRequest request) {
        return new ResponseObject(userArticleService.findAllArticleByBrowseDate(userId,request));
    }

    @GetMapping("/by-tym")
    public ResponseObject findAllArticleByTym(final UserFindArticleRequest request) {
        return new ResponseObject(userArticleService.findAllArticleByTym(userId,request));
    }

    @GetMapping("/author")
    public ResponseObject findAllArticleByAuthorId(final UserFindArticleAuthorRequest request) {
        return new ResponseObject(userArticleService.findArticleByIdAuthorId(userId,request));
    }

    @GetMapping("/{id}")
    public ResponseObject getArticleById(@PathVariable("id") String id) {
        return new ResponseObject(userArticleService.getArticleById(userId, id));
    }
}
