import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [productCategory, setProductCategory] = useState("Concert");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  async function handleAddItem() {
    // --- Basic Form Validation ---
    if (
      !productKey ||
      !productName ||
      !productPrice ||
      !eventDate ||
      !eventTime ||
      !productCategory ||
      !productDimension ||
      !productDescription
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (productImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (productImages.length > 5) {
      toast.error("You can only upload a maximum of 5 images");
      return;
    }

    const promises = [];
    for (let i = 0; i < productImages.length; i++) {
      const uploadPromise = mediaUpload(productImages[i]);
      promises.push(uploadPromise);
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const imageUrls = await Promise.all(promises);

        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`,
          {
            key: productKey,
            name: productName,
            price: productPrice,
            category: productCategory,
            dateAdded: eventDate,
            timeAdded: eventTime,
            description: productDescription,
            dimension: productDimension,
            image: imageUrls,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        toast.error("Product not added. Please try again.");
      }
    } else {
      toast.error("You are not authorized to perform this action");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-lg font-bold mb-4">Add New Event</h1>
      <div className="w-[400px] border p-4 flex flex-col items-center gap-3 rounded-lg shadow-md">

        <label className="w-full">
          Event Key
          <input
            type="text"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter event key"
          />
        </label>

        <label className="w-full">
          Event Name
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter event name"
          />
        </label>

        <label className="w-full">
          Event Price
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter ticket price"
            min="0"
          />
        </label>

        <label className="w-full">
          Event Date
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="w-full">
          Event Time
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="w-full">
          Category
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="Concert">Concert</option>
            <option value="Theatre">Theatre</option>
            <option value="Family & Others">Family & Others</option>
          </select>
        </label>

        <label className="w-full">
          Event Venue
          <input
            type="text"
            value={productDimension}
            onChange={(e) => setProductDimension(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter venue/location"
          />
        </label>

        <label className="w-full">
          Event Description
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter event description"
          />
        </label>

        <label className="w-full">
          Upload Images (max 5)
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setProductImages(e.target.files)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          onClick={handleAddItem}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Event
        </button>

        <button
          onClick={() => navigate("/admin/items")}
          className="w-full p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
