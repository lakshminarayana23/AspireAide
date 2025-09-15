package com.sms.Scholarship.controller;

import com.sms.Scholarship.model.Scholarship;
import com.sms.Scholarship.model.ScholarshipApplication;
import com.sms.Scholarship.repository.ScholarshipApplicationRepository;
import com.sms.Scholarship.service.ScholarshipService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from any origin
public class ScholarshipController {

    @Autowired
    private ScholarshipService scholarshipService;
    
    @Autowired
    private ScholarshipApplicationRepository scholarshipApplicationRepository;

    @PostMapping("/create")
    public ResponseEntity<Scholarship> createScholarship(@RequestBody Scholarship scholarship) {
        return ResponseEntity.ok(scholarshipService.createScholarship(scholarship));
    }

    @GetMapping
    public ResponseEntity<List<Scholarship>> getAllScholarships() {
        return ResponseEntity.ok(scholarshipService.getAllScholarships());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable Long id) {
        return scholarshipService.getScholarshipById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateScholarship(@PathVariable Long id, @RequestBody Scholarship scholarshipDetails) {
        try {
            Scholarship updatedScholarship = scholarshipService.updateScholarship(id, scholarshipDetails);
            return ResponseEntity.ok(updatedScholarship);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScholarship(@PathVariable Long id) {
        return scholarshipService.deleteScholarship(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Scholarship>> getScholarshipsByCategory(@PathVariable String category) {
        List<Scholarship> scholarships = scholarshipService.getScholarshipsByCategory(category);
        return scholarships.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(scholarships);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Scholarship> updateScholarshipStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            Scholarship updatedScholarship = scholarshipService.updateScholarshipStatus(id, status);
            return ResponseEntity.ok(updatedScholarship);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/get-applications")
    public ResponseEntity<List<Scholarship>> getApplications() {
        return ResponseEntity.ok(scholarshipService.getAllApplications());
    }
    
    @PostMapping("/application-form")
    public ResponseEntity<?> submitApplication(@RequestBody ScholarshipApplication application) {
        // Set submission date and status
        application.setSubmissionDate(LocalDateTime.now());
        application.setStatus("Pending"); // Default status

        // Save the application to the database
        ScholarshipApplication savedApplication = scholarshipApplicationRepository.save(application);

        return ResponseEntity.ok(savedApplication);
    }

}
