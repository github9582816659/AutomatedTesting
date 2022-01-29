package com.testing.automated.entity;

import lombok.*;
import javax.persistence.Embeddable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class ComponentValueProperty {

    private String componentValue;
}
