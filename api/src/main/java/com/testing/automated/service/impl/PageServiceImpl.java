package com.testing.automated.service.impl;

import com.testing.automated.dto.page.*;
import com.testing.automated.entity.Component;
import com.testing.automated.entity.Page;
import com.testing.automated.exception.AtlasException;
import com.testing.automated.exception.ResourceNotFoundException;
import com.testing.automated.repository.ComponentRepository;
import com.testing.automated.repository.PageRepository;
import com.testing.automated.service.PageService;
import com.testing.automated.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;
    private final ComponentRepository componentRepository;

    public PageServiceImpl(PageRepository pageRepository, ComponentRepository componentRepository) {
        this.pageRepository = pageRepository;
        this.componentRepository = componentRepository;
    }

    @Override
    public PageResponseDTO findPageById(String id) {
        log.info("[PageService.findPageById] findPageById with ID {}", id);
        try {
            Page page = pageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Page not found with ID: " + id));
            return getPageDto(page);
        } catch (ResourceNotFoundException ex) {
            log.error("ResourceNotFoundException Page not found with ID: {} {} ", id, ex);
            throw new ResourceNotFoundException("Page not found with ID: " + id);
        } catch (AtlasException ex) {
            log.error("AtlasException while finding page with ID: {} {} /n", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public RepositoryResponseDTO findAllPagesAndComponents() {
        log.info("[PageService.findAllPagesAndComponents] findAllPagesAndComponents ");
        try {
            List<Page> all = pageRepository.findAll();
            if (all.isEmpty()) {
                throw new ResourceNotFoundException("Pages & Component not found");
            }

            List<RepositoryPagesDTO> pagesList = new ArrayList<>();
            for (Page page : all) {

                RepositoryPagesDTO pages = RepositoryPagesDTO.builder()
                        .pageId(String.valueOf(page.getPageId()))
                        .pageName(page.getPageName())
                        .build();

                List<Component> byPageId = componentRepository.findByPageId(page.getPageId());
                List<RepositoryComponentDTO> componentList = new ArrayList<>();
                if (!byPageId.isEmpty()) {
                    for (Component component : byPageId) {
                        componentList.add(RepositoryComponentDTO.builder()
                                .componentId(String.valueOf(component.getComponentId()))
                                .componentName(component.getComponentName())
                                .build());
                    }
                    pages.setComponents(componentList);
                }

                pagesList.add(pages);
            }

            return RepositoryResponseDTO.builder()
                    .repository(pagesList)
                    .build();
        } catch (ResourceNotFoundException ex) {
            log.error("ResourceNotFoundException pages and components not found ", ex);
            throw new ResourceNotFoundException("Pages & Components not found ");
        } catch (AtlasException ex) {
            log.error("AtlasException while finding all pages and components ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public List<PageResponseDTO> findAllPages() {
        log.info("[PageService.findAllPages] findAllPages");
        try {
            List<PageResponseDTO> pageList = new ArrayList<>();
            List<Page> all = pageRepository.findAll();
            if (all != null && !all.isEmpty()) {
                for (Page page : all) {
                    pageList.add(getPageDto(page));
                }
            }
            return pageList;
        } catch (AtlasException ex) {
            log.error("AtlasException while find all pages ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public PageResponseDTO savePage(PageRequestDTO pageRequest) {
        log.info("[PageService.savePage] savePage");
        try {
            Page newPage = Page.builder()
                    .pageId(new ObjectId())
                    .pageMappingId(new ObjectId())
                    .projectId(new ObjectId(pageRequest.getProjectId()))
                    .releaseId(new ObjectId(pageRequest.getReleaseId()))
                    .pageName(pageRequest.getPageName())
                    .pageDescription(pageRequest.getPageDescription() != null ? pageRequest.getPageDescription() : null)
                    .pageType(pageRequest.getPageType() != null ? pageRequest.getPageType() : null)
                    .isFrame(pageRequest.getIsFrame() != null ? pageRequest.getIsFrame() : null)
                    .referenceType(pageRequest.getReferenceType() != null ? pageRequest.getReferenceType() : null)
                    .referenceValue(pageRequest.getReferenceValue() != null ? pageRequest.getReferenceValue() : null)
                    .tags(pageRequest.getTags() != null ? pageRequest.getTags() : null)
                    .build();
            Page savedPage = pageRepository.save(newPage);
            return getPageDto(savedPage);
        } catch (AtlasException ex) {
            log.error("AtlasException while saving page", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public PageResponseDTO updatePage(String id, PageRequestDTO pageRequest) {
        log.info("[PageService.updatePage] updatePage with ID {}", id);
        try {
            Page p = pageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Page not found with ID: " + id));

            Page page = p;
            page.setPageName(pageRequest.getPageName());
            page.setPageDescription(pageRequest.getPageDescription());
            page.setPageType(pageRequest.getPageType());
            page.setIsFrame(pageRequest.getIsFrame());
            page.setReferenceType(pageRequest.getReferenceType());
            page.setReferenceValue(pageRequest.getReferenceValue());
            page.setTags(pageRequest.getTags());

            Page update = pageRepository.save(page);

            return getPageDto(update);


        } catch (ResourceNotFoundException ex) {
            log.error("ResourceNotFoundException Page not found with id {}", id, ex);
            throw new ResourceNotFoundException("Repository not found ");
        } catch (AtlasException ex) {
            log.error("AtlasException while updating page with ID {} {}", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public void deletePageById(String id) {
        log.info("[PageService.deletePageById] deletePageById with ID {}", id);
        try {
            Page page = pageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Page not found with ID: " + id));
            pageRepository.delete(page);
        } catch (ResourceNotFoundException ex) {
            log.error("ResourceNotFoundException Page with id {} not found ",id, ex);
            throw new ResourceNotFoundException("Repository not found ");
        } catch (AtlasException ex) {
            log.error("AtlasException while deleting page with id {} {}", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }

    }

    private Page getPageEntity(PageRequestDTO pageRequest) {
        return Page.builder()
                .pageId(new ObjectId(pageRequest.getPageId()))
                .pageMappingId(new ObjectId(pageRequest.getPageMappingId()))
                .projectId(new ObjectId(pageRequest.getProjectId()))
                .releaseId(new ObjectId(pageRequest.getReleaseId()))
                .pageName(pageRequest.getPageName())
                .pageDescription(pageRequest.getPageDescription() != null ? pageRequest.getPageDescription() : null)
                .pageType(pageRequest.getPageType() != null ? pageRequest.getPageType() : null)
                .isFrame(pageRequest.getIsFrame() != null ? pageRequest.getIsFrame() : null)
                .referenceType(pageRequest.getReferenceType() != null ? pageRequest.getReferenceType() : null)
                .referenceValue(pageRequest.getReferenceValue() != null ? pageRequest.getReferenceValue() : null)
                .tags(pageRequest.getTags() != null ? pageRequest.getTags() : null)
                .build();
    }

    private PageResponseDTO getPageDto(Page page) {
        return PageResponseDTO.builder()
                .pageId(String.valueOf(page.getPageId()))
                .pageMappingId(String.valueOf(page.getPageMappingId()))
                .projectId(String.valueOf(page.getProjectId()))
                .releaseId(String.valueOf(page.getReleaseId()))
                .pageName(page.getPageName())
                .pageDescription(page.getPageDescription())
                .pageType(page.getPageType())
                .isFrame(page.getIsFrame())
                .referenceType(page.getReferenceType())
                .referenceValue(page.getReferenceValue())
                .tags(page.getTags())
                .build();
    }
}
