function makePlane({
  _id,
  title,
  category,
  description,
  variations,
  price,
  stock,
  image,
  createdAt,
}) {
  if (!Array.isArray(variations)) {
    throw new Error("Product variations must be an array");
  }
  // ... prüfungen

  return {
    title: title || "New Product",
    category,
    description,
    variations,
    price,
    stock,
    image:
      image ||
      "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg",
    createdAt: createdAt || Date.now(),
    //standard wert
    _id,
  };
}

module.exports = {
  makePlane,
};
