const Product = require('../models/Product');
const fs = require('fs');

// METODOS: index, show, store, update, destroy

module.exports = {

  async index(req, res) {
    const products = await Product.find();

    products.sort((a, b) => b.id - a.id);

    return res.json(products);
  },
  
  async store(req, res) {
    const { title, price, platforms, image, id } = req.body;
    const { filename } = req.file;

    let product = await Product.findOne({ id });

    if (!product) {
      product = await Product.create({
        title, 
        price, 
        platforms: platforms.split(',').map(item => item.trim()), 
        image: filename, 
        id
      });

      console.log(product);
      return res.json(product);
    } else {
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) throw err;
      });

      return res.status(400).json({ message: `Produto com o mesmo id já existente` });
    }
  },

  async destroy(req, res) {
    const id = req.params.id;

    let product = await Product.findOne({ id });

    if (product) {
      Product.deleteOne({ id: id }, (error) => {
        if (error) {
          console.log(error);
          return res.json({ message: `Erro ao deletar o produto ${product.title} com id: ${id}`});
        } else {
          console.log(`Produto ${product.title} com id: ${id} foi deletado!`);
          
          fs.unlink(`uploads/${product.image}`, (err) => {
            if (err) throw err;
            console.log(`deleted file ${product.image}`);
          });

          return res.status(200).json({ message: `Produto ${product.title} com id: ${id} foi deletado com sucesso!` });
        }
      })
    } else {
      return res.status(400).json({ message: `Produto não encontrado` });
    }
  },

  async update(req, res) {
    const { title, price, platforms } = req.body;
    const { filename } = req.file;
    const id = req.params.id;

    let product = await Product.findOne({ id });

    console.log(product);

    if (product) {
      fs.unlink(`uploads/${product.image}`, (err) => {
        if (err) throw err;
        console.log(`deletada imagem antiga ${product.image}`);
      });

      product = await Product.updateOne({ id: id }, { $set: { title, price, platforms, image: filename } }, (error) => {
        if (error) {
          console.log(error);
          return res.json({ message: `Erro ao editar o produto ${product.title} com id: ${id}`});
        } else {
          console.log(`Produto ${product.title} com id: ${id} foi atualizado!`);
          return res.status(200).json({ message: `Produto ${product.title} com id: ${id} foi atualizado com sucesso!` });
        }
      });
    } else {
      fs.unlink(`uploads/${filename}`, (err) => {
        if (err) throw err;
      });

      return res.status(400).json({ message: `Produto não encontrado!` });
    }
  }
  
}