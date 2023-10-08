package com.articlesproject.core.user.repository;

import com.articlesproject.core.user.model.response.UserChartCommentResponse;
import com.articlesproject.core.user.model.response.UserChartStatusResponse;
import com.articlesproject.core.user.model.response.UserChartTymResponse;
import com.articlesproject.core.user.model.response.UserTymResponse;
import com.articlesproject.repository.TymRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserChartRepository extends TymRepository {

    @Query(value = """
           SELECT ty.article_id, ar.title, (SELECT count(ty.article_id) FROM tyms ty WHERE ty.article_id = ar.id) AS 'tym_number'  
           FROM tyms ty
           LEFT JOIN articles ar ON ar.id = ty.article_id
           WHERE ty.users_id = :userId
           GROUP BY ar.title, ty.article_id
            """, nativeQuery = true)
    List<UserChartTymResponse> getAllArticleFavorite(@Param("userId") String userId);

    @Query(value = """
           SELECT co.articles_id, ar.title,(SELECT count(co.articles_id) FROM comments co WHERE co.articles_id =  ar.id) AS 'number_comment'\s
             FROM comments co
             LEFT JOIN articles ar ON co.articles_id = ar.id
             WHERE co.users_id = :userId
             GROUP BY co.articles_id, ar.title
            """, nativeQuery = true)
    List<UserChartCommentResponse> getAllArticleComment(String userId);

    @Query(value = """
           select ar.status, count(*) as 'number_article' from articles ar
             WHERE ar.users_id = :userId AND ar.status in (1,2,3,4)
             GROUP BY ar.status
            """, nativeQuery = true)
    List<UserChartStatusResponse> getAllArticleStatus(String userId);
}
