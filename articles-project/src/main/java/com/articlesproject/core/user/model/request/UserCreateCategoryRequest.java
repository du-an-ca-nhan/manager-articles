package com.articlesproject.core.user.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateCategoryRequest extends PageableRequest {

    @NotEmpty
    @Size(min = 0, max = 250)
    private String name;
}
