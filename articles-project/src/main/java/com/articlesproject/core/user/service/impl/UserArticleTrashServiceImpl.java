package com.articlesproject.core.user.service.impl;

import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.core.user.model.request.UserArticleTrashRequest;
import com.articlesproject.core.user.model.response.UserArticleTrashResponse;
import com.articlesproject.core.user.repository.UserArticleAlbumRepository;
import com.articlesproject.core.user.repository.UserArticleHashtagRepository;
import com.articlesproject.core.user.repository.UserArticleTrashRepository;
import com.articlesproject.core.user.repository.UserCommentRepository;
import com.articlesproject.core.user.repository.UserRepository;
import com.articlesproject.core.user.service.UserArticleTrashService;
import com.articlesproject.entity.Articles;
import com.articlesproject.entity.ArticlesHashtag;
import com.articlesproject.entity.Users;
import com.articlesproject.infrastructure.constant.ArticleStatus;
import com.articlesproject.infrastructure.constant.Message;
import com.articlesproject.infrastructure.exception.rest.RestApiException;
import com.articlesproject.util.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class UserArticleTrashServiceImpl implements UserArticleTrashService {

    @Autowired
    private UserArticleTrashRepository userArticleTrashRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserArticleAlbumRepository articleAlbumRepository;

    @Autowired
    private UserArticleHashtagRepository articleHashtagRepository;

    @Autowired
    private UserCommentRepository commentRepository;

    private final FormUtils formUtils = new FormUtils();


    @Override
    public PageableObject<UserArticleTrashResponse> getAllArticleTrash(final UserArticleTrashRequest request, String idUser) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<UserArticleTrashResponse> res = userArticleTrashRepository.getAllArticleTrash(pageable, idUser);
        return new PageableObject<>(res);
    }

//    @Override
//    public boolean deleteArticle(String id) {
//        Optional<Articles> articles = userArticleTrashRepository.findById(id);
//        if (!articles.isPresent()) {
//            throw new RestApiException(Message.ERROR_UNKNOWN);
//        }
//        articleAlbumRepository.deleteByArticlesId(id);
//        articleHashtagRepository.deleteByArticlesId(id);
//        commentRepository.deleteByArticlesId(id);
//        userArticleTrashRepository.deleteById(id);
//        return false;
//    }

    @Override
    public boolean deleteArticle(String id) {
        Optional<Articles> articles = userArticleTrashRepository.findById(id);
        if (!articles.isPresent()) {
            throw new RestApiException(Message.ARTICLE_NOT_EXIT);
        }
//        List<ArticlesHashtag> currentArticlesHashtags = articleHashtagRepository.findByArticlesId(id);
//        userMyArticleRepository.deleteById(id);
//        currentArticlesHashtags.stream()
//                .forEach(current -> articleHashtagRepository.delete(current));
        articleAlbumRepository.deleteByArticlesId(id);
        articleHashtagRepository.deleteByArticlesId(id);
        commentRepository.deleteByArticlesId(id);
        userArticleTrashRepository.deleteById(id);
//        String currentDirectory1 = System.getProperty("user.dir");
        Path currentPath = Paths.get("");
        String parentPath = currentPath.toAbsolutePath().toString().substring(0, currentPath.toAbsolutePath().toString().lastIndexOf("\\"));
        String folderName = articles.get().getId();
        String folderPath = parentPath + "/articles-project/src/main/resources/templates/articles/" + folderName;
        File folder = new File(folderPath);
        File[] contents = folder.listFiles();
        if (contents != null) {
            for (File file : contents) {
                System.out.println("Xóa ok");
                file.delete();
            }
        }
        System.out.println("Có vào đây nè");
        folder.delete();
        return true;
    }

    @Override
    public boolean deleteAllArticleByIdIn(String[] id) {
        articleAlbumRepository.deleteAllByArticlesIdIn(id);
        articleHashtagRepository.deleteAllByArticlesIdIn(id);
        commentRepository.deleteAllByArticlesIdIn(id);
        userArticleTrashRepository.deleteAllByIdIn(id);
        Arrays.stream(id).forEach(item -> {
            String currentDirectory1 = System.getProperty("user.dir");
            String folderPath = currentDirectory1 + "/articles-project/src/main/resources/templates/articles/" + item;
            File folder = new File(folderPath);
            File[] contents = folder.listFiles();
            if (contents != null) {
                for (File file : contents) {
                    file.delete();
                }
            }
            folder.delete();
        });
        return true;
    }

    @Override
    public Articles restoreArticle(String id) {
        Optional<Articles> articles = userArticleTrashRepository.findById(id);
        if (!articles.isPresent()) {
            throw new RestApiException(Message.ERROR_UNKNOWN);
        }
        articles.get().setStatus(ArticleStatus.DA_PHE_DUYET);
        return userArticleTrashRepository.save(articles.get());
    }
}
