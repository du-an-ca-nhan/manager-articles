package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Tyms;
import com.articlesproject.entity.Users;
import com.articlesproject.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Articles.class})
public interface UserChartStatusResponse extends IsIdentified {

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.number_article}")
    String getNumberArticle();

}
