import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/api';
import { setProducts, setFilters } from '../slices/productSlice';
import ProductCard from '../components/Header';

const Products = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters } = useSelector((state) => state.products);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (localFilters.category) params.append('category', localFilters.category);
        if (localFilters.search) params.append('search', localFilters.search);
        if (localFilters.minPrice) params.append('minPrice', localFilters.minPrice);
        if (localFilters.maxPrice) params.append('maxPrice', localFilters.maxPrice);
        params.append('page', currentPage);
        params.append('limit', 12);

        const response = await api.get(`/products?${params.toString()}`);
        dispatch(setProducts(response));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [dispatch, currentPage, localFilters]);

  const categories = ['sofa', 'bed', 'dining', 'chair', 'table', 'shelves'];

  return (
    <div className="min-h-screen py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="font-bold text-lg mb-4">Filters</h3>

          <div className="mb-6">
            <label className="font-semibold text-sm mb-2 block">Category</label>
            <select
              value={localFilters.category}
              onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
              className="input-field text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="font-semibold text-sm mb-2 block">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={localFilters.search}
              onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold text-sm mb-2 block">Min Price</label>
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="font-semibold text-sm mb-2 block">Max Price</label>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
              className="input-field text-sm"
            />
          </div>
        </aside>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.length > 0 ? (
              products.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
