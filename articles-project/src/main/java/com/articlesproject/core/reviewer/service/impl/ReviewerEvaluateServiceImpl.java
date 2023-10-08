package com.articlesproject.core.reviewer.service.impl;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.reviewer.model.request.CreateEvaluateRequest;
import com.articlesproject.core.reviewer.model.request.EvaluateRequest;
import com.articlesproject.core.reviewer.model.response.EvaluateResponse;
import com.articlesproject.core.reviewer.repository.ReviewerEvaluateRepository;
import com.articlesproject.core.reviewer.service.ReviewerEvaluateService;
import com.articlesproject.core.user.repository.UserArticleRepository;
import com.articlesproject.core.user.repository.UserNotificationRepository;
import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Evaluate;
import com.articlesproject.entity.Notification;
import com.articlesproject.infrastructure.constant.Message;
import com.articlesproject.infrastructure.exception.rest.RestApiException;
import com.articlesproject.util.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewerEvaluateServiceImpl implements ReviewerEvaluateService {

    @Autowired
    private ReviewerEvaluateRepository evaluateRepository;

    @Autowired
    private UserArticleRepository userArticleRepository;

    @Autowired
    private UserNotificationRepository notificationRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public PageableObject<EvaluateResponse> getAllArticleNotEvaluate(final EvaluateRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<EvaluateResponse> res = evaluateRepository.getAllArticleNotEvaluate(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public List<EvaluateResponse> getAllEvaluateByUserId(String userId) {
        return evaluateRepository.getAllEvaluateByUserId(userId);
    }

    @Override
    public Evaluate create(CreateEvaluateRequest request, String userId) {
        Evaluate evaluate = formUtils.convertToObject(Evaluate.class, request);
        evaluate.setUsersId(userId);
        evaluateRepository.save(evaluate);
        Optional<Articles> articlesOptional = userArticleRepository.findById(request.getArticlesId());
        articlesOptional.get().setEvaluateDate(new Date().getTime());
        userArticleRepository.save(articlesOptional.get());
        Notification notification = new Notification();
        notification.setStatus(false);
        notification.setArticlesId(request.getArticlesId());
        notification.setUsersId(userId);
        notification.setContentActivity("Bài viết " + articlesOptional.get().getTitle() + " của bạn đã được đánh giá " + evaluate.getStar() + " sao");
        notification.setType(3);
        notificationRepository.save(notification);
        return evaluate;
    }

    @Override
    public EvaluateResponse findArticleById(String id) {
        Optional<EvaluateResponse> article = evaluateRepository.findArticleById(id);
        if (!article.isPresent()) {
            throw new RestApiException(Message.ARTICLE_NOT_EXIST);
        }
        return article.get();
    }
}
