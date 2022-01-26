package com.testing.automated.api;

import com.testing.automated.dto.PageResponse;
import com.testing.automated.dto.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *  Author : Rahul Choudhary
 *
 *  PageAPI
 *
 */

@RestController
@RequestMapping("/v1.0/pages")
public class PageApi {

    @GetMapping("/{id}")
    public ResponseEntity<PageResponse> getPage() {
        return null;
    }

    @PostMapping
    public ResponseEntity<PageResponse> savePage() {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<PageResponse> updatePage(@PathVariable String id, @RequestBody PageRequest pageRequest) {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PageResponse> deletePage(@PathVariable String id) {
        return null;
    }
}
