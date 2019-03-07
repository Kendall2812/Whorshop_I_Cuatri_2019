const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


// extrae todo los productos de la tabla
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM productos;', (err, rows, fields) => {
      if(!err) {
        res.json(rows);

        // Devolvemos una respuesta en JSON
        res.status(200).send({
            menssage: 'ok'
        });
      } else {
        console.log(err);
      }
    });  
});

//este es para insertar nuevos datos en la base de datos
router.post('/', (req, res) => {
    const {sku, nombre_producto, descripcion, precio, cantidad, id_categoria} = req.body;
    const query = 'INSERT INTO productos(sku, nombre_producto, descripcion, precio, cantidad, id_categoria) VALUES (?,?,?,?,?,?);',[sku], [nombre_producto], [descripcion], [precio], [cantidad], [id_categoria];
    
    if(id_categoria != null && id_categoria != ""){
        mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            // Devolvemos una respuesta en JSON
            res.status(201).send({
                menssage: 'Created'
            });
        }else{
            console.log(err); 
        }
        }); 
    }
  });
  
  //esta funcion es para acutulizar los datos en la base de datos
  router.put('/:id', (req, res) => {
    const {nombre, apellido,correo,direccion} = req.body;
    const {id} = req.params;
    const query = `CALL studenAddOrEdit(?,?,?,?,?);`;
  
    if(nombre != null && nombre != ""){
      if(apellido != null && apellido != ""){
        if(correo != null && correo != ""){
          if(direccion != null && direccion != ""){
            mysqlConnection.query(query, [id, nombre, apellido, correo, direccion], (err, rows, fields) => {
              if(!err){
                res.json({Status: 'Se actualizo correctamente'});
              }else{
                console.log(err);
              }
            });
          }else{
            res.json({Status: 'La direccion no debe quedar vacia o null.'});
          }
        }else{
          res.json({Status: 'El correo no debe quedar vacio o null.'});
        }
      }else{
        res.json({Status: 'El apellido no debe quedar vacio o null.'});
      } 
    }else{
      res.json({Status: 'El nombre no debe quedar vacio o null.'});
    } 
  });
  
  router.delete('/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM estudiantes WHERE id = ?', [id] , (err, rows,
      fields) => {
        if(!err){
          res.json({status: 'El estudiante fue eliminado.'});
        }else{
          console.log(err);
        }
      })
  })

module.exports = router;