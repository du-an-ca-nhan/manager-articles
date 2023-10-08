package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.History;
import com.articlesproject.entity.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Users.class, History.class})
public interface UserChartHistoryRequest {

    @Value("#{target.name}")
    String getUserName();

    @Value("#{target.id}")
    String getUserID();

    @Value("#{target.view}")
    int getView();
}
