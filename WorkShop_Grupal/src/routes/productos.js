const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');//se necesita instalar por npm

const mysqlConnection = require('../database');

const cors = require("cors");//se necesita instalar por npm

const {
    base64decode
  } = require('nodejs-base64');
  
router.use(cors());


// verifica la autentificacion
router.use('/use', (req, res) => {
    if (req.headers["authorization"]) {
      const authBase64 = req.headers['authorization'].split(' ');
      const userPass = base64decode(authBase64[1]);
      const usario = userPass.split(':')[0];
      const password = userPass.split(':')[1];
  
      //
      if (usario === 'kendall' && password == '2812') {

        res.status(201);
        res.send({
            menssage: "autorizado."
        });
        return;
      }
    }
    res.status(401);
    res.send({
      error: "No autorizado."
    });
    return;
});


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
  });


/* Esta parte es controlar todo lo que tiene que ver con categorias */

// extrae todo los productos de la tabla
router.get('/categoria/', (req, res) => {
    mysqlConnection.query('SELECT * FROM categorias;', (err, rows, fields) => {
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
router.post('/categoria/', (req, res) => {
    const {nombre_categoria, descripcion_categoria} = req.body;
     query = 'INSERT INTO categorias(nombre_categoria, descripcion_categoria) VALUES (?,?)';
    
    if(nombre_categoria != null && nombre_categoria != ""){
        mysqlConnection.query(query, [nombre_categoria, descripcion_categoria], (err, rows, fields) => {
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
  router.put('/categoria/:id_categoria', (req, res) => {
    const {nombre_categoria, descripcion_categoria} = req.body;
    const {id_categoria} = req.params;
    const query = `UPDATE categorias SET nombre_categoria=?,descripcion_categoria=? WHERE id_categoria=?`;
    
    if(nombre_categoria != null && nombre_categoria != ""){
      if(descripcion_categoria != null && descripcion_categoria != ""){
        mysqlConnection.query(query, [nombre_categoria, descripcion_categoria, id_categoria], (err, rows, fields) => {
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
            menssage: 'Falta descripcion.'
        });
      } 
    }else{
        res.status(202).send({
            menssage: 'Falta categoria.'
        });
    } 
  });

  //esta fucion es para eliminar una categoria
  router.delete('/categoria/:id_categoria', (req, res) => {
    const {id_categoria} = req.params;
    mysqlConnection.query('DELETE FROM categorias WHERE id_categoria = ?', [id_categoria] , (err, rows,
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

module.exports = router;