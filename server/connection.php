<?php
header("Access-Control-Allow-Origin:*");

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