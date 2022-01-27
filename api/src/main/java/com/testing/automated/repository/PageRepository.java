package com.testing.automated.repository;

import com.testing.automated.entity.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PageRepository extends MongoRepository<Page,String> {
}
