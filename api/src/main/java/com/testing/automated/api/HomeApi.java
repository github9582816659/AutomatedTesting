package com.testing.automated.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


/**
 *  Author : Rahul Choudhary
 *
 *  Just for Testing
 *
 */

@RestController
@RequestMapping("/home")
public class HomeApi {

    @GetMapping
    public ResponseEntity<Map<String,String>> getHome() {
        HashMap<String,String> result = new HashMap<>();
        result.put("Status", "API is UP & Running!");
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
