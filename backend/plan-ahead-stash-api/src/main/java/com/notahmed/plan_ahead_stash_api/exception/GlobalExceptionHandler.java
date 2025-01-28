package com.notahmed.plan_ahead_stash_api.exception;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;


/**
 * Class to handle the global exceptions thrown from Spring Boot
 */
@ControllerAdvice
public class GlobalExceptionHandler extends RuntimeException{

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleGenericException(Exception exception) {

        var errorMessage = new ErrorMessage(
                LocalDateTime.now(),
                "Internal Server Error"
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorMessage);
    }

    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<ErrorMessage> handleResourceNotFound(Exception exception) {

        var errorMessage = new ErrorMessage(
                LocalDateTime.now(),
                exception.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(errorMessage);
    }

}
