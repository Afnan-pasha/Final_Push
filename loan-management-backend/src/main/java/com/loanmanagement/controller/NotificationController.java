package com.loanmanagement.controller;

import com.loanmanagement.dto.NotificationResponse;
import com.loanmanagement.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        List<NotificationResponse> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications() {
        List<NotificationResponse> notifications = notificationService.getUnreadNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/count/unread")
    public ResponseEntity<Long> getUnreadCount() {
        long count = notificationService.getUnreadCount();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/{notificationId}/mark-read")
    public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
        boolean marked = notificationService.markAsRead(notificationId);

        if (marked) {
            return ResponseEntity.ok().body("Notification marked as read");
        } else {
            return ResponseEntity.badRequest().body("Unable to mark notification as read");
        }
    }

    @PostMapping("/mark-all-read")
    public ResponseEntity<?> markAllAsRead() {
        boolean marked = notificationService.markAllAsRead();

        if (marked) {
            return ResponseEntity.ok().body("All notifications marked as read");
        } else {
            return ResponseEntity.badRequest().body("Unable to mark notifications as read");
        }
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        boolean deleted = notificationService.deleteNotification(notificationId);

        if (deleted) {
            return ResponseEntity.ok().body("Notification deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Unable to delete notification");
        }
    }
}
