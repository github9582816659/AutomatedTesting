package com.testing.automated.api;

import com.testing.automated.dto.component.ComponentRequestDTO;
import com.testing.automated.dto.component.ComponentResponseDTO;
import com.testing.automated.service.ComponentService;
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
@RequestMapping("/components")
@Slf4j
public class ComponentApi {

    private final ComponentService componentService;

    public ComponentApi(ComponentService componentService) {
        this.componentService = componentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComponentResponseDTO> findComponentById(@PathVariable String id) {
        log.info("ComponentApi findPageById with ID {} ", id);
        return new ResponseEntity<>(componentService.findComponentById(id), HttpStatus.OK);
    }

    @GetMapping("/pages/{id}")
    public ResponseEntity<List<ComponentResponseDTO>> findComponentByPageId(@PathVariable String id) {
        log.info("ComponentApi findComponentByPageId with ID {} ", id);
        return new ResponseEntity<>(componentService.findComponentByPageId(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ComponentResponseDTO>> findAllComponents() {
        log.info("ComponentApi findAllComponents ");
        return new ResponseEntity<>(componentService.findAllComponents(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ComponentResponseDTO> saveComponent(@Valid @RequestBody ComponentRequestDTO componentRequest) {
        log.info("ComponentApi saveComponent ");
        return new ResponseEntity<>(componentService.saveComponent(componentRequest), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComponentResponseDTO> updateComponent(@PathVariable String id, @RequestBody ComponentRequestDTO componentRequest) {
        log.info("ComponentApi updateComponent with ID {} ", id);
        return new ResponseEntity<>(componentService.updateComponent(id, componentRequest), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteComponentById(@PathVariable String id) {
        log.info("ComponentApi deleteComponentById with ID {} ", id);
        componentService.deleteComponentById(id);
        Map<String, String> result = new HashMap<>();
        result.put("componentId", id);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
