import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { getSvg } from '../services/svg.service'
import { useSelector } from 'react-redux'


export function ProductPreview({ product, onRemoveProduct, toggleFavorites }) {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  function checkIfFavorite() {
    if (!user._id) return
    const productIdx = user.favorites.findIndex(p=>p._id===product._id) 
    if(productIdx !== -1) return 'favorite'
    return ''
  }

  return (
    <article className="product-preview">
      <div
        className="product-wrapper"
        onClick={() => navigate(`/details/${product._id}`)}
      >
        <img
          className="product-img img-bottom"
          src={product.url1}
          alt="Product image"
        />
        <img
          className="product-img img-top"
          src={product.url2}
          alt="Product image"
        />
      </div>
      <NavLink to={product.brand} className="brand">
        {utilService.capFirstLetter(product.brand)}
      </NavLink>
      <h4>
        {product.ctg} {product.model}
      </h4>
      <div className="price-wrapper flex align-center">
        <h5>
          &#8362; <span>{product.price}.00</span>
        </h5>
        <h5>
          &#8362; <span>{product.prevPrice}.00</span>
        </h5>
      </div>
      <div className="icon-container" onClick={() => toggleFavorites(product)}>
                <span
                  className={`heart-icon ${checkIfFavorite()}`}
                  dangerouslySetInnerHTML={{
                    __html: getSvg('heart'),
                  }}
                />
              </div>
    </article>
  )
}
