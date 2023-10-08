package com.articlesproject.core.reviewer.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;

@Getter
@Setter
public class EvaluateRequest extends PageableRequest {
    private String sortOrder;

    private long startDate;

    private long endDate;
}
