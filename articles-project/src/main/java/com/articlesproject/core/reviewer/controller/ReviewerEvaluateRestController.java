package com.articlesproject.core.reviewer.controller;

import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.reviewer.model.request.CreateEvaluateRequest;
import com.articlesproject.core.reviewer.model.request.EvaluateRequest;
import com.articlesproject.core.reviewer.service.ReviewerEvaluateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/reviewer/article")
public class ReviewerEvaluateRestController {

    @Value("${app.UserId}") private String id;

    @Autowired
    private ReviewerEvaluateService evaluateService;

    @GetMapping("")
    private ResponseObject getAllArticleNotEvaluate(final EvaluateRequest request){
        System.out.println(request.getSortOrder());
        return new ResponseObject(evaluateService.getAllArticleNotEvaluate(request));
    }

    @PostMapping("/evaluate")
    private ResponseObject createEvaluate(@RequestBody CreateEvaluateRequest request){
        String userId = id;
        return new ResponseObject(evaluateService.create(request, userId));
    }

    @GetMapping("/{id}")
    public ResponseObject findArticleById(@PathVariable("id") String id){
        return new ResponseObject(evaluateService.findArticleById(id));
    }
}
