package com.testing.automated.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;

/**
 *  Author : Rahul Choudhary
 *
 *  ToDo : https://medium.com/codex/spring-data-mongodb-auditing-b4a874442a6
 *  We can map this to Security Context Holder
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Audit {

    @CreatedDate
    private Instant createdAt;

    @CreatedBy
    private ObjectId createdBy;

    @LastModifiedBy
    private Instant updatedAt;

    @LastModifiedDate
    private ObjectId updatedBy;
}
