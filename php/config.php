<?php
/**
 * CLINIC ON - Database Connection Configuration (PDO)
 * Default credentials configured for XAMPP / WAMP standard installations.
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$db_host = 'localhost';
$db_name = 'clinic_on_db';
$db_user = 'root';
$db_pass = ''; // Default XAMPP password is empty

function getDBConnection() {
    global $db_host, $db_name, $db_user, $db_pass;
    try {
        $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . $e->getMessage(),
            'hint' => 'Ensure MySQL is running in XAMPP and you have imported schema.sql into clinic_on_db.'
        ]);
        exit;
    }
}
?>
