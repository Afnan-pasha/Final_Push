package com.loanmanagement.repository;

import com.loanmanagement.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByOrderByCreatedAtDesc();
    List<Notification> findByIsReadOrderByCreatedAtDesc(Boolean isRead);
    long countByIsRead(Boolean isRead);
}
