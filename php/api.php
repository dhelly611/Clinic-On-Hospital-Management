<?php
/**
 * CLINIC ON - Hospital Management REST API Endpoints
 * Provides JSON responses for appointments, status tracking, authentication, and checkups.
 */

require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? ($_POST['action'] ?? '');
$pdo = getDBConnection();

// Read JSON input if sent as application/json
$rawInput = file_get_contents('php://input');
$jsonBody = json_decode($rawInput, true) ?? [];
$data = array_merge($_POST, $jsonBody);

switch ($action) {

    // 1. GET ALL DOCTORS
    case 'get_doctors':
        $stmt = $pdo->query("SELECT id, name, category, email, phone, experience, room, qualification, consult_fee, photo_url FROM doctors ORDER BY name ASC");
        $doctors = $stmt->fetchAll();
        echo json_encode(['success' => true, 'doctors' => $doctors]);
        break;

    // 2. BOOK NEW APPOINTMENT
    case 'book_appointment':
        $patient_name  = trim($data['patientName'] ?? '');
        $patient_phone = trim($data['patientPhone'] ?? '');
        $patient_email = trim($data['patientEmail'] ?? '');
        $doctor_id     = trim($data['doctorId'] ?? '');
        $department    = trim($data['department'] ?? '');
        $apt_date      = trim($data['date'] ?? '');
        $apt_time      = trim($data['time'] ?? '');
        $symptoms      = trim($data['symptoms'] ?? 'General medical consultation');

        if (!$patient_name || !$patient_phone || !$doctor_id || !$apt_date || !$apt_time) {
            echo json_encode(['success' => false, 'message' => 'Please provide all required appointment fields.']);
            exit;
        }

        // Fetch doctor name
        $docStmt = $pdo->prepare("SELECT name FROM doctors WHERE id = ?");
        $docStmt->execute([$doctor_id]);
        $doctor = $docStmt->fetch();
        $doctor_name = $doctor ? $doctor['name'] : 'Assigned Doctor';

        $id = 'APT-' . rand(1000, 9999);

        $stmt = $pdo->prepare("INSERT INTO appointments 
            (id, patient_name, patient_phone, patient_email, doctor_id, doctor_name, department, appointment_date, appointment_time, symptoms, status, checkup_notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', '')");
        
        $stmt->execute([
            $id, $patient_name, $patient_phone, $patient_email, $doctor_id, $doctor_name, $department, $apt_date, $apt_time, $symptoms
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Appointment booked successfully!',
            'appointment' => [
                'id' => $id,
                'patientName' => $patient_name,
                'doctorName' => $doctor_name,
                'date' => $apt_date,
                'time' => $apt_time,
                'status' => 'pending'
            ]
        ]);
        break;

    // 3. FETCH APPOINTMENTS (For Doctor Dashboard)
    case 'get_appointments':
        $doctor_id = $_GET['doctorId'] ?? ($data['doctorId'] ?? null);
        $status = $_GET['status'] ?? ($data['status'] ?? 'all');

        $query = "SELECT id, patient_name AS patientName, patient_phone AS patientPhone, patient_email AS patientEmail, 
                         doctor_id AS doctorId, doctor_name AS doctorName, department, 
                         appointment_date AS date, appointment_time AS time, symptoms, status, checkup_notes AS checkupNotes, 
                         created_at AS createdAt 
                  FROM appointments WHERE 1=1";
        $params = [];

        if ($doctor_id && $doctor_id !== 'all') {
            $query .= " AND doctor_id = ?";
            $params[] = $doctor_id;
        }

        if ($status && $status !== 'all') {
            $query .= " AND status = ?";
            $params[] = $status;
        }

        $query .= " ORDER BY created_at DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $list = $stmt->fetchAll();

        echo json_encode(['success' => true, 'appointments' => $list]);
        break;

    // 4. UPDATE APPOINTMENT STATUS (Approve / Reject)
    case 'update_status':
        $apt_id = $data['id'] ?? '';
        $new_status = $data['status'] ?? '';

        if (!$apt_id || !in_array($new_status, ['pending', 'approved', 'rejected', 'completed'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid appointment ID or status parameter.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE appointments SET status = ? WHERE id = ?");
        $stmt->execute([$new_status, $apt_id]);

        echo json_encode(['success' => true, 'message' => "Appointment $apt_id marked as $new_status."]);
        break;

    // 5. ADD CHECKUP SUMMARY & PRESCRIPTION
    case 'add_checkup':
        $apt_id = $data['id'] ?? '';
        $notes = trim($data['checkupNotes'] ?? '');

        if (!$apt_id || !$notes) {
            echo json_encode(['success' => false, 'message' => 'Appointment ID and checkup notes required.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE appointments SET checkup_notes = ?, status = 'approved' WHERE id = ?");
        $stmt->execute([$notes, $apt_id]);

        echo json_encode(['success' => true, 'message' => 'Checkup notes recorded successfully!']);
        break;

    // 6. SEARCH STATUS (By Booking ID or Phone)
    case 'search_status':
        $q = trim($_GET['q'] ?? ($data['q'] ?? ''));
        if (!$q) {
            echo json_encode(['success' => true, 'results' => []]);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id, patient_name AS patientName, patient_phone AS patientPhone, patient_email AS patientEmail,
                                      doctor_id AS doctorId, doctor_name AS doctorName, department, 
                                      appointment_date AS date, appointment_time AS time, symptoms, status, checkup_notes AS checkupNotes, 
                                      created_at AS createdAt 
                               FROM appointments 
                               WHERE id = ? OR patient_phone LIKE ? OR patient_name LIKE ?
                               ORDER BY created_at DESC");
        $searchParam = "%$q%";
        $stmt->execute([$q, $searchParam, $searchParam]);
        $results = $stmt->fetchAll();

        echo json_encode(['success' => true, 'results' => $results]);
        break;

    // 7. DOCTOR LOGIN
    case 'doctor_login':
        $email = trim($data['email'] ?? '');
        $pass  = trim($data['password'] ?? '');

        $stmt = $pdo->prepare("SELECT * FROM doctors WHERE email = ? AND password = ?");
        $stmt->execute([$email, $pass]);
        $doc = $stmt->fetch();

        if ($doc) {
            unset($doc['password']);
            echo json_encode(['success' => true, 'doctor' => $doc]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid doctor email or password.']);
        }
        break;

    default:
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action requested.',
            'available_actions' => ['get_doctors', 'book_appointment', 'get_appointments', 'update_status', 'add_checkup', 'search_status', 'doctor_login']
        ]);
        break;
}
?>
