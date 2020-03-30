import React, { useState } from 'react';

import './product.scss';

import api from '../../api/api';
import imgNotFound from "../../assets/img/no-img.png";

const Product = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [image, setImage] = useState('');
  
  const { product, role } = props;

  const handleSubmit = async (e, productId) => {
    e.preventDefault();

    const form = new FormData();

    form.append('title', title);
    form.append('price', price);
    form.append('platforms', platforms);
    form.append('image', image);

    const response = await api.put(`/products/edit/${productId}`, form);
    
    console.log(form);
    console.log(response);
  }

  const handleCheckbox = (el) => {
    const options = platforms;
    let index;

    if (el.target.checked) {
      options.push(el.target.value);  
    } else {
      index = options.indexOf(el.target.value);
      options.splice(index, 1);
    }

    setPlatforms(options);
    console.log('platforms', platforms);
  }

  return (
    <>
      {
        !editMode ? (
          <div data-component="product">
            <div className="product-header row align-items-start">
              <div className="col-9 left">
                <span className="title">{product.title}</span>
                <span className="platforms">{product.platforms.toString().replace(/,/g, ', ')}</span>
              </div>

              <div className="col-3 right">
                <div className="price">${product.price}</div>
              </div>
            </div>
            
            <div className="wrapper">
              {
                product.image ? (
                  <img src={product.imageUrl} alt={`Imagem do produto ${product.title}`} title={product.title} className="img"/>
                ) : (
                  <img src={`${imgNotFound}`} alt={`Imagem do produto ${product.title}`} title={product.title} className="img"/>
                )
              }
              {
                role === 'master' ? (
                  <button className="main-btn" onClick={() => setEditMode(true)}>Edit product</button>
                ) : (
                  <button className="main-btn">Add to cart</button>
                )
              }
            </div>
          </div>
        ) : (
          <div data-component="product">
            <form className="edit-product-form" onSubmit={e => handleSubmit(e, product._id)}>
              <input 
                className="input-field" 
                type="text" 
                placeholder="Product title"
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
              <input 
                className="input-field" 
                type="text" 
                placeholder="Product price"
                onChange={e => setPrice(e.target.value)}
                value={price}
              />

              <div className="checkbox-list">
                <label htmlFor={`ps4_${product._id}`} className="checkbox-holder">
                  <input 
                    className="hidden-checkbox" 
                    type="checkbox" 
                    name={`platforms_${product._id}`} 
                    id={`ps4_${product._id}`} 
                    value="PS4"
                    onChange={e => handleCheckbox(e)}
                  />
                  <div className="checkbox"></div>
                  <span className="checkbox-label">PS4</span>
                </label>

                <label htmlFor={`xboxone_${product._id}`} className="checkbox-holder">
                  <input 
                    className="hidden-checkbox" 
                    type="checkbox" 
                    name={`platforms_${product._id}`} 
                    id={`xboxone_${product._id}`} 
                    value="XBOX ONE"
                    onChange={e => handleCheckbox(e)}
                  />
                  <div className="checkbox"></div>
                  <span className="checkbox-label">XBOX ONE</span>
                </label>

                <label htmlFor={`pc_${product._id}`}className="checkbox-holder">
                  <input 
                    className="hidden-checkbox" 
                    type="checkbox" 
                    name={`platforms_${product._id}`} 
                    id={`pc_${product._id}`} 
                    value="PC" 
                    onChange={e => handleCheckbox(e)}
                  />
                  <div className="checkbox"></div>
                  <span className="checkbox-label">PC</span>
                </label>
              </div>

              <label htmlFor={`image_${product._id}`} className="input-file-holder">
                <input 
                  id={`image_${product.id}`} 
                  className="input-file" 
                  type="file" 
                  onChange={e => setImage(e.target.files[0])} 
                />
                
                <div className="file-name">
                  { image && (<span>{image.name}</span>) }
                </div>
                <span className="main-btn input-file-btn" type="button">Procurar</span>
              </label>

              <div className="btn-holder">
                <button className="main-btn red" type="button" onClick={() => setEditMode(false)}>cancelar</button>
                <button className="main-btn" type="submit">Salvar</button>
              </div>
            </form>
          </div>
        )
      }
    </>
  );
}

export default Product;
