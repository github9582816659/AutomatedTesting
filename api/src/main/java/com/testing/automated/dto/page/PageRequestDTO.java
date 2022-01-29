package com.testing.automated.dto.page;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageRequestDTO {

    private String pageId;
    private String pageMappingId;
    @NotBlank(message = "Project ID should not be blank")
    private String projectId;
    @NotBlank(message = "Release ID should not be blank")
    private String releaseId;
    @NotBlank(message = "Page Name should not be blank")
    private String pageName;
    private String pageDescription;
    private String pageType;
    @JsonProperty(value="isFrame")
    private Boolean isFrame;
    private String referenceType;
    private String referenceValue;
    private List<String> tags;
    private String createdBy;
    private String updatedBy;
}
