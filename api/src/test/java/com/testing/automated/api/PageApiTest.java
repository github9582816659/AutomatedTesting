package com.testing.automated.api;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(HomeApi.class)
class PageApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void findPageById() throws Exception {
    }

    @Test
    void findAllPages() {
    }

    @Test
    void findAllPagesAndComponents() {
    }

    @Test
    void savePage() {
    }

    @Test
    void updatePage() {
    }

    @Test
    void deletePageById() {
    }
}
