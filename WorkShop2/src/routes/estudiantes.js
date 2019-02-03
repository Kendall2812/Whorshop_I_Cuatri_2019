const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// extrae todo los estudiantes de la tabla
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM estudiantes', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
});

//este busca un usuario por medio del id en la tabla estudiantes
router.get('/:id', (req, res) => {
  const {id} = req.params;
  mysqlConnection.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, rows, 
    fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
  });
});

//este es para insertar nuevos datos en la base de datos
router.post('/', (req, res) => {
  const {id, nombre, apellido, correo, direccion} = req.body;
  const query = `CALL studenAddOrEdit(?,?,?,?,?);`;

  mysqlConnection.query(query, [id, nombre, apellido, correo, direccion], (err, rows, fields) => {
    if(!err){
      res.json({Status: 'Se agrego correctamente'});
    }else{
      console.log(err);
    }
  });
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