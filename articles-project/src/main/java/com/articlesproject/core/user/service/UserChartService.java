package com.articlesproject.core.user.service;

import com.articlesproject.core.user.model.response.*;

import java.util.List;

public interface UserChartService {

    List<UserChartTymResponse> getAllArticleFavorite(String userId);

    List<UserChartCommentResponse> getAllArticleComment(String userId);

    List<UserChartStatusResponse> getAllArticleStatus(String userId);

    List<UserChartHistoryRequest> findAllUsersWhoSeeArticleAnyone(String userId);

    List<UserChartNumberArticleResponse> findAllNumberArticleByDayInMonth(String userId);
}
