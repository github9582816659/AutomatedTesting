package com.testing.automated.dto.page;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RepositoryComponentDTO {

    private String componentId;
    private String componentName;
}
