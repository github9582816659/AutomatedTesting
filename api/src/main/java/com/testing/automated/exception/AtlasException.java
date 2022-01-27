package com.testing.automated.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AtlasException extends RuntimeException {

    public AtlasException(String message) {
        super(message);
    }
}
