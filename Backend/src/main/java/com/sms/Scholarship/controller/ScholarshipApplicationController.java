package com.sms.Scholarship.controller;

import com.sms.Scholarship.model.ScholarshipApplication;
import com.sms.Scholarship.service.ScholarshipApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipApplicationController {

    @Autowired
    private ScholarshipApplicationService scholarshipApplicationService;

    // Submit a scholarship application
    @PostMapping("/submit")
    public ResponseEntity<String> submitApplication(@RequestBody ScholarshipApplication application) {
        try {
            scholarshipApplicationService.saveApplication(application);
            return ResponseEntity.ok("Application submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error submitting application: " + e.getMessage());
        }
    }

    // Get all scholarship applications
    @GetMapping("/get-all-applications")
    public ResponseEntity<List<ScholarshipApplication>> getAllApplications() {
        List<ScholarshipApplication> applications = scholarshipApplicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    // Update application status to Accepted or Rejected
    @PutMapping("/set-status/{id}")
    public ResponseEntity<String> updateApplicationStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            scholarshipApplicationService.updateApplicationStatus(id, status);
            return ResponseEntity.ok("Application status updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating application status: " + e.getMessage());
        }
    }
    
    @GetMapping("/get-previous-applications")
    public List<ScholarshipApplication> getPreviousApplications(@RequestParam Long userId) {
        return scholarshipApplicationService.getPreviousApplications(userId);
    }
}