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
@Table(name = "category")
public class Category extends PrimaryEntity{

    @Column(length = EntityProperties.LENGTH_CODE, nullable = false)
    private String code;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_NAME_SHORT)
    private String name;
}
