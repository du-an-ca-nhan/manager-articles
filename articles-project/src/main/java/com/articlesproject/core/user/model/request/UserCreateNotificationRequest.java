package com.articlesproject.core.user.model.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateNotificationRequest {

    private String replyId;

    @NotEmpty
    private String articlesId;

    @NotEmpty
    @Size(min = 6)
    private String content;

    private String usersId;

}
