package com.testing.automated.service;

import com.testing.automated.dto.PageRequest;
import com.testing.automated.dto.PageResponse;

import java.util.List;

public interface PageService {

    PageResponse findPageById(String id);
    List<PageResponse> findAllPages();
    PageResponse savePage(PageRequest pageRequest);
    PageResponse updatePage(String id, PageRequest pageRequest);
    void deletePageById(String id);
}
