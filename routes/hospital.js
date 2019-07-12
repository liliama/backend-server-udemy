
var express= require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutentication = require('../middlewares/autenticacion');

var app = express();

var Hospital= require('../models/hospital');


//===============================================
// Get de hospital
//===============================================
app.get('/', ( req, res, next ) => {

    Hospital.find( { })
    .exec(
        (err, hospitales) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando Hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true, 
                hospitales: hospitales
            });

        });	

        

});

//===============================================
// Actualizar  hospital
//===============================================
app.put('/:id', mdAutentication.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;
    // res.status(200).json({
    //     ok: true, 
    //     body: body
    // });

    Hospital.findById( id, (err, hospital ) => {

        if(err) {
            return  res.status(500).json({
                ok: false, 
                mensaje: 'Error al buscar hospital',
                errors: err
            });
        }

        if(!hospital) {
            return  res.status(400).json({
                ok: false, 
                mensaje: 'El hospital con el id' + id +' no existe',
                errors: {message: 'No existe un hospital con ese ID'}
            });
        }

        hospital.nombre = body.nombre;
        //hospital.u= body.Usuario.nombre;

        hospital.save( (err, hospitalGuardado) => {

            if(err) {
                return  res.status(400).json({
                    ok: false, 
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }

            

            res.status(200).json({
                    ok: true, 
                    hospital: hospitalGuardado
                });
        });

    });

});

//===============================================
// Crear un nuevo Hospital
//===============================================
app.post('/', mdAutentication.verificaToken, (req, res ) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img
    });

    hospital.save( (err, hospitalGuardado ) => {

        if(err) {
            return  res.status(400).json({
                ok: false, 
                mensaje: 'Error al crear Hospital',
                errors: err
            });
        }


        res.status(201).json({
                ok: true, 
                hospital: hospitalGuardado

            });
    });  
});


//======================================================================
//Eliminar un hospital por id
//======================================================================
app.delete('/:id', mdAutentication.verificaToken, (req, res ) => {

    var id =req.params.id;

    Hospital.findByIdAndRemove( id, (err, hospitalBorrado) => {

        if(err) {
            return  res.status(500).json({
                ok: false, 
                mensaje: 'Error al borar usuario',
                errors: err
            });
        }

        if(!hospitalBorrado) {
            return  res.status(400).json({
                ok: false, 
                mensaje: 'No existe usuario con ese id',
                errors: { message: 'No existe un usuario con ese ID'}
            });
        }


        res.status(200).json({
                ok: true, 
                hospital: hospitalBorrado
            });


    });

});



module.exports = app;
