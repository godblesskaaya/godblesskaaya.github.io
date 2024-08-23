<?php

session_start();


// Include database connection file
require_once("db_connect.php");

// Get form data with validation (add checks for max lengths and required fields)
$name = mysqli_real_escape_string($conn, $_POST['name']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$msg = mysqli_real_escape_string($conn, $_POST['message']);

// Create course insertion query
$sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$msg')";

// Execute query and handle errors
if (mysqli_query($conn, $sql)) {
  echo "Message delivered successfully!";
  echo "<a href='contacts.html'>Say more</a>";
  // Optionally, redirect back to courses.php to display the list
  //header("Location: courses.php");
} else {
  echo "Error delivering message: " . mysqli_error($conn);
}

mysqli_close($conn);

?>