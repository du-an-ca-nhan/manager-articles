package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.Notification;
import com.articlesproject.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Notification.class})
public interface UserNotificationResponse extends IsIdentified {

    @Value("#{target.articles_id}")
    String getArticlesId();

    @Value("#{target.content_activity}")
    String getContentActivity();

    @Value("#{target.status}")
    Boolean getStatus();

    @Value("#{target.type}")
    Integer getType();

    @Value("#{target.created_date}")
    Long getCreatedDate();

}
