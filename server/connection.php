<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");


$server = 'localhost';
$user = 'root';
$password = '';
$database = 'ecommerce';
$portno = '3307';

$connection = mysqli_connect($server,$user,$password,$database,$portno);

if(!$connection){
    echo "Something went wrong";
}else{
    echo "Successfully connected";
}
?>