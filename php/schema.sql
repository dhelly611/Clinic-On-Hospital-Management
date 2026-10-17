-- =====================================================================
-- CLINIC ON - HOSPITAL MANAGEMENT SYSTEM DATABASE SCHEMA
-- Compatible with MySQL 5.7+ / MariaDB / XAMPP / WAMP
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `clinic_on_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `clinic_on_db`;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS `departments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `dept_code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'fa-stethoscope',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Verified Doctors Table
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `experience` VARCHAR(50) DEFAULT '5 Years',
  `room` VARCHAR(100) DEFAULT 'Room 101, Main Block',
  `qualification` VARCHAR(200) DEFAULT 'MBBS / Specialist',
  `consult_fee` VARCHAR(50) DEFAULT '$100',
  `photo_url` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Registered Patients Table
CREATE TABLE IF NOT EXISTS `patients` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `blood_group` VARCHAR(10) DEFAULT 'O+',
  `age` INT DEFAULT 30,
  `gender` VARCHAR(20) DEFAULT 'Other',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Appointments Table (Real patient bookings)
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` VARCHAR(50) PRIMARY KEY,
  `patient_id` VARCHAR(50) DEFAULT NULL,
  `patient_name` VARCHAR(150) NOT NULL,
  `patient_phone` VARCHAR(50) NOT NULL,
  `patient_email` VARCHAR(150) NOT NULL,
  `doctor_id` VARCHAR(50) NOT NULL,
  `doctor_name` VARCHAR(150) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `appointment_date` DATE NOT NULL,
  `appointment_time` VARCHAR(50) NOT NULL,
  `symptoms` TEXT,
  `status` ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  `checkup_notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- INITIAL VERIFIED MEDICAL STAFF & CLINICAL DEPARTMENTS
-- =====================================================================

INSERT INTO `departments` (`dept_code`, `name`, `icon`, `description`) VALUES
('cardio', 'Cardiology', 'fa-heart-pulse', 'Advanced cardiovascular care and heart diagnostics.'),
('pedia', 'Pediatrics & NICU', 'fa-baby', 'Childcare, infant intensive care, and vaccinations.'),
('neuro', 'Neurology', 'fa-brain', 'Brain, spine, and neurological condition care.'),
('ortho', 'Orthopedics', 'fa-bone', 'Joint replacement, fracture care, and rehabilitation.'),
('dental', 'Dental & Oral Care', 'fa-tooth', 'Preventative dentistry, oral surgery, and cosmetic dental.'),
('general', 'General Medicine', 'fa-stethoscope', 'Primary outpatient care and routine health screenings.')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `doctors` (`id`, `name`, `category`, `email`, `password`, `phone`, `experience`, `room`, `qualification`, `consult_fee`, `photo_url`) VALUES
('DOC-101', 'Dr. Sarah Jenkins', 'Cardiology', 'sarah@hospital.com', 'ClinicOn@sarah', '+1 (555) 234-5678', '14 Years', 'Room 302, Block A', 'MD, FACC - Harvard Medical School', '$120', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'),
('DOC-102', 'Dr. Rajesh Sharma', 'Pediatrics & NICU', 'rajesh@hospital.com', 'ClinicOn@rajesh', '+1 (555) 345-6789', '10 Years', 'Room 105, Block B', 'MBBS, MD (Pediatrics) - AIIMS', '$90', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'),
('DOC-103', 'Dr. Michael Chen', 'Neurology', 'michael@hospital.com', 'ClinicOn@chen', '+1 (555) 456-7890', '18 Years', 'Room 410, Block A', 'MD, Ph.D. - Johns Hopkins University', '$150', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'),
('DOC-104', 'Dr. Elena Rostova', 'Orthopedics', 'elena@hospital.com', 'ClinicOn@elena', '+1 (555) 567-8901', '11 Years', 'Room 204, Block C', 'MS (Ortho), Fellowship in Joint Replacement', '$110', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80')
ON DUPLICATE KEY UPDATE `password`=VALUES(`password`);
