import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async () => {
  return await ProductModel.find({});
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};

export const findProductByDetails = async (query, resultPerPage) => {
  let mongoQuery = {};

  if (query.keyword) {
    mongoQuery.name = {
      $regex: query.keyword,
      $options: "i",
    };
  }

  // price
  if (query.price) {
    mongoQuery.price = {};

    if (query.price.gte) {
      mongoQuery.price.$gte = Number(query.price.gte);
    }
    if (query.price.lte) {
      mongoQuery.price.$lte = Number(query.price.lte);
    }
  }

  // category
  if (query.category) {
    mongoQuery.category = query.category;
  }

  // rating
  if (query.rating) {
    mongoQuery.rating = { $gte: Number(query.rating) };
  }

  const page = Number(query.page) || 1;
  const skip = (page - 1) * resultPerPage;

  const totalProducts = await ProductModel.countDocuments(mongoQuery);

  const products = await ProductModel.find(mongoQuery)
    .limit(resultPerPage)
    .skip(skip);

  return {
    totalProducts,
    resultPerPage,
    currentPage: page,
    products,
  };
};
