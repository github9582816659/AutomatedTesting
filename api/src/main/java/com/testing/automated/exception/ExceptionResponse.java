package com.testing.automated.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.testing.automated.util.DateUtil;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
public class ExceptionResponse {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    private Date timestamp;
    private int code;
    private String status;
    private String message;
    private String details;

    public ExceptionResponse( HttpStatus httpStatus, String message, String details) {
        this();
        this.timestamp = DateUtil.getCurrentDateTime();
        this.code = httpStatus.value();
        this.status = httpStatus.name();
        this.message = message;
        this.details = details;
    }
}
