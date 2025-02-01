package com.notahmed.plan_ahead_stash_api.service;

import com.notahmed.plan_ahead_stash_api.exception.ResourceNotFound;
import com.notahmed.plan_ahead_stash_api.model.User;
import com.notahmed.plan_ahead_stash_api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User create(User user) {
        var userToBeSaved = new User(
                null,
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                new Date(),
                null
        );
        return userRepository.save(userToBeSaved);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("User not found"));
    }

    public User update(Long id, User user) {

        // First check if user exists
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("User not found"));

        // Else update
        var userToBeUpdated = new User(
                id,
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                existingUser.getCreatedDate(),
                new Date()
        );
        return userRepository.save(userToBeUpdated);
    }


    public void delete(Long id) {
        // First check if user exists
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFound("User not found"));

        // Else delete
        userRepository.deleteById(id);
    }

}
