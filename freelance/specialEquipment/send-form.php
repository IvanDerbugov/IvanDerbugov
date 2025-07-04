<?php
// send-form.php

// Настройки
$to = "info-recordica@mail.ru";
$subject = "Заявка с сайта recordica.ru";

// Получаем данные из POST
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$contact = isset($_POST['contact']) ? trim($_POST['contact']) : '';

// Валидация
if ($name === '' || $contact === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Заполните все поля!']);
    exit;
}

// Формируем письмо
$message = "Имя: $name\nКонтакт: $contact\n";
$headers = "Content-Type: text/plain; charset=utf-8\r\n";

// Отправляем
$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки письма.']);
}
