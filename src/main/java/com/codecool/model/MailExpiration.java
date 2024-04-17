package com.codecool.model;

import com.codecool.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "expired_mails")
public class MailExpiration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createDate;
    private Boolean isClosed;

    @ManyToOne
    private User user;

    private UUID uuid;
}
