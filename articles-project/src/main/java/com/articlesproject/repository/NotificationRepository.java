package com.articlesproject.repository;

import com.articlesproject.entity.Notification;
import com.articlesproject.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(NotificationRepository.NAME)
public interface NotificationRepository extends JpaRepository<Notification, String> {

    public static final String NAME = "BaseNotificationRepository";

}
