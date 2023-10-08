package com.articlesproject.core.user.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateStatusNotificationRequest {
    private int status;

    public UserUpdateStatusNotificationRequest() {
    }

    public UserUpdateStatusNotificationRequest(int status) {
        this.status = status;
    }
}
