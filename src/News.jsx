import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Bookmark from './Bookmark';
import Slider from "react-slick";
import ShareIcon from '@mui/icons-material/Share';
const News = () => {
  const [articles, setArticles] = useState([]);
  const [topArticles, setTopArticles] = useState([]);

  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  async function newsapi() {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/everything?q=latest&apiKey=9704b7941d5644c0afbd65769b640141`
      );
      let result = await response.json();
      console.log(result);
      setArticles(result.articles);
    } catch (error) {
      console.error("Error fetching the news articles:", error);
    }
  }
  async function fetchTopNews() {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?q=all&apiKey=9704b7941d5644c0afbd65769b640141`
      );
      let result = await response.json();
      setTopArticles(result.articles);
    } catch (error) {
      console.error("Error fetching the top news articles:", error);
    }
  }
  useEffect(() => {
    fetchTopNews();
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <>
      <div className="bg-white py-0 ">

        <Slider {...settings}>
          {topArticles.map((a, index) => (
            <div key={index} className="relative">
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="block">
                <img src={a.urlToImage} alt={a.title} className="w-screen .."  style={{ height: '40vh', objectFit: 'cover' }} />
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

export default News;
