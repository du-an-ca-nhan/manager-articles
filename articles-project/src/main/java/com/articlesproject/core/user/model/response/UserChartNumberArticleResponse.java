package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.Articles;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Articles.class})
public interface UserChartNumberArticleResponse {

    @Value("#{target.day}")
    String getDay();

    @Value("#{target.count}")
    int getNumberArticle();
}
