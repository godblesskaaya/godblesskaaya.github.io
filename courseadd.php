<?php

session_start();

// Check if user is logged in (same as courses.php)
if (!isset($_SESSION['username'])) {
  header("Location: login.php");
  exit;
}

// Include database connection file
require_once("db_connect.php");

// Get form data with validation (add checks for max lengths and required fields)
$course_name = mysqli_real_escape_string($conn, $_POST['course_name']);
$course_code = mysqli_real_escape_string($conn, $_POST['course_code']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$department = mysqli_real_escape_string($conn, $_POST['department']);
$semester = mysqli_real_escape_string($conn, $_POST['semester']);
$year = mysqli_real_escape_string($conn, $_POST['year']);
$instructor = mysqli_real_escape_string($conn, $_POST['instructor']);
$grade = mysqli_real_escape_string($conn, $_POST['grade']);

// Create course insertion query
$sql = "INSERT INTO courses (courseName, courseCode, description, department, semester, year, instructor, grade)
VALUES ('$course_name', '$course_code', '$description', '$department', '$semester', '$year', '$instructor', '$grade')";

// Execute query and handle errors
if (mysqli_query($conn, $sql)) {
  echo "Course added successfully!";
  // Optionally, redirect back to courses.php to display the list
  header("Location: courses.php");
} else {
  echo "Error adding course: " . mysqli_error($conn);
}

mysqli_close($conn);

?>