package com.testing.automated.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Embedded;
import java.util.List;

/**
 *  Author : Rahul Choudhary
 *
 *  Page Entity : Page Name is Unique for a Project & Release
 *
 */

@Document(collection = "component")
@CompoundIndexes({
        @CompoundIndex(name = "unique_page_name", def = "{'pageName' : 1, 'projectId' : 1, 'releaseId' : 1}",
                unique = true, sparse = true)
})
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Component {

    @Id
    private ObjectId componentId;
    private ObjectId componentMappingId;
    private ObjectId projectId;
    private ObjectId releaseId;
    private ObjectId pageId;
    private String pageName;
    private String componentName;
    private String componentDescription;
    private String componentValueType;
    private Boolean isIntractable;
    private String referenceType;
    private String referenceValue;
    private List<String> tags;
    @Embedded
    private ComponentValueProperty componentValueProperty;

}
