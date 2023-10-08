package com.articlesproject.core.censor.service.impl;

import com.articlesproject.core.censor.model.request.CensorArticleRequest;
import com.articlesproject.core.censor.model.request.CensorUpdateStatusArticleRequest;
import com.articlesproject.core.censor.model.response.CensorArticleNotApproveResponse;
import com.articlesproject.core.censor.repository.CensorArticleRepository;
import com.articlesproject.core.censor.repository.CensorUserRepository;
import com.articlesproject.core.censor.service.CensorArticleService;
import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.repository.UserNotificationRepository;
import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Notification;
import com.articlesproject.entity.Users;
import com.articlesproject.infrastructure.constant.ArticleStatus;
import com.articlesproject.infrastructure.constant.Message;
import com.articlesproject.infrastructure.exception.rest.RestApiException;
import com.articlesproject.util.EmailSender;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Date;
import java.util.Optional;

@Service
@Validated
public class CensorArticleServiceImpl implements CensorArticleService {

    @Autowired
    private CensorArticleRepository articleRepository;

    @Autowired
    private CensorUserRepository userRepository;

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private UserNotificationRepository notificationRepository;

    @Override
    public PageableObject<CensorArticleNotApproveResponse> getAllArticleNotApprove(final CensorArticleRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<CensorArticleNotApproveResponse> res = articleRepository.getAllArticleNotApprove(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public CensorArticleNotApproveResponse findArticleById(String id) {
        Optional<CensorArticleNotApproveResponse> article = articleRepository.findArticleById(id);
        if(!article.isPresent()){
            throw new RestApiException(Message.ARTICLE_NOT_EXIST);
        }
        return article.get();
    }

    @Override
    public Articles approveArticle(@Valid CensorUpdateStatusArticleRequest request) {
        Optional<Articles> article = articleRepository.findById(request.getId());
        Optional<Users> users = userRepository.findById(article.get().getUsersId());
        article.get().setStatus(ArticleStatus.DA_PHE_DUYET);
        article.get().setBrowseDate(new Date().getTime());
        article.get().setCategoryId(request.getCategoryId());
        article.get().setContentApprove(request.getFeedback());
        Notification notification = new Notification();
        notification.setStatus(false);
        notification.setArticlesId(request.getId());
        notification.setUsersId(article.get().getUsersId());
        notification.setContentActivity("Bài viết " +article.get().getTitle()+" đã dược phê duyệt");
        notification.setType(2);
        notificationRepository.save(notification);
        return articleRepository.save(article.get());
    }

    @Override
    public Articles refuseArticle(CensorUpdateStatusArticleRequest request) {
        Optional<Articles> article = articleRepository.findById(request.getId());
        Optional<Users> users = userRepository.findById(article.get().getUsersId());
        if(!article.isPresent()){
            throw new RestApiException(Message.ARTICLE_NOT_EXIST);
        }
        Notification notification = new Notification();
        notification.setStatus(false);
        notification.setArticlesId(request.getId());
        notification.setUsersId(article.get().getUsersId());
        notification.setContentActivity("Bài viết " + article.get().getTitle() + " đã bị từ chối bởi người phê duyệt");
        notification.setType(5);
        notificationRepository.save(notification);
        article.get().setBrowseDate(new Date().getTime());
        article.get().setStatus(ArticleStatus.DA_HUY);
        article.get().setContentApprove(request.getFeedback());
        return articleRepository.save(article.get());
    }
}
