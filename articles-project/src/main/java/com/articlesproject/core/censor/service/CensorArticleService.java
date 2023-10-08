package com.articlesproject.core.censor.service;

import com.articlesproject.core.censor.model.request.CensorArticleRequest;
import com.articlesproject.core.censor.model.request.CensorUpdateStatusArticleRequest;
import com.articlesproject.core.censor.model.response.CensorArticleNotApproveResponse;
import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.entity.Articles;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

public interface CensorArticleService {
    PageableObject<CensorArticleNotApproveResponse> getAllArticleNotApprove(final CensorArticleRequest request);

    CensorArticleNotApproveResponse findArticleById(String id);

    Articles approveArticle(@Valid CensorUpdateStatusArticleRequest request);

    Articles refuseArticle(CensorUpdateStatusArticleRequest request);
}
