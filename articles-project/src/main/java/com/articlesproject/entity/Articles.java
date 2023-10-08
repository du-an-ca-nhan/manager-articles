package com.articlesproject.entity;

import com.articlesproject.entity.base.PrimaryEntity;
import com.articlesproject.infrastructure.constant.ArticleStatus;
import com.articlesproject.infrastructure.constant.EntityProperties;
import lombok.*;
import org.hibernate.annotations.Nationalized;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@ToString
@Table(name = "articles")
public class Articles extends PrimaryEntity {

    @Nationalized
    @Column( nullable = false, length = EntityProperties.LENGTH_NOI_DUNG)
    private String title;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_DESCRIPTION)
    private String descriptive;

    @Column(nullable = false)
    private ArticleStatus status;

    @Column()
    private Long browseDate;

    @Column(length = EntityProperties.LENGTH_ID)
    private String categoryId;

    @Column(length = 65555)
    private String usersId;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_DESCRIPTION)
    private String contentApprove;

    @Column()
    private Long evaluateDate;

}

