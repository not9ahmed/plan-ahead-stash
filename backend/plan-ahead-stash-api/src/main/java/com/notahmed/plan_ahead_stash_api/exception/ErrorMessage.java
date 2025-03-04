package com.notahmed.plan_ahead_stash_api.exception;

import java.time.LocalDateTime;

/**
 * Response for the errors thrown from the controller
 * @param timestamp
 * @param message
 */
public record ErrorMessage(
        LocalDateTime timestamp,
        String message
) { }
