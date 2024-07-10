import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Bookmark from './Bookmark';
import Slider from "react-slick";
import ShareIcon from '@mui/icons-material/Share';
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const fetchNews = async () => {
    try {
      const API_KEY = '7M2C9Cb8ss8uyKTa76146lLvmmeuneYtsZApRe5W';
      const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
        params: {
          api_token: API_KEY,
          language: 'en',
          categories: 'all',
          countries: 'us',
        },
      });
      console.log(response);  // Log the response for debugging
      setArticles(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching the news articles:", err);  // Log the error
      setError(err);
      setLoading(false);
    }
  };

  const fetchTopNews = async () => {
    try {
      const API_KEY = '7M2C9Cb8ss8uyKTa76146lLvmmeuneYtsZApRe5W';
      const response = await axios.get('https://api.thenewsapi.com/v1/news/top', {
        params: {
          api_token: API_KEY,
          language: 'en',
          categories: 'trending',
          countries: 'us',
        },
      });
      console.log(response);  // Log the response for debugging
      setTopArticles(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching the top news articles:", err);  // Log the error
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchTopNews();
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles: {error.message}</p>;

  return (
    <>
      <div className="bg-white py-0 ">
        <Slider {...settings}>
          {topArticles.map((a, index) => (
            <div key={index} className="relative">
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="block">
                <img src={a.urlToImage} alt={a.title} className="w-screen" style={{ height: '40vh', objectFit: 'cover' }} />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-xl font-medium text-white text-center px-2">{a.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-wrap -mb-5 gap-x-4 gap-y-3 justify-evenly mt-5">
        {articles.map((a, index) => (
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
                className=" bg-gray-200 rounded-full px
-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-end hover:bg-green-200 cursor-pointer"
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

export default News;
