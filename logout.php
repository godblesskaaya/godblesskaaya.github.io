<?php

session_start();

// Check if user is logged in (same as courses.php)
//if (!isset($_SESSION['username'])) {
    unset($_SESSION['username']);
    unset($_SESSION['password']);
    session_destroy();
    header("Location: courses.php"); // Redirect to user courses page
/*}else {
    echo "error logging out";
}*/
exit;

