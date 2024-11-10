import React from 'react'
import ProductCard from './ProductDashboardComponents/ProductCard'

const ProductDashboard = () => {
  return (
    <div className='m-4 px-8'>
      <div>
      <h1 className='text-4xl font-bold'>Your Products</h1>
      <p className='text-base text-slate-400 font-normal'>These are the products which exist in your Organization</p>
      </div>
      <div><ProductCard /></div>

      
    </div>
  )
}

export default ProductDashboard
