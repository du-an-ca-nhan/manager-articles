package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.user.model.request.UserCreateTymRequest;
import com.articlesproject.core.user.model.response.UserTymResponse;
import com.articlesproject.core.user.repository.UUserRepository;
import com.articlesproject.core.user.repository.UserArticleRepository;
import com.articlesproject.core.user.repository.UserNotificationRepository;
import com.articlesproject.core.user.repository.UserTymRepository;
import com.articlesproject.core.user.service.UserTymService;
import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Notification;
import com.articlesproject.entity.Tyms;
import com.articlesproject.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserTymServiceImpl implements UserTymService {

    @Autowired
    private UserTymRepository tymRepository;

    @Autowired
    private UserArticleRepository userArticleRepository;

    @Autowired
    private UserNotificationRepository notificationRepository;

    @Autowired
    private UUserRepository userRepository;

    @Override
    public List<UserTymResponse> getAllArticleFavorite(String userId) {
        return tymRepository.getAllArticleFavorite(userId);
    }

    @Override
    public Tyms favoriteArticle(String userId, UserCreateTymRequest request) {
        Tyms tyms = new Tyms();
        tyms.setArticleId(request.getArticlesId());
        tyms.setUsersId(userId);
        Optional<Users> optionalUsers = userRepository.findById(userId);
        Optional<Articles> optionalArticles = userArticleRepository.findById(request.getArticlesId());

        Notification notification = new Notification();
        notification.setStatus(false);
        notification.setArticlesId(request.getArticlesId());
        notification.setUsersId(userId);
        notification.setContentActivity(optionalUsers.get().getName() + " đã yêu thích bài viết " + optionalArticles.get().getTitle() + " của bạn");
        notification.setType(4);
        notificationRepository.save(notification);
        return tymRepository.save(tyms);
    }

    @Override
    public boolean unFavoriteArticle(String userId, String articleId) {
        tymRepository.deleteByUsersIdAndArticleId(userId, articleId);
        return true;
    }

    @Override
    public boolean deleteAllTymByIdIn(String[] ids) {
        tymRepository.deleteByIdIn(ids);
        return true;
    }
}
