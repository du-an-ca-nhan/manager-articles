package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.BaseController;
import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.UserNotificationRequest;
import com.articlesproject.core.user.model.request.UserUpdateStatusNotificationRequest;
import com.articlesproject.core.user.service.UserNotificationService;
import com.articlesproject.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
public class UserNotificationRestController extends BaseController {
    @Value("${app.UserId}")
    private String userId;

    @Autowired
    private UserNotificationService userNotificationService;

    @GetMapping("")
    public ResponseObject getAllNotification(final UserNotificationRequest request) {
        return new ResponseObject(userNotificationService.fillAllNotification(userId, request));
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countNotification() {
        int count = userNotificationService.countNotification(userId);
        return ResponseEntity.ok().body(count);
    }

    @PutMapping("/update-status/{id}")
    public ResponseObject updateStatus(@PathVariable("id") String id, @RequestBody UserUpdateStatusNotificationRequest res) {
        return new ResponseObject(userNotificationService.updateStatus(id, res));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(userNotificationService.getOne(id));
    }

    @DeleteMapping("/delete-notification/{id}")
    public void deleteNotification(@PathVariable("id") String id) {
        userNotificationService.deleteNotification(id);
    }

    @PutMapping("/update-all-status")
    public void updateAllStatus(@RequestBody UserUpdateStatusNotificationRequest res) {
        userNotificationService.updateAllStatus(res);
    }
}
