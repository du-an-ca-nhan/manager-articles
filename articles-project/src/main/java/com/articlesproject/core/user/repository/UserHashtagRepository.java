package com.articlesproject.core.user.repository;

import com.articlesproject.core.user.model.response.UserHashtagResponse;
import com.articlesproject.entity.Hashtag;
import com.articlesproject.repository.HashtagRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserHashtagRepository extends HashtagRepository {

    @Query(value = """
            SELECT  title FROM hashtag
            ORDER BY created_date DESC
            """, nativeQuery = true)
    List<UserHashtagResponse> getAll();

    @Query(value = """
            SELECT  title FROM hashtag ha
            LEFT JOIN articles_hashtag arha ON  ha.id = arha.hashtag_id
            GROUP BY ha.id, title
            ORDER  BY count(arha.hashtag_id) DESC
            LIMIT 5
            """, nativeQuery = true)
    List<UserHashtagResponse> top5HashTag();

    Hashtag findByTitle(String title);
}
