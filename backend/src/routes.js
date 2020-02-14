const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/uploads');

const ProductController = require('./controllers/ProductController');

const routes = Router();
const uploads = multer(uploadConfig);

routes.get('/products', ProductController.index);
routes.post('/products', uploads.single('image'), ProductController.store);
routes.delete('/products/delete/:id', ProductController.destroy);
routes.put('/products/edit/:id', uploads.single('image'), ProductController.update);

module.exports = routes;