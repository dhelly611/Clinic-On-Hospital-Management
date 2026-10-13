/**
 * CLINIC ON - Application Engine & State Controller
 * Professional Healthcare Management System (LocalStorage + Optional PHP API sync)
 */

class ClinicApp {
  constructor() {
    this.storageKey = "CLINIC_ON_PRODUCTION_DATA_V3";
    this.sessionKey = "CLINIC_ON_ACTIVE_SESSION_V3";
    this.initData();
    this.setupCommonListeners();
  }

  // Initialize data store (Always refreshes verified doctor catalog)
  initData() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      this.data = JSON.parse(JSON.stringify(SEED_DATA));
      this.saveData();
    } else {
      try {
        this.data = JSON.parse(raw);
        // Always enforce updated doctor records from SEED_DATA
        this.data.doctors = SEED_DATA.doctors;
        this.data.departments = SEED_DATA.departments;
        if (!this.data.appointments) this.data.appointments = [];
        if (!this.data.patients) this.data.patients = [];
        this.saveData();
      } catch (e) {
        this.data = JSON.parse(JSON.stringify(SEED_DATA));
        this.saveData();
      }
    }
  }

  saveData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  // Session Management
  getCurrentSession() {
    const raw = localStorage.getItem(this.sessionKey);
    return raw ? JSON.parse(raw) : null;
  }

  setSession(user, role) {
    const session = { user, role, loggedAt: new Date().toISOString() };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  clearSession() {
    localStorage.removeItem(this.sessionKey);
  }

  // Setup common UI listeners
  setupCommonListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      const toggle = document.querySelector(".mobile-toggle");
      const menu = document.querySelector(".nav-menu");
      if (toggle && menu) {
        toggle.addEventListener("click", () => {
          menu.classList.toggle("open");
        });
      }

      this.renderNavUserState();
    });
  }

  // Update Navigation Bar based on session
  renderNavUserState() {
    const session = this.getCurrentSession();
    const navActions = document.querySelector(".nav-actions");
    if (!navActions) return;

    if (session && session.role === "patient") {
      navActions.innerHTML = `
        <a href="patient-dashboard.html" class="btn btn-light btn-sm" style="font-weight: 600;">
          <i class="fa-solid fa-user-circle" style="color: var(--primary);"></i> ${session.user.name}
        </a>
        <a href="appointment.html" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-calendar-plus"></i> Book Visit
        </a>
        <button id="logoutBtn" class="btn btn-outline btn-sm" title="Sign Out">
          <i class="fa-solid fa-power-off"></i>
        </button>
      `;
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          this.clearSession();
          this.showToast("Signed out successfully");
          setTimeout(() => window.location.href = "index.html", 400);
        });
      }
    } else if (session && session.role === "doctor") {
      navActions.innerHTML = `
        <span style="font-size: 0.88rem; font-weight: 600; color: var(--dark-light); margin-right: 0.25rem;">
          <i class="fa-solid fa-user-doctor" style="color: var(--accent);"></i> ${session.user.name}
        </span>
        <a href="doctor-dashboard.html" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-chart-line"></i> Doctor Hub
        </a>
        <button id="docNavLogoutBtn" class="btn btn-light btn-sm" title="Sign Out">
          <i class="fa-solid fa-power-off"></i>
        </button>
      `;
      const logoutBtn = document.getElementById("docNavLogoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          this.clearSession();
          this.showToast("Logged out of staff portal");
          setTimeout(() => window.location.href = "index.html", 400);
        });
      }
    }
  }

  // Toast Notification Helper
  showToast(message, isError = false) {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.style.background = isError ? "var(--danger)" : "var(--dark)";
    toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="color: ${isError ? '#fff' : 'var(--secondary)'};"></i> <span>${message}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  }

  // ==========================================
  // APPOINTMENT OPERATIONS (STRICTLY LOGGED-IN)
  // ==========================================
  createAppointment(formData) {
    const id = "APT-" + Math.floor(1000 + Math.random() * 9000);
    const doctor = this.data.doctors.find(d => d.id === formData.doctorId);
    const currentSession = this.getCurrentSession();

    if (!currentSession || currentSession.role !== "patient") {
      throw new Error("Patient must be logged in to book an appointment.");
    }

    const newAppointment = {
      id: id,
      patientId: currentSession.user.id,
      patientName: currentSession.user.name,
      patientPhone: currentSession.user.phone,
      patientEmail: currentSession.user.email.toLowerCase(),
      doctorId: formData.doctorId,
      doctorName: doctor ? doctor.name : "Assigned Specialist",
      department: formData.department,
      room: doctor ? doctor.room : "Room 101",
      date: formData.date,
      time: formData.time,
      symptoms: formData.symptoms || "General medical consultation",
      status: "pending",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      checkupNotes: ""
    };

    this.data.appointments.unshift(newAppointment);
    this.saveData();
    return newAppointment;
  }

  getAppointmentsForDoctor(doctorId, status = "all") {
    let list = this.data.appointments.filter(a => a.doctorId === doctorId);
    if (status !== "all") {
      list = list.filter(a => a.status === status);
    }
    return list;
  }

  getAppointmentsForPatient(email) {
    if (!email) return [];
    return this.data.appointments.filter(a => a.patientEmail.toLowerCase() === email.toLowerCase());
  }

  updateAppointmentStatus(aptId, status) {
    const apt = this.data.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.status = status;
      this.saveData();
      return true;
    }
    return false;
  }

  addCheckupNotes(aptId, notes) {
    const apt = this.data.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.checkupNotes = notes;
      apt.status = "approved";
      this.saveData();
      return true;
    }
    return false;
  }

  // ==========================================
  // AUTHENTICATION OPERATIONS
  // ==========================================

  loginDoctorById(doctorId, password) {
    const doc = this.data.doctors.find(d => d.id === doctorId);
    if (doc && doc.password === password) {
      this.setSession(doc, "doctor");
      return doc;
    }
    return null;
  }

  registerPatient(patientData) {
    const existing = this.data.patients.find(p => p.email.toLowerCase() === patientData.email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists. Please sign in." };
    }

    const newPat = {
      id: "PAT-" + Math.floor(1000 + Math.random() * 9000),
      name: patientData.name,
      email: patientData.email.toLowerCase(),
      phone: patientData.phone,
      password: patientData.password,
      bloodGroup: patientData.bloodGroup || "O+",
      gender: patientData.gender || "Other",
      age: patientData.age || 30,
      registeredAt: new Date().toISOString().substring(0, 10)
    };

    this.data.patients.push(newPat);
    this.saveData();
    this.setSession(newPat, "patient");
    return { success: true, patient: newPat };
  }

  loginPatient(email, password) {
    const pat = this.data.patients.find(p => p.email.toLowerCase() === email.toLowerCase() && p.password === password);
    if (pat) {
      this.setSession(pat, "patient");
      return pat;
    }
    return null;
  }
}

// Global Singleton Instance
const app = new ClinicApp();
window.app = app;
