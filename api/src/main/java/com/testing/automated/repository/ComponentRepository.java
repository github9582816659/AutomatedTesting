package com.testing.automated.repository;

import com.testing.automated.entity.Component;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComponentRepository extends MongoRepository<Component,String> {
    List<Component> findByPageId(ObjectId id);
}
