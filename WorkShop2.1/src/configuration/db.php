<?php

class db
{
    private $host = 'localhost';
    private $user = 'root';
    private $pass = '';
    private $dbName = 'alumnos';

    //connection to the Data Base 
    public function connection(){
        $mysqlConnect = "mysql:host=$this->host;dbname=$this->dbName";
        $dbConnecion = new PDO($mysqlConnect, $this->user, $this->pass);
        $dbConnecion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbConnecion;
    }
}
?>