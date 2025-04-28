import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../../components/productCard"

export default function Items() {
    const [state, setState] = useState("loading") // loading, success, error
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([]) // Store all items to filter from
    const [selectedCategory, setSelectedCategory] = useState("all") // Track selected category
    
    const categories = ["all", "concert", "theratre", "family & others"]

    useEffect(() => {
        if (state === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
                .then((res) => {
                    console.log(res.data)
                    setAllItems(res.data)
                    setItems(res.data)
                    setState("success")
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error || "An error occurred")
                    setState("error")
                })
        }
    }, [state])

    // Filter items when category changes
    useEffect(() => {
        if (selectedCategory === "all") {
            setItems(allItems)
        } else {
            const filteredItems = allItems.filter(
                item => item.category.toLowerCase() === selectedCategory.toLowerCase()
            )
            setItems(filteredItems)
        }
    }, [selectedCategory, allItems])

    // Handler for category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center pt-[50px]">
            {/* Category Filter UI */}
            <div className="w-full max-w-4xl mb-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 py-2 rounded-full ${
                                selectedCategory === category
                                    ? "bg-green-700 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            } transition-colors`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {state === "loading" && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-900 animate-spin"></div>
                </div>
            )}

            {/* Error State */}
            {state === "error" && (
                <div className="text-red-500 text-center">
                    Failed to load events. Please try again.
                </div>
            )}

            {/* Events Display */}
            {state === "success" && (
                <div className="w-full flex flex-wrap justify-center">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <ProductCard key={item.key} item={item} />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            No events found for this category.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}