<?php
// Define the recipient of the email
$to = 'tamangsandip609@gmail.com';

// Sanitize and collect the form data
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);
$issue = htmlspecialchars($_POST['issue']);
$message = htmlspecialchars($_POST['message']);

// Create the email subject
$subject = "New Contact Form Submission: " . $issue;

// Build the email body
$body = "You have received a new message from your website contact form.\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . $phone . "\n";
$body .= "Subject: " . $issue . "\n\n";
$body .= "Message:\n" . $message;

// Set email headers to include the sender's details
$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

// Attempt to send the email
if (mail($to, $subject, $body, $headers)) {
    // Redirect the user back to the form page or a "Thank You" page
    header('Location: index.html?status=success'); 
    exit;
} else {
    // Handle error
    header('Location: index.html?status=error');
    exit;
}
?>