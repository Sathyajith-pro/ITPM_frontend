import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
  const location = useLocation();

  const [productKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [eventDate, setEventDate] = useState(location.state.dateAdded);
  const [eventTime, setEventTime] = useState(location.state.timeAdded);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimension, setProductDimension] = useState(location.state.dimension);
  const [productDescription, setProductDescription] = useState(location.state.description);
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  async function handleUpdateItem() {
    // Basic validation
    if (
      !productName.trim() ||
      !productPrice ||
      isNaN(productPrice) ||
      !eventDate.trim() ||
      !eventTime.trim() ||
      !productCategory.trim() ||
      !productDimension.trim() ||
      !productDescription.trim()
    ) {
      toast.error("Please fill in all fields with valid values.");
      return;
    }

    if (productImages.length > 5) {
      toast.error("You can only upload a maximum of 5 images.");
      return;
    }

    let updatingImages = location.state.image;

    if (productImages.length > 0) {
      const promises = [];
      for (let i = 0; i < productImages.length; i++) {
        promises.push(mediaUpload(productImages[i]));
      }
      updatingImages = await Promise.all(promises);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to perform this action.");
      return;
    }

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
        {
          name: productName,
          price: productPrice,
          category: productCategory,
          description: productDescription,
          dimension: productDimension,
          dateAdded: eventDate,
          timeAdded: eventTime,
          image: updatingImages,
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
      toast.error("Failed to update product.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Update Item</h1>
      <div className="w-[400px] border p-4 flex flex-col gap-3 rounded-lg shadow-md">
        
        <label className="font-medium">Event Key</label>
        <input
          disabled
          value={productKey}
          type="text"
          className="border p-2 w-full rounded bg-gray-100 text-gray-500"
        />

        <label className="font-medium">Event Name</label>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          type="text"
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Event Price</label>
        <input
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          type="number"
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Event Date</label>
        <input
          onChange={(e) => setEventDate(e.target.value)}
          value={eventDate}
          type="text"
          placeholder="e.g. 2025-05-15"
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Event Time</label>
        <input
          onChange={(e) => setEventTime(e.target.value)}
          value={eventTime}
          type="text"
          placeholder="e.g. 19:00"
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Category</label>
        <select
          onChange={(e) => setProductCategory(e.target.value)}
          value={productCategory}
          className="border p-2 w-full rounded"
        >
          <option value="Concert">Concert</option>
          <option value="Theatre">Theatre</option>
          <option value="Family & Others">Family & Others</option>
        </select>

        <label className="font-medium">Event Venue</label>
        <input
          onChange={(e) => setProductDimension(e.target.value)}
          value={productDimension}
          type="text"
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Event Description</label>
        <textarea
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          rows={4}
          className="border p-2 w-full rounded"
        />

        <label className="font-medium">Upload New Images (optional, max 5)</label>
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleUpdateItem}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => navigate("/admin/items")}
          className="bg-red-600 text-white p-2 w-full rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
