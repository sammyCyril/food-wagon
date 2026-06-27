import { Request, Response } from "express";

import Product from "../models/product.model";
import slugify from "slugify";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import Notification from "../models/notification.model";

// CREATE PRODUCT
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const {
      name,
      description,
      price,
      category,
      stock,
      place,
      sku,
      unit,
    } = req.body;

    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: "Image is required",
      });

      return;
    }

    // CHECK SKU
    const existingSku = await Product.findOne({
      sku,
    });

    if (existingSku) {
      res.status(400).json({
        message: "SKU already exists",
      });

      return;
    }

    let status: "Active" | "Low Stock" | "Out Of Stock" = "Active";

    if (Number(stock) <= 0) {
      status = "Out Of Stock";
    } else if (Number(stock) <= 10) {
      status = "Low Stock";
    }

    const uploadResult: any =
      await uploadToCloudinary(
        file.buffer
      );

    const image =
      uploadResult.secure_url;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const product =
      await Product.create({
        name,
        slug,
        sku,
        description,
        price: Number(price),
        image,
        category,
        stock: Number(stock),
        place,
        unit,
        status,
      });

    res.status(201).json(product);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET ALL PRODUCTS
export const getProducts = async ( _req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    }); 
  }
};

// GET SINGLE PRODUCTS
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    res.status(200).json(product);

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    let image = product.image;

    if (req.file) {
      const uploadedImage: any =
        await uploadToCloudinary(
          req.file.buffer
        );

      image = uploadedImage.secure_url;
    }

    const stock =
      req.body.stock !== undefined
        ? Number(req.body.stock)
        : product.stock;

    let status:
      | "Active"
      | "Low Stock"
      | "Out Of Stock" =
      "Active";

    if (stock <= 0) {
      status = "Out Of Stock";
    } else if (stock <= 10) {
      status = "Low Stock";
    }

    const updatedData: any = {
      ...req.body,
      stock,
      status,
      image,
    };

    if (req.body.name) {
      updatedData.slug = slugify(
        req.body.name,
        {
          lower: true,
          strict: true,
        }
      );
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
        }
      );

    await Notification.create({
      title: "Product Updated",
      message: `${updatedProduct?.name} was updated`,
      type: "product",
    });

    if (
      stock <= 5 &&
      product.stock > 5
    ) {
      await Notification.create({
        title: "Low Stock",
        message: `${updatedProduct?.name} has only ${stock} items left`,
        type: "product",
      });
    }

    if (
      stock === 0 &&
      product.stock > 0
    ) {
      await Notification.create({
        title: "Out Of Stock",
        message: `${updatedProduct?.name} is out of stock`,
        type: "product",
      });
    }

    res.status(200).json(
      updatedProduct
    );

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });

      return;
    }

    res.status(200).json({
      message:
        "Product deleted successfully",
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });

  }

};
// UPDATE