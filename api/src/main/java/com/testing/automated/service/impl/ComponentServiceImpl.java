package com.testing.automated.service.impl;

import com.testing.automated.dto.component.ComponentRequestDTO;
import com.testing.automated.dto.component.ComponentResponseDTO;
import com.testing.automated.dto.component.ComponentValuePropertyDTO;
import com.testing.automated.entity.Component;
import com.testing.automated.entity.ComponentValueProperty;
import com.testing.automated.exception.AtlasException;
import com.testing.automated.exception.ResourceNotFoundException;
import com.testing.automated.repository.ComponentRepository;
import com.testing.automated.service.ComponentService;
import com.testing.automated.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ComponentServiceImpl implements ComponentService {

    private final ComponentRepository componentRepository;

    public ComponentServiceImpl(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    @Override
    public ComponentResponseDTO findComponentById(String id) {
        log.info("ComponentService findComponentById with ID {}",id);
        try {
            Optional<Component> byId = componentRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Component not found with ID: " + id);
            }
            return getComponentDto(byId.get());
        } catch (ResourceNotFoundException ex) {
            log.error("Component not found with ID: {} {} ", id, ex);
            throw new ResourceNotFoundException("Component not found with ID: " + id);
        } catch (Exception ex) {
            log.error("Atlas Exception while finding component with ID: {} {} /n", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public List<ComponentResponseDTO> findComponentByPageId(String id) {
        log.info("ComponentService findComponentByPageId with ID {}",id);
        try {
            List<Component> byPageId = componentRepository.findByPageId(new ObjectId(id));
            if (byPageId.isEmpty()) {
                throw new ResourceNotFoundException("Components not found with Page ID: " + id);
            }
            List<ComponentResponseDTO> componentList = new ArrayList<>();
            for (Component component: byPageId) {
                componentList.add(getComponentDto(component));
            }
            return componentList;
        } catch (ResourceNotFoundException ex) {
            log.error("Components not found with Page ID: {} {} ", id, ex);
            throw new ResourceNotFoundException("Component not found with Page ID: " + id);
        } catch (Exception ex) {
            log.error("Atlas Exception while finding component with Page ID: {} {} /n", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public List<ComponentResponseDTO> findAllComponents() {
        log.info("ComponentService findAllComponents");
        try {
            List<ComponentResponseDTO> pageList = new ArrayList<>();
            List<Component> all = componentRepository.findAll();
            if (all != null && !all.isEmpty()) {
                for (Component component: all) {
                    pageList.add(getComponentDto(component));
                }
            }
            return pageList;
        } catch (Exception ex) {
            log.error("Atlas Exception while find all components ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public ComponentResponseDTO saveComponent(ComponentRequestDTO componentRequest) {
        log.info("ComponentService saveComponent");
        try {
//            Component newComponent = Component.builder()
//                    .projectId(new ObjectId(componentRequest.getProjectId()))
//                    .releaseId(new ObjectId(componentRequest.getReleaseId()))
//                    .pageId(new ObjectId(componentRequest.getPageId()))
//                    .pageName(componentRequest.getPageName())
//                    .componentName(componentRequest.getComponentName())
//                    .componentDescription(componentRequest.getComponentDescription())
//                    .componentValueType(componentRequest.getComponentValueType())
//                    .componentValueProperty(ComponentValueProperty.builder().componentValue(componentRequest.getComponentValueProperty().getComponentValue()).build())
//                    .isIntractable(componentRequest.getIsIntractable())
//                    .referenceType(componentRequest.getReferenceType())
//                    .referenceValue(componentRequest.getReferenceValue())
//                    .tags(componentRequest.getTags())
//                    .build();

            Component savedComponent = componentRepository.save(getComponentEntity(componentRequest));
            return getComponentDto(savedComponent);
        } catch (Exception ex) {
            log.error("Atlas Exception while saving component ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public ComponentResponseDTO updateComponent(String id, ComponentRequestDTO componentRequest) {
        log.info("ComponentService updateComponent with ID {}",id);
        try {
            Optional<Component> byId = componentRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Page not found with ID: " + id);
            }

//            Component component = byId.get();
//            component.setProjectId(new ObjectId(componentRequest.getProjectId()));
//            component.setReleaseId(new ObjectId(componentRequest.getReleaseId());
//            component.setPageId(new ObjectId(componentRequest.getPageId()));
//            component.setPageName(componentRequest.getPageName());
//            component.setComponentName(componentRequest.getComponentName());
//            component.setComponentDescription(componentRequest.getComponentDescription());
//            component.setComponentValueType(componentRequest.getComponentValueType());
//            component.setComponentValueProperty(ComponentValueProperty.builder().componentValue(componentRequest.getComponentValueProperty().getComponentValue()).build());
//            component.setIsIntractable(componentRequest.getIsIntractable());
//            component.setReferenceType(componentRequest.getReferenceType());
//            component.setReferenceValue(componentRequest.getReferenceValue());
//            component.setTags(componentRequest.getTags());

            Component update = componentRepository.save(getComponentEntity(componentRequest));

            return getComponentDto(update);


        } catch (Exception ex) {
            log.error("Atlas Exception while updating component with ID {} {}", id , ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public void deleteComponentById(String id) {
        log.info("ComponentService deleteComponentById with ID {}",id);
        try {
            Optional<Component> byId = componentRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Component not found with ID: " + id);
            }

            componentRepository.delete(byId.get());
        } catch (Exception ex) {
            log.error("Atlas Exception while deleting component with ID {} {}", id , ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }

    }

    private ComponentResponseDTO getComponentDto(Component component) {
        return ComponentResponseDTO.builder()
                .componentId(String.valueOf(component.getComponentId()))
                .projectId(String.valueOf(component.getProjectId()))
                .releaseId(String.valueOf(component.getReleaseId()))
                .pageId(String.valueOf(component.getPageId()))
                .pageName(component.getPageName())
                .componentName(component.getComponentName())
                .componentDescription(component.getComponentDescription())
                .componentValueType(component.getComponentValueType())
                .componentValueProperty(ComponentValuePropertyDTO.builder().componentValue(component.getComponentValueProperty().getComponentValue()).build())
                .isIntractable(component.getIsIntractable())
                .referenceType(component.getReferenceType())
                .referenceValue(component.getReferenceValue())
                .tags(component.getTags())
                .build();
    }

    private Component getComponentEntity(ComponentRequestDTO componentRequest) {
        return Component.builder()
                .componentId(componentRequest.getComponentId() != null ? new ObjectId(componentRequest.getComponentId()) : null)
                .projectId(new ObjectId(componentRequest.getProjectId()))
                .releaseId(new ObjectId(componentRequest.getReleaseId()))
                .pageId(new ObjectId(componentRequest.getPageId()))
                .pageName(componentRequest.getPageName())
                .componentName(componentRequest.getComponentName())
                .componentDescription(componentRequest.getComponentDescription())
                .componentValueType(componentRequest.getComponentValueType())
                .componentValueProperty(ComponentValueProperty.builder().componentValue(componentRequest.getComponentValueProperty().getComponentValue()).build())
                .isIntractable(componentRequest.getIsIntractable())
                .referenceType(componentRequest.getReferenceType())
                .referenceValue(componentRequest.getReferenceValue())
                .tags(componentRequest.getTags())
                .build();
    }

}
