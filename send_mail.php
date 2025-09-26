<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer\PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data safely
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                 // Use SMTP
        $mail->Host       = 'smtp.gmail.com';            // Gmail SMTP server
        $mail->SMTPAuth   = true;                        // Enable authentication
        $mail->Username   = 'rutvikvarankar06@gmail.com';       // 🔹 Your Gmail address
        $mail->Password   = 'shgh khpl somj ymat';         // 🔹 App Password (not normal password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Encryption
        $mail->Port       = 587;                         // TLS port

        // Recipients
        $mail->setFrom('rutvikvarankar06@gmail.com', 'Portfolio Website');
        $mail->addAddress('rutvikvarankar06@gmail.com'); // 🔹 Where you want to receive emails

        // Optional: reply to sender
        $mail->addReplyTo($email, $name);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body    = "
            <h2>New Message from Portfolio Website</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong><br>{$message}</p>
        ";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage:\n$message";

        // Send email
        $mail->send();
        echo "Message sent successfully!";
    } catch (Exception $e) {
        echo "Message delivery failed. Error: {$mail->ErrorInfo}";
    }
}
?>
