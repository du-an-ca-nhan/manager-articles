package com.articlesproject.core.user.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class UserCreateArticleRequest {

    @NotEmpty(message = "Title không được để trống")
    @Size(min = 6, max = 250)
    private String title;

    @NotEmpty(message = "Content không được để trống")
    private String content;

    @NotEmpty(message = "Descriptive không được để trống")
    @Size(min = 6, max = 2147483647)
    private String descriptive;

    @NotEmpty(message = "Hashtag không được để trống")
    private String[] hashtag;
}
