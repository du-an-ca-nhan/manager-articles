package com.articlesproject.core.user.service;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserNotificationRequest;
import com.articlesproject.core.user.model.request.UserUpdateStatusNotificationRequest;
import com.articlesproject.core.user.model.response.UserNotificationResponse;
import com.articlesproject.entity.Notification;

public interface UserNotificationService {
    PageableObject<UserNotificationResponse> fillAllNotification(String idUser, final UserNotificationRequest request);
    int countNotification(String id);

    Notification updateStatus(String id, UserUpdateStatusNotificationRequest notification);

    void updateAllStatus(UserUpdateStatusNotificationRequest request);

    Notification getOne(String id);

    void deleteNotification(String id);
}
