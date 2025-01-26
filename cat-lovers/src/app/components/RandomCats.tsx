// /app/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const API_BASE = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_2QgyB0VwThl4SBBEoAejBmbl6J4hzmW58yrQbSc6FsvNUNUeVwgLWQr75M2EOXFv';

export default function RandomCats() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRandomCats = async () => {
    setLoading(true);
    const response = await axios.get(`${API_BASE}/images/search?limit=10`, {
      headers: { 'x-api-key': API_KEY },
    });
    setCats((prev) => [...prev, ...response.data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomCats();
  }, []);

  return (
    <div>
      <h1>Random Cats</h1>
      <div>
        {cats.map((cat) => (
        //   <Link href={`/cat/${cat.id}`} key={cat.id}>
        <Image 
            <img src={cat.url} alt="Cat" className="rounded-lg shadow-md" />
        //   </Link>
        ))}
      </div>
      <button
        onClick={fetchRandomCats}
        disabled={loading}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
