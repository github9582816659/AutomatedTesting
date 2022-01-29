package com.testing.automated.service.impl;
import com.testing.automated.dto.page.PageRequestDTO;
import com.testing.automated.dto.page.PageResponseDTO;
import com.testing.automated.entity.Page;
import com.testing.automated.exception.AtlasException;
import com.testing.automated.exception.ResourceNotFoundException;
import com.testing.automated.repository.PageRepository;
import com.testing.automated.service.PageService;
import com.testing.automated.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;

    public PageServiceImpl(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    @Override
    public PageResponseDTO findPageById(String id) {
        log.info("PageService findPageById with ID {}",id);
        try {
            Optional<Page> byId = pageRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Page not found with ID: " + id);
            }
            return getPageDto(byId.get());
        } catch (ResourceNotFoundException ex) {
            log.error("Page not found with ID: {} {} ", id, ex);
            throw new ResourceNotFoundException("Page not found with ID: " + id);
        } catch (Exception ex) {
            log.error("Atlas Exception while finding page with ID: {} {} /n", id, ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public List<PageResponseDTO> findAllPages() {
        log.info("PageService findAllPages");
        try {
            List<PageResponseDTO> pageList = new ArrayList<>();
            List<Page> all = pageRepository.findAll();
            if (all != null && !all.isEmpty()) {
                for (Page page: all) {
                    pageList.add(getPageDto(page));
                }
            }
            return pageList;
        } catch (Exception ex) {
            log.error("Atlas Exception while find all pages ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public PageResponseDTO savePage(PageRequestDTO pageRequest) {
        log.info("PageService savePage");
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
        } catch (Exception ex) {
            log.error("Atlas Exception while saving page ", ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public PageResponseDTO updatePage(String id, PageRequestDTO pageRequest) {
        log.info("PageService updatePage with ID {}",id);
        try {
            Optional<Page> byId = pageRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Page not found with ID: " + id);
            }

            Page page = byId.get();
            page.setPageName(pageRequest.getPageName());
            page.setPageDescription(pageRequest.getPageDescription());
            page.setPageType(pageRequest.getPageType());
            page.setIsFrame(pageRequest.getIsFrame());
            page.setReferenceType(pageRequest.getReferenceType());
            page.setReferenceValue(pageRequest.getReferenceValue());
            page.setTags(pageRequest.getTags());

            Page update = pageRepository.save(page);

            return getPageDto(update);


        } catch (Exception ex) {
            log.error("Atlas Exception while updating page with ID {} {}", id , ex);
            throw new AtlasException(Constants.ATLAS_ERROR);
        }
    }

    @Override
    public void deletePageById(String id) {
        log.info("PageService deletePageById with ID {}",id);
        try {
            Optional<Page> byId = pageRepository.findById(id);
            if (!byId.isPresent()) {
                throw new ResourceNotFoundException("Page not found with ID: " + id);
            }

            pageRepository.delete(byId.get());
        } catch (Exception ex) {
            log.error("Atlas Exception while deleting page with ID {} {}", id , ex);
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
