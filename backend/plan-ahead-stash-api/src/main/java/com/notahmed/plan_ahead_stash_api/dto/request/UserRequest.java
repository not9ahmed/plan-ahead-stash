package com.notahmed.plan_ahead_stash_api.dto.request;

import java.util.Date;

public record UserRequest (
        String username,
        String firstName,
        String lastName,
        Date dateOfBirth
)
{ }
