package com.testing.automated.dto.page;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RepositoryPagesDTO {

    private String pageId;
    private String pageName;
    private List<RepositoryComponentDTO> components;
}
