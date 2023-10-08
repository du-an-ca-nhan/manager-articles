package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.user.model.response.*;
import com.articlesproject.core.user.repository.UserChartRepository;
import com.articlesproject.core.user.repository.UserHistoryRepository;
import com.articlesproject.core.user.repository.UserMyArticleRepository;
import com.articlesproject.core.user.service.UserChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserChartServiceImpl implements UserChartService {

    @Autowired
    private UserChartRepository chartRepository;

    @Autowired
    private UserHistoryRepository historyRepository;

    @Autowired
    private UserMyArticleRepository myArticleRepository;



    @Override
    public List<UserChartTymResponse> getAllArticleFavorite(String userId) {
        return chartRepository.getAllArticleFavorite(userId);
    }

    @Override
    public List<UserChartCommentResponse> getAllArticleComment(String userId) {
        return chartRepository.getAllArticleComment(userId);
    }

    @Override
    public List<UserChartStatusResponse> getAllArticleStatus(String userId) {
        return chartRepository.getAllArticleStatus(userId);
    }

    @Override
    public List<UserChartHistoryRequest> findAllUsersWhoSeeArticleAnyone(String userId) {
        return historyRepository.findAllUsersWhoSeeArticleAnyone(userId);
    }

    @Override
    public List<UserChartNumberArticleResponse> findAllNumberArticleByDayInMonth(String userId) {
        return myArticleRepository.findAllNumberArticleByDayInMonth(userId);
    }

}
