package com.testing.automated.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResponse {

    private String pageId;
    private String pageMappingId;
    private String projectId;
    private String releaseId;
    private String pageName;
    private String pageDescription;
    private String pageType;
    @JsonProperty(value="isFrame")
    private Boolean isFrame;
    private String referenceType;
    private String referenceValue;
    private List<String> tags;
}
