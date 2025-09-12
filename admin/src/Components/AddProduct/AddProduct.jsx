import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const add_product = async () => {
    try {
      if (!image) {
        alert("Please select an image first");
        return;
      }

      // Step 1: Upload image
      const formData = new FormData();
      formData.append("product", image);

      const uploadRes = await fetch("https://drapify-backend.onrender.com/upload", {
        method: "POST",
        body: formData, // ⚠️ no headers for FormData
      });

      const uploadData = await uploadRes.json();
      console.log("Upload response:", uploadData);

      if (!uploadData.success) {
        alert("Image upload failed: " + (uploadData.error || uploadData.message));
        return;
      }

      // Step 2: Add product with image URL
      const product = {
        ...productDetails,
        image: uploadData.image_url,
      };

      const addRes = await fetch("https://drapify-backend.onrender.com/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const addData = await addRes.json();
      console.log("Add product response:", addData);

      if (addData.success) {
        alert("✅ Product Added Successfully!");
        setProductDetails({
          name: "",
          category: "women",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        alert("❌ Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={add_product} className="addproduct-btn">
        Add
      </button>
    </div>
  );
};

export default AddProduct;
