package com.elvan.javadock.services;

import com.elvan.javadock.entities.User;
import com.elvan.javadock.enums.Role;
import com.elvan.javadock.exceptions.*;
import com.elvan.javadock.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;

    @Transactional(rollbackOn = MailException.class)
    public void createOneUser(User newUser){
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setActivationToken(UUID.randomUUID().toString());
            userRepository.saveAndFlush(newUser);
            emailService.sendActivationEmail(newUser);
        } catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        } catch (MailException exception){
            throw new ActivationNotificationException();
        }
    }

    public void activateUser(String activationToken) {
        User user = userRepository.findByActivationToken(activationToken);
        if(user == null){
            throw new InvalidTokenException();
        }
        user.setRole(Role.User);
        user.setActive(true);
        user.setActivationToken(null);
        userRepository.save(user);
    }

    public Page<User> getAllUsers(Pageable page, User loggedInUser) {
        if (loggedInUser == null){
            return userRepository.findAll(page);
        }
        return userRepository.findByIdNot(loggedInUser.getId(), page);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new EmailNotFoundException();
        }
        try {
            user.setPasswordResetToken(UUID.randomUUID().toString());
            emailService.sendPasswordResetEmail(user);
            userRepository.save(user);
        } catch (MailException mailException){
            throw new PasswordNotificationException();
        }

    }

    public void passwordReset(String passwordResetToken, String newPassword) {
        User user = userRepository.findByPasswordResetToken(passwordResetToken);
        if(user == null){
            throw new InvalidTokenException();
        }
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}