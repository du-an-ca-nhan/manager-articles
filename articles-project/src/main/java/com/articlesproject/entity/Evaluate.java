package com.articlesproject.entity;


import com.articlesproject.entity.base.PrimaryEntity;
import com.articlesproject.infrastructure.constant.EntityProperties;
import lombok.Data;
import lombok.ToString;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.hibernate.annotations.Nationalized;

@Entity
@Data
@ToString
@Table(name = "evaluate")
public class Evaluate extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private Integer star;

    @Column(length = EntityProperties.LENGTH_DESCRIPTION)
    private String content;

    @Column(length = EntityProperties.LENGTH_ID)
    private String articlesId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String usersId;

}
