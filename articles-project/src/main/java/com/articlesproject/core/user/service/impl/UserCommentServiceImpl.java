package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.common.base.UserCommentObject;
import com.articlesproject.core.user.model.request.UserCreateCommentRequest;
import com.articlesproject.core.user.model.request.UserUpdateCommentRequest;
import com.articlesproject.core.user.model.response.UserCommentResponse;
import com.articlesproject.core.user.repository.UUserRepository;
import com.articlesproject.core.user.repository.UserArticleRepository;
import com.articlesproject.core.user.repository.UserCommentRepository;
import com.articlesproject.core.user.repository.UserNotificationRepository;
import com.articlesproject.core.user.service.UserCommentService;
import com.articlesproject.entity.Articles;
import com.articlesproject.entity.Comments;
import com.articlesproject.entity.Notification;
import com.articlesproject.entity.Users;
import com.articlesproject.infrastructure.constant.Message;
import com.articlesproject.infrastructure.exception.rest.RestApiException;
import com.articlesproject.infrastructure.successnotification.ConstantMessageSuccess;
import com.articlesproject.infrastructure.successnotification.SuccessNotificationSender;
import com.articlesproject.util.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserCommentServiceImpl implements UserCommentService {

    @Autowired
    private UserCommentRepository commentRepository;

    @Autowired
    private UUserRepository userRepository;

    @Autowired
    private SuccessNotificationSender successNotificationSender;

    @Autowired
    private UserNotificationRepository notificationRepository;

    @Autowired
    private UserArticleRepository userArticleRepository;

    private FormUtils formUtils = new FormUtils();

    @Override
    public List<UserCommentResponse> findCommentByArticleId(String articleId) {
        return commentRepository.findCommentByArticleId(articleId);
    }

    @Override
    public UserCommentObject create(UserCreateCommentRequest request, String userId, StompHeaderAccessor headerAccessor) {
        Comments comment = formUtils.convertToObject(Comments.class, request);
        comment.setUsersId(userId);
        successNotificationSender.senderNotification(ConstantMessageSuccess.THEM_THANH_CONG, headerAccessor);
        Notification notification = new Notification();
        if(request.getReply() == null){
            Optional<Users> optionalUsers = userRepository.findById(userId);
            Optional<Articles> optionalArticles = userArticleRepository.findById(request.getArticlesId());
            notification.setStatus(false);
            notification.setArticlesId(request.getArticlesId());
            notification.setReplyId(request.getReply());
            notification.setUsersId(userId);
            notification.setContentActivity(optionalUsers.get().getName() + " đã comment bài viết " + optionalArticles.get().getTitle() + " của bạn");
            notification.setType(1);
            notificationRepository.save(notification);
        }else {
            Optional<Users> optionalReplyUsers = userRepository.findById(userId);
            notification.setStatus(false);
            notification.setArticlesId(request.getArticlesId());
            notification.setReplyId(request.getReply());
            notification.setUsersId(userId);
            notification.setContentActivity(optionalReplyUsers.get().getName() + " đã nhắc đến bạn trong một bình luận");
            notification.setType(1);
            notificationRepository.save(notification);
        }
        return UserCommentObject.builder().user(userRepository.findById(userId).get()).comment(commentRepository.save(comment)).build();
    }

    @Override
    public Comments update(UserUpdateCommentRequest request) {
        Optional<Comments> comment = commentRepository.findById(request.getId());
        if(!comment.isPresent()){
            throw new RestApiException(Message.COMMENT_NOT_EXIST);
        }
        comment.get().setContent(request.getContent());
        return commentRepository.save(comment.get());
    }

    @Override
    public boolean delete(String commentId) {
        Optional<Comments> comment = commentRepository.findById(commentId);
        if(!comment.isPresent()){
            throw new RestApiException(Message.COMMENT_NOT_EXIST);
        }
        commentRepository.deleteByReply(commentId);
        commentRepository.deleteById(commentId);
        return true;
    }

}
