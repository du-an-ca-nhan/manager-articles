package com.articlesproject.core.censor.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CensorArticleRequest extends PageableRequest {

    private String sortOrder;

    private long startDate;

    private long endDate;

}
