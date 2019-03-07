const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

/* Esta parte es controlar todo lo que tiene que ver con productos */

// extrae todo los productos de la tabla
router.get('/producto/', (req, res) => {
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
router.post('/producto/', (req, res) => {
    const {sku, nombre_producto, descripcion, precio, cantidad, id_categoria} = req.body;
     query = 'INSERT INTO productos(sku, nombre_producto, descripcion, precio, cantidad, id_categoria) VALUES (?,?,?,?,?,?)';
    
    if(id_categoria != null && id_categoria != ""){
        mysqlConnection.query(query, [sku, nombre_producto, descripcion, precio, cantidad, id_categoria], (err, rows, fields) => {
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
  router.put('/producto/:id_producto', (req, res) => {
    const {sku, nombre_producto, descripcion, precio, cantidad, id_categoria} = req.body;
    const {id_producto} = req.params;
    const query = `UPDATE productos SET sku=?,nombre_producto=?,descripcion=?,precio=?,cantidad=?,id_categoria=? WHERE id_producto=?`;

    if(sku != null && sku != ""){
      if(nombre_producto != null && nombre_producto != ""){
        if(descripcion != null && descripcion != ""){
          if(precio != null && precio != ""){
              if(cantidad != null && cantidad != ""){
                if(id_categoria != null && id_categoria != ""){
                    mysqlConnection.query(query, [sku, nombre_producto, descripcion, precio, cantidad, id_categoria, id_producto], (err, rows, fields) => {
                        if(!err){
                            res.status(200).send({
                                menssage: 'actualizo correctamente.'
                            });
                        }else{
                          console.log(err);
                        }
                      });
                }else{
                    res.status(202).send({
                        menssage: 'Falta categoria'
                    });
                }
              }else{
                res.status(202).send({
                    menssage: 'Falta cantidad.'
                });
              }
          }else{
            res.status(202).send({
                menssage: 'Falta precio.'
            });
          }
        }else{
            res.status(202).send({
                menssage: 'Falta descripcion.'
            });
        }
      }else{
        res.status(202).send({
            menssage: 'Falta nombre producto.'
        });
      } 
    }else{
        res.status(202).send({
            menssage: 'Falta sku.'
        });
    } 
  });

  //esta fucion es para eliminar un producto
  router.delete('/producto/:id_producto', (req, res) => {
    const {id_producto} = req.params;
    mysqlConnection.query('DELETE FROM productos WHERE id_producto = ?', [id_producto] , (err, rows,
      fields) => {
        if(!err){
            res.status(204).send({
                menssage: 'No Content'
            });
        }else{
          console.log(err);
        }
      })
  })


/* Esta parte es controlar todo lo que tiene que ver con categorias */

module.exports = router;