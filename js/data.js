/**
 * CLINIC ON - Hospital Management System
 * Verified Hospital Medical Staff Directory with Schedule & Working Days Master
 */

const SEED_DATA = {
  departments: [
    { id: "cardio", name: "Cardiology", icon: "fa-heart-pulse", desc: "Advanced cardiovascular care, heart diagnostics, and hypertension management." },
    { id: "pedia", name: "Pediatrics & NICU", icon: "fa-baby", desc: "Comprehensive childcare, infant intensive care, and immunization programs." },
    { id: "neuro", name: "Neurology", icon: "fa-brain", desc: "Brain, spine, and neurological condition treatments by renowned specialists." },
    { id: "ortho", name: "Orthopedics", icon: "fa-bone", desc: "Joint replacement, fracture treatment, sports injuries, and spine rehabilitation." },
    { id: "dental", name: "Dental & Oral Care", icon: "fa-tooth", desc: "Preventative dental procedures, cosmetic dentistry, and dental surgeries." },
    { id: "general", name: "General Medicine", icon: "fa-stethoscope", desc: "Primary healthcare, fever, routine checkups, and chronic disease control." }
  ],

  // Hospital Verified Staff Directory - 100% Synced with Services Page
  // Day numbers: 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  doctors: [
    {
      id: "DOC-101",
      name: "Dr. Sarah Jenkins",
      category: "Cardiology",
      email: "sarah@hospital.com",
      password: "ClinicOn@sarah",
      phone: "+1 (555) 234-5678",
      experience: "14 Years",
      room: "Room 302, Block A",
      qualification: "MD, FACC - Harvard Medical School",
      consultFee: "$120",
      photo: "images/dr-sarah.jpg",
      onlinePhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
      workingDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
      workingDaysText: "Mon - Sat",
      offDaysText: "Sunday",
      workingHours: "9:00 AM - 5:00 PM"
    },
    {
      id: "DOC-102",
      name: "Dr. Rajesh Sharma",
      category: "Pediatrics & NICU",
      email: "rajesh@hospital.com",
      password: "ClinicOn@rajesh",
      phone: "+1 (555) 345-6789",
      experience: "10 Years",
      room: "Room 105, Block B",
      qualification: "MBBS, MD (Pediatrics) - AIIMS",
      consultFee: "$90",
      photo: "images/dr-rajesh.jpg",
      onlinePhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
      workingDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
      workingDaysText: "Mon - Sat",
      offDaysText: "Sunday",
      workingHours: "8:00 AM - 4:00 PM"
    },
    {
      id: "DOC-103",
      name: "Dr. Michael Chen",
      category: "Neurology",
      email: "michael@hospital.com",
      password: "ClinicOn@chen",
      phone: "+1 (555) 456-7890",
      experience: "18 Years",
      room: "Room 410, Block A",
      qualification: "MD, Ph.D. - Johns Hopkins University",
      consultFee: "$150",
      photo: "images/dr-chen.jpg",
      onlinePhoto: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
      workingDays: [2, 3, 4, 5], // Tue - Fri
      workingDaysText: "Tue - Fri",
      offDaysText: "Sat, Sun & Mon",
      workingHours: "10:00 AM - 6:00 PM"
    },
    {
      id: "DOC-104",
      name: "Dr. Elena Rostova",
      category: "Orthopedics",
      email: "elena@hospital.com",
      password: "ClinicOn@elena",
      phone: "+1 (555) 567-8901",
      experience: "11 Years",
      room: "Room 204, Block C",
      qualification: "MS (Ortho), Fellowship in Joint Replacement",
      consultFee: "$110",
      photo: "images/dr-elena.jpg",
      onlinePhoto: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80",
      workingDays: [1, 2, 3, 4, 5], // Mon - Fri
      workingDaysText: "Mon - Fri",
      offDaysText: "Saturday & Sunday",
      workingHours: "9:00 AM - 4:00 PM"
    }
  ],

  appointments: [],
  patients: []
};
