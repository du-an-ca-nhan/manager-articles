package com.articlesproject.entity;

import com.articlesproject.entity.base.PrimaryEntity;
import com.articlesproject.infrastructure.constant.EntityProperties;
import lombok.*;
import org.hibernate.annotations.Nationalized;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "point")
public class Point extends PrimaryEntity{

    @Nationalized
    @Column(length = EntityProperties.LENGTH_CODE, nullable = false)
    private Integer point;

    @Column(nullable = false)
    private Long createAt;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_DESCRIPTION, nullable = false)
    private String feedback;

    @Column(length = EntityProperties.LENGTH_ID)
    private String articlesId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String usersId;
}
