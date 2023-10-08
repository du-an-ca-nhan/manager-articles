package com.articlesproject.core.reviewer.service;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.reviewer.model.request.CreateEvaluateRequest;
import com.articlesproject.core.reviewer.model.request.EvaluateRequest;
import com.articlesproject.core.reviewer.model.response.EvaluateResponse;
import com.articlesproject.entity.Evaluate;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ReviewerEvaluateService {

    PageableObject<EvaluateResponse> getAllArticleNotEvaluate(final EvaluateRequest request);

    List<EvaluateResponse> getAllEvaluateByUserId(String userId);

    Evaluate create(CreateEvaluateRequest request, String userId);

    EvaluateResponse findArticleById(String id);
}
