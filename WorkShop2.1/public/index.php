<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../vendor/autoload.php';
//route of Database
require '../src/configuration/db.php';
$app = new \Slim\App;

//route of students
require '../src/routes/students.php';

$app->run();