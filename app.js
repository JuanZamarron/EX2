const express = require('express')
const request = require('request')

const met = require('./met.js')
const app = express()
const port = process.env.PORT || 3000

app.get('/students/:id', function(req, res){
    if (req.params.id != "A00815058") {
        res.send({
            error: "Matricula no valida"
        })
    } else {
        res.send({
            id: "A00815058",
            fullName: "Juan Carlos Zamarrón Pérez",
            nickName: "Juan",
            age: "24" 
        })
    }
})

app.get('/met', function(req,res){
    const query = req.query.search
    if(!query) {
        return res.send({
          error: 'Incluye palabra a buscar.'
        })
      }
    met.q(query, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }
        const id = response
        met.objectID(id.id, function(error, response){
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                searchTerm: req.query.search,
                artist : response.artist,
                title: response.title,
                year: response.year,
                technique: response.technique,
                metUrl: response.metUrl
              })
        })
    })
})

app.get('*', function(req, res) {
    res.send({
      error: 'Ruta no valida'
    })
})

app.listen(port, function(){
    console.log("Server running")
})
