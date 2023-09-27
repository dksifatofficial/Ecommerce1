"use client"

import React, { useEffect, useState } from 'react';
import CommonListing from '@/components/CommonListing';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query || { q: '' }; // Get the search query from the URL

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on the query (name, category, tags, etc.)
    // You can use your MongoDB query logic here to find matching products
    // and set them in the state variable setSearchResults
  }, [q]);

  return (
    <div>
      <h1>Search Results for &quot;{q}&quot;</h1>
      <CommonListing data={searchResults} />
    </div>
  );
};

export default SearchPage;
