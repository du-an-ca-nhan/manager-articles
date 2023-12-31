package com.articlesproject.core.user.model.response;

import com.articlesproject.entity.Articles;
import com.articlesproject.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = {Articles.class})
public interface UserArticleResponse extends IsIdentified {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.descriptive}")
    String getDescriptive();

    @Value("#{target.browse_date}")
    Long getBrowseDate();

    @Value("#{target.tym}")
    int getTym();

    @Value("#{target.hashtags}")
    String getHashtags();

    @Value("#{target.favorite}")
    int getFavorite();

    @Value("#{target.status}")
    Integer getStatus();

    @Value("#{target.users_id}")
    String getUserId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.img}")
    String getImg();
//    @Value("#{target.star}")
//    Integer getStar();
    @Value("#{target.name_category}")
    String getNameCategory();
//    @Value("#{target.number_comments}")
//    Integer getNumberComments();

}
