package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserNotificationRequest;
import com.articlesproject.core.user.model.request.UserUpdateStatusNotificationRequest;
import com.articlesproject.core.user.model.response.UserNotificationResponse;
import com.articlesproject.core.user.repository.UserNotificationRepository;
import com.articlesproject.core.user.service.UserNotificationService;
import com.articlesproject.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserNotificationServiceImpl implements UserNotificationService {

    @Autowired
    private UserNotificationRepository notificationRepository;

    @Override
    public PageableObject<UserNotificationResponse> fillAllNotification(String idUser, UserNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserNotificationResponse> res = notificationRepository.getAllNotification(pageable, idUser, request);
        return new PageableObject<>(res);
    }

    @Override
    public int countNotification(String id) {
        return notificationRepository.countNotification(id);
    }

    @Override
    public Notification updateStatus(String id, UserUpdateStatusNotificationRequest request) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        boolean statusNew = request.getStatus() == 0 ? false : true;
        optionalNotification.get().setStatus(statusNew);
        notificationRepository.save(optionalNotification.get());
        return optionalNotification.get();
    }

    @Override
    public void updateAllStatus(UserUpdateStatusNotificationRequest request) {
        List<Notification> notifications = notificationRepository.findAll();
        boolean statusNew = request.getStatus() == 0 ? false : true;

        for (Notification notification : notifications) {
            notification.setStatus(statusNew);
        }

        notificationRepository.saveAll(notifications);
    }


    @Override
    public Notification getOne(String id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        return optionalNotification.get();
    }

    @Override
    public void deleteNotification(String id) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        notificationRepository.delete(optionalNotification.get());
    }
}
