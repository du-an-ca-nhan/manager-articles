package com.articlesproject.core.user.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFindArticleByIdCategoryRequest extends PageableRequest {

    private String categoryId;

}
