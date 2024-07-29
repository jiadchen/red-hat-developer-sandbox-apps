"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { useEnv } from "@/env/provider";

const Hello: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const env = useEnv();

  const handleApiCall = async () => {
    try {
      console.log("called api.");
      const response = await fetch(`${env.API_BASE_URL}/hello`);
      // const response = await fetch(`http://localhost:8080/hello`);
      if (response.ok) {
        const message = await response.text();
        setMessage(message);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Hello Page</title>
      </Head>
      <main>
        <h1>Hello</h1>
        <button onClick={handleApiCall}>API Call</button>
        {message && <p>{message}</p>}
        <div>
          <h2>Environment Variables:</h2>
          <pre>{JSON.stringify(env, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
};

export default Hello;
