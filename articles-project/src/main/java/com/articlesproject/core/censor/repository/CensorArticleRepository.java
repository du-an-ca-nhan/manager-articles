package com.articlesproject.core.censor.repository;

import com.articlesproject.core.censor.model.request.CensorArticleRequest;
import com.articlesproject.core.censor.model.response.CensorArticleNotApproveResponse;
import com.articlesproject.entity.Articles;
import com.articlesproject.repository.ArticlesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CensorArticleRepository extends ArticlesRepository {

    List<Articles> findByCategoryId(String categoryId);

    @Query(value = """
             SELECT ar.id, ar.title,ar.created_date, ar.browse_date, ar.users_id, us.img, us.name,
                GROUP_CONCAT(ha.title ORDER BY ha.title SEPARATOR ', ') AS 'hashtags' 
                FROM articles ar
                LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
                LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
                LEFT JOIN tyms ON tyms.article_id = ar.id
                LEFT JOIN users us ON us.id = ar.users_id
                WHERE ar.status = 2
                AND ( :#{#request.startDate} = 0
                OR ar.created_date >= :#{#request.startDate} )
                AND ( :#{#request.endDate} = 0
                OR ar.created_date <= :#{#request.endDate} )
                GROUP BY  ar.id, ar.title,ar.created_date, ar.browse_date, ar.status, ar.users_id, us.name
                ORDER BY IF(:#{#request.sortOrder} = 'newest', ar.created_date, NULL) ASC, IF(:#{#request.sortOrder} = 'oldest', ar.created_date, NULL) DESC;
            """, countQuery = """
             SELECT count(ar.id)
                            FROM articles ar
                            LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
                            LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
                            LEFT JOIN tyms ON tyms.article_id = ar.id
                            LEFT JOIN users us ON us.id = ar.users_id
                            WHERE ar.status = 2
                            AND ( :#{#request.startDate} = 0
                                 OR ar.created_date >= :#{#request.startDate} )
                            AND ( :#{#request.endDate} = 0
                                 OR ar.created_date <= :#{#request.endDate} )
                            GROUP BY  ar.id, ar.title,ar.created_date, ar.browse_date, ar.status, ar.users_id, us.name
                            ORDER BY IF(:#{#request.sortOrder} = 'newest', ar.created_date, NULL) ASC, IF(:#{#request.sortOrder} = 'oldest', ar.created_date, NULL) DESC;
            """, nativeQuery = true)
    Page<CensorArticleNotApproveResponse> getAllArticleNotApprove(Pageable pageable, @Param("request") CensorArticleRequest request);

    @Query(value = """       
             SELECT ar.id, ar.title, ar.created_date, ar.descriptive, ar.browse_date, ar.status,ar.users_id, us.img, us.name,
                GROUP_CONCAT(ha.title ORDER BY ha.title SEPARATOR ', ') AS 'hashtags' 
                FROM articles ar
                LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
                LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
                LEFT JOIN tyms ON tyms.article_id = ar.id
                LEFT JOIN users us ON us.id = ar.users_id
                WHERE ar.id = :id
                AND ar.status = 2
                GROUP BY  ar.id, ar.title, ar.created_date, ar.descriptive, ar.browse_date, ar.status, ar.users_id, us.name
            """, nativeQuery = true)
    Optional<CensorArticleNotApproveResponse> findArticleById(@Param("id") String id);
}
