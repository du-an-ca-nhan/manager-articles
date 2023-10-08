package com.articlesproject.core.censor.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CensorUpdateStatusArticleRequest {

    @NotEmpty(message = "Id không được để trống")
    private String id;

    @NotEmpty(message = "Feedback không được để trống")
    @Size(min = 6, max = 2147483647, message = "Ít nhất 6 kí tự")
    private String feedback;

    @NotEmpty(message = "Category không được để trống")
    @NotNull(message = "Vui lòng chọn 1 thể loại")
    private String categoryId;


}
