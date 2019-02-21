<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//obtener todos los estudiantes
$app->get('/api/students', function(Request $request, Response $response){
    $sql = "SELECT * FROM estudiantes";
    try{
      $conexion = new db();
      $db = $conexion->connection();
      $resultado = $db->query($sql);
      if ($resultado->rowCount() > 0){
        $studen = $resultado->fetchAll(PDO::FETCH_OBJ);

        header("HTTP/1.0 200");
        header('Location: http://localhost/WorkShop3_2019/public/api/students');
        header('Content-Type: application/json');
        echo json_encode($studen);
        /*esto es para convertir en formato JSON
        $datos2 = array();
        foreach($studen as $fila) {
            $nombre = $fila->nombre;
            $apellido = $fila->apellido;
            $correo = $fila->correo;
            $direccion = $fila->direccion;
            array_push($datos2,$nombre,$apellido,$correo,$direccion);
        }
        echo json_encode($datos2, JSON_FORCE_OBJECT);
        $response.json_encode($datos2, JSON_FORCE_OBJECT);*/

      }else {
        header("HTTP/1.0 204 No Content");
        echo json_encode("No existen  en la BBDD.");
      }
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}}';
    }
});

// GET Recueperar cliente por ID 
$app->get('/api/students/{id}', function(Request $request, Response $response){
    $id_student = $request->getAttribute('id');
    $sql = "SELECT * FROM estudiantes WHERE id = $id_student";
    try{
      $db = new db();
      $db = $db->connection();
      $resultado = $db->query($sql);
      if ($resultado->rowCount() > 0){
        $estudiante = $resultado->fetchAll(PDO::FETCH_OBJ);

        header("HTTP/1.0 200");//status code
        header('Location: http://localhost/WorkShop3_2019/public/api/students/id');
        header('Content-Type: application/json');
        echo json_encode($estudiante);
      }else {
        header("HTTP/1.0 204 No Content");
        echo json_encode("No existen estudiante en la BBDD con este ID.");
      }
    }catch(PDOException $e){
      echo '{"error" : {"text":'.$e->getMessage().'}}';
    }
}); 

//POST agregar estudiante
$app->post('/api/students/nuevo', function(Request $request, Response $response){
    $nombre = $request->getParam('nombre');
    $apellidos = $request->getParam('apellido');
    $correo = $request->getParam('correo');
    $direccion = $request->getParam('direccion'); 
  
    $sql = "INSERT INTO estudiantes (nombre, apellido, correo, direccion) VALUES 
        (:nombre, :apellido, :correo, :direccion)";
    try{
        $db = new db();
        $db = $db->connection();
        $resultado = $db->prepare($sql);
        $resultado->bindParam(':nombre', $nombre);
        $resultado->bindParam(':apellido', $apellidos);
        $resultado->bindParam(':correo', $correo);
        $resultado->bindParam(':direccion', $direccion);
        $resultado->execute();

        header("HTTP/1.0 201");//status code
        header('Location: http://localhost/WorkShop3_2019/public/api/students/nuevo');
        header('Content-Type: application/json');
        echo json_encode("Estudiante Creado.");  

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}}';
    }
});

//PUT Actulizar datos estudiantes
$app->put('/api/students/modificar/{id}', function(Request $request, Response $response){
    $id_student = $request->getAttribute('id');
    $nombre = $request->getParam('nombre');
    $apellido = $request->getParam('apellido');
    $correo = $request->getParam('correo');
    $direccion = $request->getParam('direccion'); 
    
    $sql = "UPDATE estudiantes SET nombre = :nombre, apellido = :apellido, correo = :correo, direccion = :direccion WHERE id = $id_student";
    try{
        $db = new db();
        $db = $db->connection();
        $resultado = $db->prepare($sql);
        $resultado->bindParam(':nombre', $nombre);
        $resultado->bindParam(':apellido', $apellido);
        $resultado->bindParam(':correo', $correo);
        $resultado->bindParam(':direccion', $direccion);
        $resultado->execute();

        header("HTTP/1.0 200");//status code
        header('Location: http://localhost/WorkShop3_2019/public/api/students/modificar/id');
        header('Content-Type: application/json');
        echo json_encode("Estudiante actulizado.");  

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}}';
    }
});

//Delete estudiante
$app->delete('/api/students/delete/{id}', function(Request $request, Response $response){
    $id_student = $request->getAttribute('id');
    $sql = "DELETE FROM estudiantes WHERE id = $id_student";

    try{
        $db = new db();
        $conexion = $db->connection();
        $resultado = $conexion->prepare($sql);
        $resultado->execute();

        if($resultado->rowCount() > 0){
            header("HTTP/1.0 204");//status code
            header('Location: http://localhost/WorkShop3_2019/public/api/students/delete/id');
            header('Content-Type: application/json');
            echo json_encode("No Content");
        }else{
            echo json_encode("No existe estudiante.");
        }
    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}}';
    }
});