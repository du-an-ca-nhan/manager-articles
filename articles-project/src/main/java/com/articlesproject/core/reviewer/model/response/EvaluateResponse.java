package com.articlesproject.core.reviewer.model.response;

import com.articlesproject.entity.Evaluate;
import com.articlesproject.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Evaluate.class})
public interface EvaluateResponse extends IsIdentified {

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.created_date}")
    Long getCreatedDate();

    @Value("#{target.browse_date}")
    Long getBrowseDate();

    @Value("#{target.descriptive}")
    String getDescriptive();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.hashtags}")
    String getHashtags();

    @Value("#{target.users_id}")
    String getUserId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.img}")
    String getImg();

}
