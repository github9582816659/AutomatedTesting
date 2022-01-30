package com.testing.automated.service;

import com.testing.automated.dto.page.PageRequestDTO;
import com.testing.automated.dto.page.PageResponseDTO;
import com.testing.automated.dto.page.RepositoryResponseDTO;

import java.util.List;

public interface PageService {

    PageResponseDTO findPageById(String id);
    List<PageResponseDTO> findAllPages();
    PageResponseDTO savePage(PageRequestDTO pageRequest);
    PageResponseDTO updatePage(String id, PageRequestDTO pageRequest);
    void deletePageById(String id);
    RepositoryResponseDTO findAllPagesAndComponents();
}
