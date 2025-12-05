<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$tag = $data['tag'] ?? null;

if ($id && $tag) {
    $sql = "UPDATE rider SET tag = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $tag, $id); // 's' for string (tag), 'i' for integer (id)
    $success = $stmt->execute();
    echo json_encode(['success' => $success]);
} else {
    echo json_encode(['success' => false, 'error' => 'Missing id or tag']);
}

$conn->close();
?>
