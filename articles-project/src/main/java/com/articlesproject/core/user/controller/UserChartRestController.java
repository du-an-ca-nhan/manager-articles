package com.articlesproject.core.user.controller;

import com.articlesproject.core.common.base.ResponseObject;
import com.articlesproject.core.user.service.UserChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/chart")
public class UserChartRestController {
    @Value("${app.UserId}")
    private String id;

    @Autowired
    private UserChartService chartService;

    @GetMapping("/tym")
    private ResponseObject getAllArticleFavorite() {
        String userId = id;
        return new ResponseObject(chartService.getAllArticleFavorite(userId));
    }

    @GetMapping("/comment")
    private ResponseObject getAllArticleComment() {
        String userId = id;
        return new ResponseObject(chartService.getAllArticleComment(userId));
    }
    @GetMapping("/status")
    private ResponseObject getAllArticleStatus() {
        String userId = id;
        return new ResponseObject(chartService.getAllArticleStatus(userId));
    }

    @GetMapping("/history")
    private ResponseObject findAllUsersWhoSeeArticleAnyone() {
        String userId = id;
        return new ResponseObject(chartService.findAllUsersWhoSeeArticleAnyone(userId));
    }

    @GetMapping("/article")
    private ResponseObject findAllNumberArticleByDayInMonth() {
        String userId = id;
        return new ResponseObject(chartService.findAllNumberArticleByDayInMonth(userId));
    }

}
