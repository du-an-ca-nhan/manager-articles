package com.articlesproject.core.user.model.request;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserCreateCommentRequest {

    @NotEmpty
    private String articlesId;

    private String reply;

    private String content;

}
