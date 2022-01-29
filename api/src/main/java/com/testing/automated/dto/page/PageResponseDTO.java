package com.testing.automated.dto.page;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResponseDTO {

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
