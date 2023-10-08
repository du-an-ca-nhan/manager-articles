package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.UserCreateTymRequest;
import com.articlesproject.core.user.model.request.UserDesVarArticleIdRequest;
import com.articlesproject.core.user.service.UserNotificationService;
import com.articlesproject.core.user.service.UserTymService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/tym")
public class UserTymRestController {

    @Value("${app.UserId}")
    private String id;

    @Autowired
    private UserTymService tymService;

    @Autowired
    private UserNotificationService userNotificationService;

    @GetMapping("/all-article-favorite")
    private ResponseObject getAllArticleFavorite() {
        String userId = id;
        return new ResponseObject(tymService.getAllArticleFavorite(userId));
    }

    @PostMapping("/favorite-article")
    private ResponseObject favoriteArticle(@Valid @RequestBody UserCreateTymRequest request){
        return new ResponseObject(tymService.favoriteArticle(id, request));
    }

    @MessageMapping("/create-notification-tym-user/{userId}")
    @SendTo("/portal-articles/create-notification-tym-user/{userId}")
    private ResponseObject notificationUser(@DestinationVariable String userId) {
        return new ResponseObject(userNotificationService.countNotification(userId));
    }

    @DeleteMapping("/unfavorite-article/{articleId}")
    private ResponseObject unfavoriteArticle(@PathVariable("articleId") String articleId) {
        return new ResponseObject(tymService.unFavoriteArticle(id, articleId));
    }

    @DeleteMapping("/{ids}")
    private ResponseObject deleteAllTymByIdIn(@PathVariable("ids") String[] ids) {
        return new ResponseObject(tymService.deleteAllTymByIdIn(ids));
    }
}
