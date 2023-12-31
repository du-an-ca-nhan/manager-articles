package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.*;
import com.articlesproject.core.user.model.response.UserArticleResponse;
import com.articlesproject.core.user.model.response.UserDetailArticleResponse;
import com.articlesproject.core.user.repository.UserArticleRepository;
import com.articlesproject.core.user.service.UserArticleService;
import com.articlesproject.infrastructure.constant.Message;
import com.articlesproject.infrastructure.exception.rest.RestApiException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserArticleServiceImpl implements UserArticleService {

    @Autowired
    private UserArticleRepository userArticleRepository;

//    @Cacheable(value = "allArticle", key = "#userId + '_' + #request.page")
    @Override
    public PageableObject<UserArticleResponse> findAllArticle(String userId, UserFindArticleRequest request) {
        request.setConverCategoryId(Arrays.toString(request.getCategoryId()));
        request.setConverHashTag(Arrays.toString(request.getHashtag()));
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticle(pageable, userId, request);
        return new PageableObject<>(res);
    }

    @Override
    public PageableObject<UserArticleResponse> findAllArticleByNameCategory(String userId, UserFindArticleByNameCategoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticleByNameCategory(pageable, userId, request);
        return new PageableObject<>(res);
    }

    @Override
    public PageableObject<UserArticleResponse> findAllArticleByIdCategory(String userId, UserFindArticleByIdCategoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticleByIdCategory(pageable, userId, request);
        return new PageableObject<>(res);
    }

    @Override
    public PageableObject<UserArticleResponse> findAllArticleByHashtag(String userId, UserFindArticleByHashtagRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticleByHashtag(pageable, userId, request);
        return new PageableObject<>(res);
    }

    //    @Cacheable(value = "allArticleByBrowsedate", key = "#userId")
    @Override
    public PageableObject<UserArticleResponse> findAllArticleByBrowseDate(String userId, UserFindArticleRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticleByBrowseDate(pageable, userId, request);
        return new PageableObject<>(res);
    }

//    @Cacheable(value = "allArticleByIdAuthor", key = "#userId")
    @Override
    public PageableObject<UserArticleResponse> findArticleByIdAuthorId(String userId, UserFindArticleAuthorRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findArticleByIdAuthorId(pageable, userId, request);
        return new PageableObject<>(res);
    }

//    @Cacheable(value = "articleById", key = "#id")
    @Override
    public UserDetailArticleResponse getArticleById(String userId, String id) {
        Optional<UserDetailArticleResponse> articles = userArticleRepository.findArticleById(id, userId);
        if (!articles.isPresent()) {
            throw new RestApiException(Message.ERROR_UNKNOWN);
        }
        return articles.get();
    }

//    @Cacheable(value = "allArticleByTym", key = "#userId")
    @Override
    public PageableObject<UserArticleResponse> findAllArticleByTym(String userId, UserFindArticleRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleResponse> res = userArticleRepository.findAllArticleByTym(pageable, userId, request);
        return new PageableObject<>(res);
    }

}
