package com.articlesproject.entity;

import com.articlesproject.entity.base.PrimaryEntity;
import com.articlesproject.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "notification")
public class Notification extends PrimaryEntity {

    private String replyId;

    @Column(length = 65555)
    private String usersId;

    @Column(length = EntityProperties.LENGTH_ID)
    private String articlesId;

    private boolean status;

    @Nationalized
    @Column(length = EntityProperties.LENGTH_NOI_DUNG)
    private String contentActivity;

    @Column(length = EntityProperties.LENGTH_CODE)
    private Integer type;

}
