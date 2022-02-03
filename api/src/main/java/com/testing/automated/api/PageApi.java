package com.testing.automated.api;

import com.testing.automated.dto.page.PageResponseDTO;
import com.testing.automated.dto.page.PageRequestDTO;
import com.testing.automated.dto.page.RepositoryResponseDTO;
import com.testing.automated.service.PageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *  Author : Rahul Choudhary
 *
 *  PageAPI
 *
 */

@RestController
@RequestMapping("/pages")
@Slf4j
public class PageApi {

    private final PageService pageService;

    public PageApi(PageService pageService) {
        this.pageService = pageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PageResponseDTO> findPageById(@PathVariable String id) {
        log.info("PageApi findPageById with ID {} ", id);
        return new ResponseEntity<>(pageService.findPageById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PageResponseDTO>> findAllPages() {
        log.info("PageApi findAllPages ");
        return new ResponseEntity<>(pageService.findAllPages(), HttpStatus.OK);
    }

    @GetMapping("/components/all")
    public ResponseEntity<RepositoryResponseDTO> findAllPagesAndComponents() {
        log.info("PageApi findAllPagesAndComponents ");
        return new ResponseEntity<>(pageService.findAllPagesAndComponents(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PageResponseDTO> savePage(@Valid @RequestBody PageRequestDTO pageRequest) {
        log.info("PageApi savePage ");
        return new ResponseEntity<>(pageService.savePage(pageRequest), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PageResponseDTO> updatePage(@PathVariable String id, @RequestBody PageRequestDTO pageRequest) {
        log.info("PageApi updatePage with ID {} ", id);
        return new ResponseEntity<>(pageService.updatePage(id, pageRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePageById(@PathVariable String id) {
        log.info("PageApi deletePageById with ID {} ", id);
        pageService.deletePageById(id);
        Map<String, String> result = new HashMap<>();
        result.put("pageId", id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }


}
