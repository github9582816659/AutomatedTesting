package com.testing.automated.service;

import com.testing.automated.dto.component.ComponentRequestDTO;
import com.testing.automated.dto.component.ComponentResponseDTO;

import java.util.List;

public interface ComponentService {

    ComponentResponseDTO findComponentById(String id);
    List<ComponentResponseDTO> findAllComponents();
    ComponentResponseDTO saveComponent(ComponentRequestDTO componentRequest);
    ComponentResponseDTO updateComponent(String id, ComponentRequestDTO componentRequest);
    void deleteComponentById(String id);
    List<ComponentResponseDTO> findComponentByPageId(String id);
}
