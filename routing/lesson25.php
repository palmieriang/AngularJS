<?php

	header('Access-Control-Allow-Origin: *');  

	$db_host = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "databaseTest";

    $conn = mysqli_connect($db_host, $db_username, $db_password, $db_name) or die("Some error occurred during connection " . mysqli_error($con));

	$sql = "SELECT * FROM employees";

    $result = mysqli_query($conn, $sql);
    if($result)
    {
        $employees = array();
    	while($row = mysqli_fetch_assoc($result))
    	{
            $employee = array();
            $employee['ID'] = $row['ID'];
            $employee['name'] = $row['name'];
            $employee['gender'] = $row['gender'];
            $employee['salary'] = $row['salary'];
            $employees[] = $employee;
    	}

        echo json_encode($employees);

    }
    else
    {
    	echo mysqli_error($conn);
    }

?>