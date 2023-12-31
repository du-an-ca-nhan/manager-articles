package com.articlesproject.infrastructure.configuration;

import com.articlesproject.entity.Articles;
import com.articlesproject.repository.ArticlesRepository;
import com.articlesproject.repository.ArticlesAlbumRepository;
import com.articlesproject.repository.ArticlesHashtagRepository;
import com.articlesproject.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;

@Configuration
@EnableScheduling
@Scope(proxyMode = ScopedProxyMode.INTERFACES)
@Transactional
public class deleteArticleConfiguration {

    @Autowired
    @Qualifier("BaseArticlesHashtagRepository")
    private ArticlesHashtagRepository articlesHashtagRepository;

    @Autowired
    @Qualifier("BaseArticlesAlbumRepository")
    private ArticlesAlbumRepository articlesAlbumRepository;

    @Autowired
    @Qualifier("BaseArticlesRepository")
    private ArticlesRepository articlesRepository;

    @Autowired
    @Qualifier("BaseCommentRepository")
    private CommentRepository commentRepository;

    @Scheduled(cron = "0 0 3 * * ?")
    public void scheduledFixedDelayTask(){
       List<Articles> getList = articlesRepository.getAllArticleTrashService();
       getList.stream().forEach(item ->{
           String currentDirectory1 = System.getProperty("user.dir");
           String folderName = item.getId();
           String folderPath = currentDirectory1 + "/articles-project/src/main/resources/templates/articles/" + folderName;
           File folder = new File(folderPath);
           File[] contents = folder.listFiles();
           if (contents != null) {
               for (File file : contents) {
                   file.delete();
               }
           }
           folder.delete();
           articlesAlbumRepository.deleteByArticlesId(item.getId());
           articlesHashtagRepository.deleteByArticlesId(item.getId());
           commentRepository.deleteByArticlesId(item.getId());
           articlesRepository.deleteById(item.getId());
       });
    }
}
