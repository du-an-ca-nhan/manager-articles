package com.articlesproject.core.user.service;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserCreateArticleRequest;
import com.articlesproject.core.user.model.request.UserMyArticleByStatusRequest;
import com.articlesproject.core.user.model.request.UserMyArticleRequest;
import com.articlesproject.core.user.model.request.UserUpdateArticleRequest;
import com.articlesproject.core.user.model.response.UserArticleResponse;
import com.articlesproject.core.user.model.response.UserDetailArticleResponse;
import com.articlesproject.core.user.model.response.UserMyArticleResponse;
import com.articlesproject.entity.Articles;
import jakarta.validation.Valid;

import java.io.IOException;

public interface UserMyArticleService {
    PageableObject<UserMyArticleResponse> getAllMyArticle(final UserMyArticleRequest request, String userId);

    PageableObject<UserMyArticleResponse> getAllMyArticleByStatus(final UserMyArticleByStatusRequest request, String userId);

    Articles updateArticle(String id, UserUpdateArticleRequest request) throws IOException;

    UserDetailArticleResponse getArticleById(String id, String userId);

    Articles addArticle(@Valid UserCreateArticleRequest request, String userId) throws IOException;

    Articles addDraftArticle(UserCreateArticleRequest request, String userId) throws IOException;

    boolean deleteArticleToTrash(String id);



    UserArticleResponse getArticleUpdateById(String id, String idUser);

    Articles updateArticleToCensor(String id, UserUpdateArticleRequest request) throws IOException;
}
