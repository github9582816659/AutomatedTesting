package com.testing.automated.dto.component;

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
public class ComponentResponseDTO {

    private String componentId;
    private String componentMappingId;
    private String projectId;
    private String releaseId;
    private String pageId;
    private String pageName;
    private String componentName;
    private String componentDescription;
    private String componentValueType;
    @JsonProperty(value="isIntractable")
    private Boolean isIntractable;
    private String referenceType;
    private String referenceValue;
    private List<String> tags;
    private ComponentValuePropertyDTO componentValueProperty;

}
