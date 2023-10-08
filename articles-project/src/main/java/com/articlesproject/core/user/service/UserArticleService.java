package com.articlesproject.core.user.service;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.*;
import com.articlesproject.core.user.model.response.UserArticleResponse;
import com.articlesproject.core.user.model.response.UserDetailArticleResponse;

public interface UserArticleService {
    PageableObject<UserArticleResponse> findAllArticle(String userId, final UserFindArticleRequest request);

    PageableObject<UserArticleResponse> findAllArticleByNameCategory(String userId, final UserFindArticleByNameCategoryRequest request);

    PageableObject<UserArticleResponse> findAllArticleByIdCategory(String userId, final UserFindArticleByIdCategoryRequest request);

    PageableObject<UserArticleResponse> findAllArticleByHashtag(String userId, final UserFindArticleByHashtagRequest request);

    PageableObject<UserArticleResponse> findAllArticleByBrowseDate(String userId, final UserFindArticleRequest request);

    PageableObject<UserArticleResponse> findArticleByIdAuthorId(String userId, UserFindArticleAuthorRequest request);

    UserDetailArticleResponse getArticleById(String userId, String id);

    PageableObject<UserArticleResponse> findAllArticleByTym(String userId, final UserFindArticleRequest request);

}
