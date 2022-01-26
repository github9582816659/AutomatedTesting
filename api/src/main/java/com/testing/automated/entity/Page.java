package com.testing.automated.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

/**
 *  Author : Rahul Choudhary
 *
 *  Page Entity : Page Name is Unique for a Project & Release
 *
 */

@Document(collection = "page")
@Builder(toBuilder = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@CompoundIndexes({
        @CompoundIndex(name = "unique_page_name", def = "{'pageName' : 1, 'projectId' : 1, 'releaseId' : 1}",
                unique = true, sparse = true)
})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Page extends Audit{

    @Id
    private ObjectId pageId;
    private ObjectId pageMappingId;
    private ObjectId projectId;
    private ObjectId releaseId;
    private String pageName;
    private String pageDescription;
    private String pageType;
    private Boolean isFrame;
    private String referenceType;
    private String referenceValue;
    private List<String> tags;

}
