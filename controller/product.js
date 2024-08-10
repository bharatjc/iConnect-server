const Product = require("../model/Product");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const path = require("path");

async function createProduct(req, res) {
  try {
    const ProductSchema = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required().integer().min(1),
      stock: Joi.number().required().integer().min(1),
      description: Joi.string(),
    });
    let status = ProductSchema.validate(req.body, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (status.error) {
      let errors = status.error.details.map((detail) => {
        return {
          message: detail.message,
          field: detail.context.key,
        };
      });
      return res.status(400).send({
        msg: "Bad request",
        errors,
      });
    }

    let uploadFile = req.files?.image;
    let image = "";
    if (uploadFile) {
      let extension = path.extname(uploadFile.name);
      let fileName = path.parse(uploadFile.name).name;
      let rootpath = path.resolve();
      fileName = `${fileName}-${Date.now()}${extension}`;
      let finalPath = path.join(rootpath, "uploads", fileName);
      image = `/uploads/${fileName}`;
      uploadFile.mv(finalPath, (err) => {
        console.log({ err });
      });
    }
    let product = await Product.create({
      ...req.body,
      user: req.user._id,
      image: image,
    });
    return res.send(product);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
}

async function updateProduct(req, res) {
  res.send("Product updated successfully!");
}

function getMessage(req, res) {
  res.send("Hello guys!");
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    let result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).send("Product was not found");
    }
    return res.send("Product removed successfully");
  } catch (err) {
    return res.send(`Error: ${err.message}`);
  }
}

async function fetchData(req, res) {
  let searchTerm = req.query.search || "";
  let price = req.query.price;
  let sort = {
    createdAt: -1,
  };
  if (req.query.sort) {
    if (req.query.sort == "DateAsc") {
      sort = {
        createdAt: 1,
      };
    } else if (req.query.sort == "DateDesc") {
      sort = {
        createdAt: -1,
      };
    } else if (req.query.sort == "nameAsc") {
      sort = {
        name: 1,
      };
    } else if (req.query.sort == "nameDesc") {
      sort = {
        name: -1,
      };
    }
  }
  let products = await Product.find({
    $and: [{ name: RegExp(searchTerm, "i") }, { price: { $gt: price } }],
  }).sort(sort);
  res.send(products);
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchData,
  getMessage,
};
