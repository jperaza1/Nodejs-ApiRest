'use strict'

const EXPRESS = require('express')
const BODYPARSER = require('body-parser')
const MONGOOSE = require('mongoose')

const Product = require('./models/product')

const app = EXPRESS()
const PORT = process.env.PORT || 3000

app.use(BODYPARSER.urlencoded({ extended: false }))
app.use(BODYPARSER.json())

//Get de todos los articulos en la base de Datos
app.get('/api/product', (req, res) =>{
  Product.find( {} ,( err, product )=>{
    if(err) return res.satuts(500).send({ message: `Erro al realizar la peticion: ${ err }` })
    if(!product) return res.status(404).send({ message: `No hay Registros en la base de datos` })

    res.status(200).send({ product })
  })
})

//Get con busqueda de Articulos por Id
app.get('/api/product/:productId', (req, res) =>{
  let productId = req.params.productId
  Product.findById(productId, ( err, product ) =>{
    if(err) return res.status(500).send({ message: `Error al realizar la peticion: ${ err }` })
    if(!product) return res.status(404).send({ message: `No hay registro de productId: ${ productId }`})

    res.status(200).send({ product })
  })
})

//Post de un Articulo a la base de Datos
app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err,productStored) =>{
    if(err)res.status(500).send({ message: `Error al Salvar el Producto en la base de datos: ${ err }` })

    res.status(200).send({ product: productStored })
  })
})


app.put('/api/product/:productId', (req, res) =>{

})

app.delete('/api/product/:productId', (req, res) =>{

})
MONGOOSE.connect('mongodb://localhost:27017/shop',(err,res)=>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida..')

  app.listen(PORT, () => {
    console.log(`API REST corriendo en http://localhost:${PORT}`)
  })
})
