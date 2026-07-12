<?php
// Initialize empty variables to store our processing states
$status = "";
$message = "";

// Capture the user's IP address from the server's global environment variables
$client_ip = $_SERVER['REMOTE_ADDR'];

// Step 1: Verify that this script was accessed via a valid POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Step 2: Extract the data and strip away accidental empty spaces using trim()
    $raw_username = $_POST['username'];
    $clean_username = trim($raw_username);

    // Step 3: Run server-side validation rules
    if (empty($clean_username)) {
        // If the field was left empty, trigger an error state
        $status = "error";
        $message = "Validation Failed: The username field cannot be left empty. Please go back and provide valid text.";
    } else {
        // If valid, use htmlspecialchars() to sanitize the text. 
        // This prevents users from injecting malicious JavaScript code into your server.
        $safe_username = htmlspecialchars($clean_username);
        
        $status = "success";
        $message = "Hello, <strong>" . $safe_username . "</strong>! Your string data payload was received and verified securely.";
    }
} else {
    // Security Fallback: If a user tries to access "process.php" directly in their browser URL,
    // force redirect them back to the frontend form.
    header("Location: form.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Day 7: Server Processing Log</title>
    <!-- We link the exact same CSS file here so the response page looks identical to the form page -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="main-container">
        <h1>Server Response Logs</h1>
        
        <!-- PHP conditionally renders the HTML layout based on the $status variable -->
        <?php if ($status == "error"): ?>
            
            <div class="error-box">
                <h3>Action Aborted</h3>
                <p><?php echo $message; ?></p>
            </div>
            
        <?php elseif ($status == "success"): ?>
            
            <div class="success-box">
                <h3>Transmission Successful</h3>
                <p><?php echo $message; ?></p>
                <hr>
                <p class="server-info"><strong>Detected Client Network IP:</strong> <?php echo $client_ip; ?></p>
            </div>
            
        <?php endif; ?>

        <!-- A simple back button to reset the flow -->
        <a href="form.html" class="back-link">&larr; Return to Form Input</a>
    </div>

</body>
</html>