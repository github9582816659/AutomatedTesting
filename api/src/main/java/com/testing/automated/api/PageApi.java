package com.testing.automated.api;

import com.testing.automated.dto.PageResponse;
import com.testing.automated.dto.PageRequest;
import com.testing.automated.service.PageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public ResponseEntity<PageResponse> findPageById(@PathVariable String id) {
        log.info("PageApi findPageById with ID {} ", id);
        return new ResponseEntity<>(pageService.findPageById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PageResponse>> findAllPages() {
        log.info("PageApi findAllPages ");
        return new ResponseEntity<>(pageService.findAllPages(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PageResponse> savePage(@Valid @RequestBody PageRequest pageRequest) {
        log.info("PageApi savePage ");
        return new ResponseEntity<>(pageService.savePage(pageRequest), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PageResponse> updatePage(@PathVariable String id, @RequestBody PageRequest pageRequest) {
        log.info("PageApi updatePage with ID {} ", id);
        return new ResponseEntity<>(pageService.updatePage(id, pageRequest), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePageById(@PathVariable String id) {
        log.info("PageApi deletePageById with ID {} ", id);
        pageService.deletePageById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
