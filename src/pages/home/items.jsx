import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // Store all items to filter from
  const [selectedCategory, setSelectedCategory] = useState("all"); // Track selected category
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality

  const categories = ["all", "concert", "theatre", "family & others"];

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          console.log(res.data);
          setAllItems(res.data);
          setItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, [state]);

  // Filter items when category or search query changes
  useEffect(() => {
    let filteredItems = [...allItems];
    
    // Filter by category first
    if (selectedCategory !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Then filter by search query
    if (searchQuery.trim() !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setItems(filteredItems);
  }, [selectedCategory, searchQuery, allItems]);

  // Handler for category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handler for search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The search filtering is already handled in the useEffect
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section with Search Bar - Purple Design */}
      <div className="bg-indigo-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Let's Book Your Event</h1>
          <p className="text-lg opacity-90 mb-8">
            Book live events and discover concerts, events, theater and more.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex justify-center">
            <input
              type="text"
              placeholder="Search for Events, Artists, Venues"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-3 px-6 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-r-lg flex items-center transition-colors"
            >
              Search
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter UI */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {state === "loading" && (
          <div className="w-full py-32 flex justify-center items-center">
            <div className="w-16 h-16 border-4 rounded-full border-green-600 border-t-transparent animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {state === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Failed to Load Events</h3>
            <p>Please try again later or contact support if the problem persists.</p>
          </div>
        )}

        {/* Events Display */}
        {state === "success" && (
          <>
            <div className="mb-6 flex flex-wrap justify-between items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">
                {searchQuery ? (
                  `Search Results for "${searchQuery}"`
                ) : (
                  selectedCategory === "all" ? "All Events" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + " Events"
                )}
              </h2>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {items.length} {items.length === 1 ? "Event" : "Events"} Found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.length > 0 ? (
                items.map((item) => <ProductCard key={item.key} item={item} />)
              ) : (
                <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Events Found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery 
                      ? "We couldn't find any events matching your search." 
                      : "We couldn't find any events in this category."
                    }
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }} 
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    View All Events
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}