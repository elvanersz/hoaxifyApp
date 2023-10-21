package com.elvan.javadock.controllers;

import com.elvan.javadock.auth.TokenService;
import com.elvan.javadock.requests.CreateUserRequest;
import com.elvan.javadock.requests.PasswordResetRequest;
import com.elvan.javadock.responses.UserResponse;
import com.elvan.javadock.services.UserService;
import com.elvan.javadock.validation.GenericMessage;
import com.elvan.javadock.validation.Messages;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private MessageSource messageSource;
    private TokenService tokenService;


    @PostMapping("/api/v1/users")
    public GenericMessage createUser(@Valid @RequestBody CreateUserRequest newUser) {
        userService.createOneUser(newUser.toUser());
        String message = Messages.getMessageForLocale("javadock.create.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/api/v1/users/{activationToken}/active")
    public GenericMessage activateUser(@PathVariable String activationToken) {
        userService.activateUser(activationToken);
        String message = Messages.getMessageForLocale("javadock.activate.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @GetMapping("/api/v1/users")
    public Page<UserResponse> getAllUsers(Pageable page,
                                          @RequestHeader(name = "Authorization",
                                                  required = false) String authorizationHeader) {
        var loggedInUser = tokenService.verifyToken(authorizationHeader);
        return userService.getAllUsers(page, loggedInUser).map(UserResponse::new);
    }

    @GetMapping("/api/v1/user/{id}")
    UserResponse getUserById(@PathVariable Long id) {
        return new UserResponse(userService.getUserById(id));
    }

    @PostMapping("/api/v1/request-password-reset")
    public void requestPasswordReset(@Valid @RequestBody PasswordResetRequest passwordResetRequest){
        userService.requestPasswordReset(passwordResetRequest.email());
    }

    @PatchMapping("/api/v1/password-reset/{passwordResetToken}")
    private void passwordReset(@PathVariable String passwordResetToken, @RequestBody String newPassword){
        userService.passwordReset(passwordResetToken, newPassword);
    }
}