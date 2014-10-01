<?php

include 'dbconnect.php';
//error_reporting(E_ALL);
?>
<?php
$name= $_POST["name"];
$score= $_POST["scoref"];

//echo $score;
//echo $name;


$sql="INSERT INTO `orbitl`(`name`, `score`) VALUES ('".$name."',".$score.")";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}


mysqli_close($con);

header( 'Location: highscores.php' ) ;
?>