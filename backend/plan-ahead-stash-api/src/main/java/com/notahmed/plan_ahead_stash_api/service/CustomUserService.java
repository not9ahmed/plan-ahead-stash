package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService {

    private final UserRepository userRepository;

    public CustomUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




}
