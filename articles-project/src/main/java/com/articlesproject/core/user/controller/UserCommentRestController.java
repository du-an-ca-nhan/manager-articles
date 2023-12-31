package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.UserCreateCommentRequest;
import com.articlesproject.core.user.model.request.UserDesVarArticleIdRequest;
import com.articlesproject.core.user.model.request.UserUpdateCommentRequest;
import com.articlesproject.core.user.service.UserCommentService;
import com.articlesproject.core.user.service.UserNotificationService;
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
@RequestMapping("/api/comment")
public class UserCommentRestController {

    @Value("${app.UserId}") private String id;

    @Autowired
    private UserCommentService commentService;

    @Autowired
    private UserNotificationService userNotificationService;

    @GetMapping("/detail-comment-article/{articleId}")
    private ResponseObject findCommentByArticleId(@PathVariable("articleId") String articleId){
        return  new ResponseObject(commentService.findCommentByArticleId(articleId));
    }

    @MessageMapping("/create-comment/{articleId}")
    @SendTo("/portal-articles/create-comment/{articleId}")
    private ResponseObject createComment(@Valid @RequestBody UserCreateCommentRequest request,
                                         @ModelAttribute UserDesVarArticleIdRequest des,
                                         StompHeaderAccessor headerAccessor){
        String userId = id;
        return new ResponseObject(commentService.create(request, userId, headerAccessor));
    }

    @MessageMapping("/create-notification-user/{userId}")
    @SendTo("/portal-articles/create-notification-user/{userId}")
    private ResponseObject notificationUser( @DestinationVariable String userId){
        return new ResponseObject(userNotificationService.countNotification(userId));
    }

    @PutMapping("/update")
    private ResponseObject updateComment(@Valid @RequestBody UserUpdateCommentRequest request){
        return new ResponseObject(commentService.update(request));
    }

    @DeleteMapping("/delete/{commentId}")
    private ResponseObject deleteComment(@PathVariable("commentId") String commentId){
        return new ResponseObject(commentService.delete(commentId));
    }
}
