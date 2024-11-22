// src/pages/SearchResults.jsx
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductCard from '../components/ProductCard';

function SearchResults() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/products/search?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        // Handle error
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [location]);

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Search Results for: {searchQuery}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.length > 0 ? (
          results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
