package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Tyms;
import com.articlesproject.entity.Users;
import com.articlesproject.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Articles.class, Users.class, Tyms.class})
public interface UserChartTymResponse extends IsIdentified {

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.tym_number}")
    String getNumberTym();

}
