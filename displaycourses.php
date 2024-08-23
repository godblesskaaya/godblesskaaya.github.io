<?php

// Include database connection file
require_once("db_connect.php");

function display_courses() {
  global $conn; // Access global connection variable

  $sql = "SELECT * FROM courses"; // Change table name if different

  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    echo "<table border=2px>";
    echo "<tr  style='background: #002654;color: #fed136;'><th>Course Name</th><th>Course Code</th><th>Description</th><th>Department</th><th>Semester</th><th>Year</th><th>Instructor</th><th>Grade</th></tr>";
    while ($row = mysqli_fetch_assoc($result)) {
      echo "<tr>";
      echo "<td>" . $row['courseName'] . "</td>";
      echo "<td>" . $row['courseCode'] . "</td>";
      echo "<td>" . $row['description'] . "</td>";
      echo "<td>" . $row['department'] . "</td>";
      echo "<td>" . $row['semester'] . "</td>";
      echo "<td>" . $row['year'] . "</td>";
      echo "<td>" . $row['instructor'] . "</td>";
      echo "<td>" . $row['grade'] . "</td>";
      echo "</tr>";
    }
    echo "</table>";
  } else {
    echo "No courses found.";
  }

  mysqli_close($conn);
}

?>
