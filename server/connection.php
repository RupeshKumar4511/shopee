<?php
header("Access-Control-Allow-Origin: http://localhost:5173",true);
header("Access-Control-Allow-Credentials: true",true);
header("Access-Control-Allow-Headers: Content-Type, Authorization",true);
header("Access-Control-Allow-Methods: POST, OPTIONS",true);
header("Content-Type: application/json");                   


$server = 'localhost';
$user = 'root';
$password = '';
$database = 'ecommerce';
$portno = '3307';

$connection = mysqli_connect($server,$user,$password,$database,$portno);

if(!$connection){
    echo "Something went wrong";
}else{
    // echo "Successfully connected";
}
?>