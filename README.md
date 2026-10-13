# Clinic On - Hospital Management System

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, responsive, and full-featured **Hospital Management System** built with **HTML5, CSS3, JavaScript, and PHP/MySQL**.

Designed with a **patient-first public web experience** and a **secure clinical staff intranet** for attending physicians to review consultation requests and issue digital prescriptions.

---

## 🌟 System Architecture & Features

### 1. Patient Experience (Account First &rarr; Book Second)
* **👤 Verified Patient Identity:**
  * To prevent accidental data mix-ups, patients register on `patient-signup.html` or sign in on `patient-login.html`.
  * Once authenticated, their consultation requests are strictly locked to their legal medical profile.
* **📅 Streamlined Appointment Scheduling (`appointment.html`):**
  * When logged in, the patient's name, email, and phone number are automatically pre-filled.
  * Patients simply choose their **Department &rarr; Specialist &rarr; Date & Time Slot**.
  * On confirmation, they are immediately taken to their **Patient Dashboard** with their new booking live.
* **📋 Unified Patient Dashboard (`patient-dashboard.html`):**
  * View all booked consultations in one place.
  * Live status tracking: `Pending Review`, `Confirmed & Approved`, or `Declined / Reschedule`.
  * Access the attending doctor's **Diagnosis & Digital Prescription** notes directly.

### 2. Clinical Staff Portal (`doctor-login.html` & `doctor-dashboard.html`)
* **🔒 Dedicated Staff Login:**
  * Physicians select their name from the verified medical staff directory and enter their hospital staff password.
* **🩺 Doctor Hub:**
  * Each physician **only sees patient appointments booked specifically for them**.
  * 1-Click **Approve** and **Reject** buttons to update consultation status in real time.
  * **Clinical Findings Modal**: Record diagnosis, medication, and instructions that sync immediately to the patient's dashboard.

---

## 📂 Project Directory

```
Clinic_Web/
│
├── index.html               # Main public homepage
├── about.html               # Hospital history, mission, and clinical standards
├── services.html            # Medical wings and clinical departments catalog
├── contact.html             # Emergency 24/7 hotlines, reception desk, inquiry form
│
├── appointment.html         # Consultation booking form (requires patient sign-in)
├── patient-login.html       # Patient portal sign-in
├── patient-signup.html      # New patient registration form
├── patient-dashboard.html   # Patient control hub (booking history, live status, prescriptions)
│
├── doctor-login.html        # Hospital staff login (physician selection + password)
├── doctor-dashboard.html    # Physician control hub (manage appointments, record prescriptions)
│
├── css/
│   └── style.css            # Responsive medical stylesheet (mobile navigation, modals, cards)
│
├── js/
│   ├── data.js              # Hospital medical staff master directory & departments
│   └── app.js               # State management, local storage engine, and UI controller
│
└── php/                     # Optional PHP/MySQL backend
    ├── config.php           # PDO database connection
    ├── schema.sql           # Database schema & staff master tables
    └── api.php              # RESTful API endpoints for appointments & auth
```

---

## 🔑 Hospital Staff Access & Schedule Directory

| Attending Physician | Department | Schedule | Off Days | Staff Password |
| :--- | :--- | :--- | :--- | :--- |
| **Dr. Sarah Jenkins** | Cardiology | Mon - Sat (9:00 AM - 5:00 PM) | Sunday | `ClinicOn@sarah` |
| **Dr. Rajesh Sharma** | Pediatrics & NICU | Mon - Sat (8:00 AM - 4:00 PM) | Sunday | `ClinicOn@rajesh` |
| **Dr. Michael Chen** | Neurology | Tue - Fri (10:00 AM - 6:00 PM) | Sat, Sun & Mon | `ClinicOn@chen` |
| **Dr. Elena Rostova** | Orthopedics | Mon - Fri (9:00 AM - 4:00 PM) | Sat & Sun | `ClinicOn@elena` |

---

## 🚀 How to Run the Project

### Method 1: Instant Standalone (No Server or Installation Needed)
1. Navigate to the project directory:
   ```cmd
   cd "C:\Users\hp\Downloads\Clinic On- Hospital Management\Clinic_Web"
   ```
2. Double-click **`index.html`** or open it in any modern browser (Chrome, Edge, Firefox, Safari).
3. The system works **100% out-of-the-box** using browser `localStorage`. Real appointments booked by patients immediately appear in the respective doctor's portal!

### Method 2: Full-Stack with PHP & MySQL (Using XAMPP / WAMP)
1. Copy the `Clinic_Web` folder into your XAMPP `htdocs` directory:
   ```
   C:\xampp\htdocs\Clinic_Web
   ```
2. Start **Apache** and **MySQL** in your XAMPP Control Panel.
3. Open `http://localhost/phpmyadmin/` and import `php/schema.sql` into a database named `clinic_on_db`.
4. Open your browser and navigate to:
   ```
   http://localhost/Clinic_Web/
   ```

---

## 📤 How to Upload to GitHub

Open **Command Prompt (CMD)** inside the project directory:

```bash
# 1. Navigate to the project folder
cd "C:\Users\hp\Downloads\Clinic On- Hospital Management\Clinic_Web"

# 2. Initialize git repository
git init

# 3. Stage all project files
git add .

# 4. Commit files
git commit -m "feat: complete Clinic On hospital management system"

# 5. Set default branch to main
git branch -M main

# 6. Add your GitHub remote repository (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 7. Push code to GitHub
git push -u origin main
```

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
