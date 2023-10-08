package com.articlesproject.entity;

import com.articlesproject.entity.base.PrimaryEntity;
import com.articlesproject.infrastructure.constant.EntityProperties;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Nationalized;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
@Entity
@Data
@ToString
@Table(name = "comments")
public class Comments extends PrimaryEntity{

    @Nationalized
    @Column(length = EntityProperties.LENGTH_NOI_DUNG , nullable = false)
    private String content;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_NOI_DUNG)
    private String reply;

    @Column(length = EntityProperties.LENGTH_ID)
    private String usersId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String articlesId;

}
