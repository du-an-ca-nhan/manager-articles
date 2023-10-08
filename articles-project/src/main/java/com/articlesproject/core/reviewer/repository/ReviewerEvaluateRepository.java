package com.articlesproject.core.reviewer.repository;

import com.articlesproject.core.reviewer.model.request.EvaluateRequest;
import com.articlesproject.core.reviewer.model.response.EvaluateResponse;
import com.articlesproject.repository.EvalueteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewerEvaluateRepository extends EvalueteRepository {

    @Query(value = """
            SELECT ar.id, ar.title, ar.created_date, ar.browse_date,ar.users_id, us.img, us.name, ar.evaluate_date, ar.status, ar.descriptive,  COUNT(tyms.article_id) AS 'tym'
                , GROUP_CONCAT(ha.title ORDER BY ha.title SEPARATOR ', ') AS 'hashtags'
                FROM articles ar
                LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
                LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
                LEFT JOIN articles_album aral ON aral.articles_id = ar.id
                LEFT JOIN tyms ON tyms.article_id = ar.id
                LEFT JOIN users us ON us.id = ar.users_id
                LEFT JOIN category ca ON ca.id = ar.category_id
                WHERE ar.evaluate_date is null 
                AND (ar.status = 2 OR ar.status = 3)
                AND ( :#{#request.startDate} = 0
                OR ar.created_date >= :#{#request.startDate} )
                AND ( :#{#request.endDate} = 0
                OR ar.created_date <= :#{#request.endDate} )
                GROUP BY  ar.id, ar.title, ar.created_date, ar.browse_date,  aral.articles_id, ar.users_id, us.name, ar.evaluate_date,ar.status, ar.descriptive
                ORDER BY IF(:#{#request.sortOrder} = 'newest', ar.created_date, NULL) ASC, IF(:#{#request.sortOrder} = 'oldest', ar.created_date, NULL) DESC;
            """, countQuery = """
                SELECT ar.id, ar.title, ar.created_date, ar.browse_date,ar.users_id, us.img, us.name, ar.evaluate_date,  COUNT(tyms.article_id) AS 'tym'
                    , GROUP_CONCAT(ha.title ORDER BY ha.title SEPARATOR ', ') AS 'hashtags'
                    FROM articles ar
                    LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
                    LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
                    LEFT JOIN articles_album aral ON aral.articles_id = ar.id
                    LEFT JOIN tyms ON tyms.article_id = ar.id
                    LEFT JOIN users us ON us.id = ar.users_id
                    LEFT JOIN category ca ON ca.id = ar.category_id
                    WHERE ar.evaluate_date is null 
                    AND (ar.status = 2 OR ar.status = 3)
                    AND ( :#{#request.startDate} = 0
                    OR ar.created_date >= :#{#request.startDate} )
                    AND ( :#{#request.endDate} = 0
                    OR ar.created_date <= :#{#request.endDate} )
                    GROUP BY  ar.id, ar.title, ar.created_date, ar.browse_date,  aral.articles_id, ar.users_id, us.name, ar.evaluate_date,ar.status, ar.descriptive
                    ORDER BY IF(:#{#request.sortOrder} = 'newest', ar.created_date, NULL) ASC, IF(:#{#request.sortOrder} = 'oldest', ar.created_date, NULL) DESC;
            """, nativeQuery = true)
    Page<EvaluateResponse> getAllArticleNotEvaluate(Pageable pageable, @Param("request") EvaluateRequest request);

    @Query(value = """
            SELECT ev.id, ev.content, ev.created_date, ev.star, us.name AS userName, us.img AS userImg FROM  evaluate ev
            LEFT JOIN users us ON us.id = ev.users_id
            WHERE ev.users_id = :userId
            ORDER BY ev.created_date DESC
            """, nativeQuery = true)
    List<EvaluateResponse> getAllEvaluateByUserId(@Param("userId") String userId);

    @Query(value = """
            SELECT ar.id, ar.title, ar.created_date, ar.browse_date, ar.status,ar.users_id, us.img, us.name, ar.descriptive,  COUNT(tyms.article_id) AS 'tym'
            , GROUP_CONCAT(ha.title ORDER BY ha.title SEPARATOR ', ') AS 'hashtags'
             FROM articles ar
             LEFT JOIN articles_hashtag  arha ON ar.id = arha.articles_id
             LEFT JOIN hashtag ha ON ha.id = arha.hashtag_id
             LEFT JOIN articles_album aral ON aral.articles_id = ar.id
             LEFT JOIN tyms ON tyms.article_id = ar.id
             LEFT JOIN users us ON us.id = ar.users_id
             LEFT JOIN category ca ON ca.id = ar.category_id
             WHERE  ar.id = :id
             GROUP BY  ar.id, ar.title, ar.created_date, ar.browse_date, ar.status,  aral.articles_id, ar.users_id, us.name, ar.descriptive
            """, nativeQuery = true)
    Optional<EvaluateResponse> findArticleById(@Param("id") String id);
}
