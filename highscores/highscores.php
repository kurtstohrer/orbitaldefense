<?php
include 'dbconnect.php';

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="scores.css">
</head>
<body>
<img src="img/logo.png" alt="logo"/>
<div id="con">
<?php

$result = mysqli_query($con,"SELECT * FROM `orbitl` ORDER BY `score` DESC ");

echo "<table>
<tr>
<th>Name</th>
<th>Score</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td class='name'>" . $row['name'] . "</td>";
echo "<td class='score'>" . $row['score'] . "</td>";
echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>
</div>

</body>
</html>




