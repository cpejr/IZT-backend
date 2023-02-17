import express from 'express';
import ProductModel from '../models/ProductModel';

module.exports = {
  async index(require, response){
    try{
      const products = await Product.find();
      return response.status(200).json({products});
    } catch (err){
      response.status(500).json({ error: err.message};
        )
    }
  }
}
