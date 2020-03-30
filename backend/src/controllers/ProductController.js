const Product = require('../models/Product');
const fs = require('fs');

// METODOS: index, show, store, update, destroy

module.exports = {

  async index(req, res) {
    const products = await Product.find();

    return res.json(products.reverse());
  },
  
  async store(req, res) {
    const { title, price, platforms } = req.body;
    const { filename } = req.file;

    try {
      product = await Product.create({
        title, 
        price, 
        platforms: platforms.split(',').map(item => item.trim()), 
        image: filename
      });

      return res.json(product);
    } catch(error) {
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) throw err;
      });

      return res.status(400).json({ message: `erro` });
    }
  },

  async update(req, res) {
    const { title, price, platforms } = req.body;
    const { filename } = req.file;
    const id = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      title, 
      price, 
      platforms, 
      image: filename
    }, {useFindAndModify: false}, (err, outdatedProduct) => {
      if (err) return res.status(500).send(err);
      
      fs.unlink(`uploads/${outdatedProduct.image}`, (err) => {
        if (err) return res.status(500).send(err);
      });
    }); 

    return res.status(200).send(updatedProduct);
  },

  async destroy(req, res) {
    const id = req.params.id;

    Product.findByIdAndDelete(id, (err, product) => {
      if (err) return res.status(500).send(err);

      if (product) {
        fs.unlink(`uploads/${product.image}`, (err) => {
          if (err) return res.status(500).send(err)
        });

        return res.status(200).json({ message: `${product.title} was deleted` });
      }

      return res.status(404).json({ message: 'Product not found' })
    })
  }
  
}