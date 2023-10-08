package com.articlesproject.core.user.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Arrays;

@Getter
@Setter
@ToString
public final class UserFindArticleRequest extends PageableRequest {

    private String title;

    private String[] hashtag;

    private String category;

    private String[] categoryId;

    public String converHashTag;

    public String converCategoryId;
}
