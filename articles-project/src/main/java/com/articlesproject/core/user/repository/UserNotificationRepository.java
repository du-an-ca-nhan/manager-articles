package com.articlesproject.core.user.repository;

import com.articlesproject.core.user.model.request.UserNotificationRequest;
import com.articlesproject.core.user.model.response.UserNotificationResponse;
import com.articlesproject.repository.NotificationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserNotificationRepository extends NotificationRepository {
    @Query(value = """
            SELECT n.id, n.content_activity, n.status, n.type, n.created_date, n.articles_id 
                FROM notification n JOIN articles a on a.id = n.articles_id
                WHERE a.users_id = :usersId 
                AND ( :#{#request.contentActivity} IS NULL 
                        OR :#{#request.contentActivity} LIKE ''
                    )
                ORDER BY n.created_date DESC
            """, countQuery = """
            SELECT n.id, n.content_activity, n.status, n.type, n.created_date, n.articles_id 
                FROM notification n join articles a on a.id = n.articles_id
                WHERE a.users_id = :usersId
                AND ( :#{#request.contentActivity} IS NULL 
                        OR :#{#request.contentActivity} LIKE ''
                    )
                ORDER BY n.created_date DESC
                    """, nativeQuery = true)
    Page<UserNotificationResponse> getAllNotification(Pageable pageable, @Param("usersId") String usersId, @Param("request") UserNotificationRequest request);

    @Query(value = """
            SELECT count(*) as 'thong_bao' FROM notification n JOIN articles a on a.id = n.articles_id
                WHERE a.users_id = :usersId AND n.status = 0;
            """, nativeQuery = true)
    int countNotification(@Param("usersId") String usersId);
}
