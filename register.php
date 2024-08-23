<?php
session_start();

// Include database connection file
require_once("db_connect.php");

// Define a function to handle file upload
function handleFileUpload($fileInputName, $allowedExtensions = []) {

    // Get the uploaded file information
    $file = $_FILES[$fileInputName];
  
    // Check for upload errors (0 - no error)
    if ($file['error'] !== 0) {
      $error = "Error uploading file: " . $file['error'];
      return false;
    }
  
    // Check if a file was actually uploaded
    if ($file['size'] === 0) {
      $error = "No file uploaded.";
    }
  
    // Get file name and extension
    $fileName = $file['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
  
    // Validate file extension (optional)
    if (!empty($allowedExtensions) && !in_array($fileExtension, $allowedExtensions)) {
      $error = "Invalid file type. Allowed extensions: " . implode(", ", $allowedExtensions);
      return false;
    }
  
    // Generate a unique filename (prevents overwriting existing files)
    $newFileName = uniqid('', true) . "." . $fileExtension;
  
    // Define a destination directory for uploads
    $uploadDir = 'uploads/';
  
    // Check if upload directory exists, create it if not
    if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0777, true); // Create directory recursively with permissions
    }
  
    // Move uploaded file to the destination directory
    $destination = $uploadDir . $newFileName;
    if (move_uploaded_file($file['tmp_name'], $destination)) {
      return $newFileName;
    } else {
      $error = "Error moving uploaded file.";
      return false;
    }
  }
  
// User input variables (escape for security)
if (isset($_POST['submit'])) {
$firstname = mysqli_real_escape_string($conn, $_POST['firstName']);
$middlename = mysqli_real_escape_string($conn, $_POST['middleName']);
$surname = mysqli_real_escape_string($conn, $_POST['surname']);
$username = mysqli_real_escape_string($conn, $_POST['username']);
$password = $_POST['password'];
$email = mysqli_real_escape_string($conn, $_POST['email']);
$mobilenumber = mysqli_real_escape_string($conn, $_POST['mobileNumber']);

// Handle file upload
$uploadedFileName = handleFileUpload('cv', ['pdf', 'docx']);  // Allow PDF and DOCX formats

// Hash password using bcrypt (minimum cost of 12)
$hashed_password = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

if ($uploadedFileName !== false) { // Check for successful upload
// Create user registration query
$sql = "INSERT INTO users (firstname, middlename, surname, username, password, email, mobilenumber, cvfilename) VALUES ('$firstname', '$middlename', '$surname', '$username', '$hashed_password', '$email', '$mobilenumber', '$uploadedFileName')";

// Execute query and handle errors
if (mysqli_query($conn, $sql)) {
  $msg = "Registration successful! You can now login to the website";
} else {
  $msg = "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
}else {
    $msg = "Error uploading CV<br>"; // Display upload error message
}
}
?>


<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Register</title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/Footer-Dark-icons.css">
    <link rel="stylesheet" href="assets/css/Hero-Clean-images.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <header id="main-header">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p id="myname" class="brand">GODBLESS KAAYA</p>
                    <div class="row" id="navabar">
                        <div class="col">
                            <ul class="nav nav-tabs nav-justified">
                                <li class="nav-item"><a class="nav-link" href="index.html" style="color: #fed136;">HOME</a></li>
                                <li class="nav-item"><a class="nav-link" href="about.html" style="color: #fed136;">ABOUT ME</a></li>
                                <li class="nav-item"><a class="nav-link" id="nav-active" href="#">REGISTER</a></li>
                                <li class="nav-item"><a class="nav-link" href="courses.php" style="color: #fed136;">COURSES&nbsp;</a></li>
                                <li class="nav-item"><a class="nav-link" href="cv.html" style="color: #fed136;">CV&nbsp;</a></li>
                                <li class="nav-item"><a class="nav-link" href="contacts.html" style="color: #fed136;">CONTACTS</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2"><img class="img-thumbnail border rounded-pill border-0" src="assets/img/2023-04-03579.jpg" width="150px" alt="profile photo" loading="eager"></div>
            </div>
        </div>
    </header>
    <section id="hero">
        <div class="container">
            <div class="heading">
                <h2 class="text-center">Register</h2>
            </div>
            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col" id="form-container">
                <?php if (isset($msg)) { 
                     echo "<p style='color: green;'>" . $msg . "</p>";
                }?>

                    <form id="registrationform" enctype="multipart/form-data" class="border rounded border-0 shadow-lg p-3 p-md-5" data-bs-theme="light" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <div class="mb-3"><label class="form-label" for="first-name">First Name</label><input class="form-control" type="text" id="first-name" name="firstName"></div>
                        <div class="mb-3"><label class="form-label" for="middle-name">Middle Name</label><input class="form-control" type="text" id="middle-name" name="middleName"></div>
                        <div class="mb-3"><label class="form-label" for="surname">Surname</label><input class="form-control" type="text" id="surname" name="surname"></div>
                        <div class="mb-3"><label class="form-label" for="username">Username</label><input class="form-control" type="text" id="username" name="username"></div>
                        <div class="mb-3"><label class="form-label" for="password">Password</label><input class="form-control" type="password" id="password" name="password"><p id="passworderror" style="color: red;"></p></div>
                        <div class="mb-3"><label class="form-label" for="cv">cv</label><input class="border rounded-pill form-control" type="file" id="cv" name="cv"></div>
                        <fieldset>
                            <legend>Contact Information</legend>
                            <div class="mb-3"><label class="form-label" for="email">Email</label><input class="form-control" type="text" id="email" name="email"><p id="emailerror" style="color: red;"></div>
                            <div class="mb-3"><label class="form-label" for="mobile-number">Mobile Number</label><input class="form-control" type="tel" maxlength="12" id="mobile-number" name="mobileNumber"></div>
                        </fieldset>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-md-6 offset-lg-3 button"><input class="btn btn-primary d-block w-100" type="submit" style="background: #002654;color: #fed136;" name="submit" value="Register"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 offset-lg-3 button">
                                    <p style="margin-top: 10px;margin-bottom: 5px;">Have an account?<a href="login.php" style="margin-left: 20px;">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-2"></div>
            </div>
        </div>
    </section>
    <footer class="text-center" style="background: #002654;">
        <div class="container py-4 py-lg-5">
            <ul class="list-inline">
                <li class="list-inline-item me-4"><a href="about.html#past" style="color: #fed136;">Past</a></li>
                <li class="list-inline-item me-4"><a href="about.html#present" style="color: #fed136;">Present</a></li>
                <li class="list-inline-item"><a href="about.html#future" style="color: #fed136;">Future</a></li>
            </ul>
            <ul class="list-inline">
                <li class="list-inline-item me-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-facebook" style="color: #fed136;">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>
                    </svg></li>
                <li class="list-inline-item me-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-twitter" style="color: #fed136;">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"></path>
                    </svg></li>
                <li class="list-inline-item"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-instagram" style="color: #fed136;">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path>
                    </svg></li>
            </ul>
            <p class="mb-0" style="color: rgb(254,209,54);">Copyright © 2024 Godbless</p>
        </div>
    </footer>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script>
    function validateForm(event) {

        let isValid = true;
      // Get references to form elements
      var firstName = document.getElementById("first-name");
      var middleName = document.getElementById("middle-name");
      var surname = document.getElementById("surname");
      var username = document.getElementById("username");
      var password = document.getElementById("password");
      var cv = document.getElementById("cv");  // File input doesn't require specific validation here
      var email = document.getElementById("email");
      var mobileNumber = document.getElementById("mobilenumber");

      // Check if all fields are filled
      if (firstName.value === "" || middleName.value === "" || surname.value === "" || username.value === "" || password.value === "" || email.value === "" || mobileNumber.value === "") {
        alert("Please fill out all required fields.");
        event.preventDefault(); // Prevent default form submission
        isValid = false;
      }

      // Email validation
     // var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var emailRegex = /^([a-zA-Z0-9_.+\-%]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email.value)) {
        var message = "Please enter a valid email address.";
        // email.setAttribute("placeholder", message);
        var errorbox = document.getElementById("emailerror");
        errorbox.textContent = message;
        event.preventDefault(); // Prevent default form submission
        isValid = false;
      }else{
        var errorbox = document.getElementById("emailerror");
        errorbox.textContent = '';
      }

      // Password validation (at least 10 characters, alphanumeric + special characters)
      var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^\s]{10,}$/;
      if (!passwordRegex.test(password.value)) {
        var message = "Password must be at least 10 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
        var errorbox = document.getElementById("passworderror");
        errorbox.textContent = message;
        event.preventDefault(); // Prevent default form submission
        isValid = false;
      }else{
        var errorbox = document.getElementById("passworderror");
        errorbox.textContent = '';
      }

      // All validations passed, allow form submission
      return isValid;
    }

    // Attach the validation function to the form's submit event
    var form = document.getElementById("registrationform");
    form.addEventListener("submit", validateForm);

  </script>

</body>

</html>