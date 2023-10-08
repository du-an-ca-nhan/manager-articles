package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.model.request.UserCreateHashtagRequest;
import com.articlesproject.core.user.service.UserArticleHashtagService;
import com.articlesproject.core.user.service.UserHashtagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/hashtag")
public class UserHashtagRestController {

    @Autowired
    private UserHashtagService hashtagService;

    @Autowired
    private UserArticleHashtagService articleHashtagService;

    @GetMapping
    private ResponseObject getAll(){
        return new ResponseObject(hashtagService.getAll());
    }

    @GetMapping("/top-5")
    private ResponseObject getTop5HashTag(){
        return new ResponseObject(hashtagService.top5HashTag());
    }

    @PostMapping("/create")
    private ResponseObject createHahtag(@RequestBody UserCreateHashtagRequest request){
        return new ResponseObject(hashtagService.createHashtag(request));
    }

}
