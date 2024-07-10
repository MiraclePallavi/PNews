
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Bookmark from './Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import axios from "axios";
const SearchResults = () => {
  const [news, setNews] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  async function newsapi() {
    try {
      const API_KEY = '7M2C9Cb8ss8uyKTa76146lLvmmeuneYtsZApRe5W';
      const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
        params: {
          api_token: API_KEY,
          language: 'en',
          categories: `${query}`,
          countries: 'us',
        },
      });
      console.log(response);  // Log the response for debugging
      setNews(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching the news articles:", err);  // Log the error
      setError(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    newsapi();
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles")) || [];
    setBookmarkedArticles(bookmarks);
  }, []);

  const handleBookmark = (article) => {
    const updatedBookmarks = [...bookmarkedArticles, article];
    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem("bookmarkedArticles", JSON.stringify(updatedBookmarks));
  };
  const handleShare = (articleUrl) => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
    <div className="flex flex-wrap -mb-5 gap-x-4 gap-y-3 justify-evenly mt-4">
      {news.map((a, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={a.urlToImage} alt={a.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{a.title}</div>
            <p className="text-gray-700 text-base">{a.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <a href={a.url} className="text-2xl hover:text-blue-500">Read</a>
            </span>
            <span
                className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-end hover:bg-pink-200 cursor-pointer"
                onClick={() => handleBookmark(a)}
              >
                <BookmarkBorderIcon />
              </span>
            <span
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-end hover:bg-green-200 cursor-pointer"
                onClick={() => handleShare(a.url)}
              >
                <ShareIcon />
              </span>
          </div>
        </div>
      ))}
    </div>
    <Bookmark />
   </>

  );
};

export default SearchResults;
