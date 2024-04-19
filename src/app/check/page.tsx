"use client";
import React, { useEffect, useState } from "react";

const NewsPage: React.FC = () => {
  const [latestNews, setLatestNews] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the latest news from an API
    fetch("https://api.example.com/news")
      .then((response) => response.json())
      .then((data) => setLatestNews(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      {latestNews.map((news, index) => (
        <p key={index}>{news}</p>
      ))}
    </div>
  );
};

export default NewsPage;
