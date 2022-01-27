package com.testing.automated.service.impl;
import com.testing.automated.dto.PageRequest;
import com.testing.automated.dto.PageResponse;
import com.testing.automated.entity.Page;
import com.testing.automated.exception.AtlasException;
import com.testing.automated.exception.ResourceNotFoundException;
import com.testing.automated.repository.PageRepository;
import com.testing.automated.service.PageService;
import com.testing.automated.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

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
    public PageResponse findPageById(String id) {
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
    public List<PageResponse> findAllPages() {
        return null;
    }

    @Override
    public PageResponse savePage(PageRequest pageRequest) {
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
    public PageResponse updatePage(String id, PageRequest pageRequest) {
        return null;
    }

    @Override
    public void deletePageById(String id) {

    }

    private Page getPageEntity(PageRequest pageRequest) {
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

    private PageResponse getPageDto(Page page) {
        return PageResponse.builder()
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
