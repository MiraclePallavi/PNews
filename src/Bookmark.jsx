
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const Bookmark = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedArticles")) || [];
    setBookmarkedArticles(bookmarks);
  }, []);

  const handleDeleteBookmark = (article) => {
    const updatedBookmarks = bookmarkedArticles.filter(
      (bookmark) => bookmark.url !== article.url
    );
    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem("bookmarkedArticles", JSON.stringify(updatedBookmarks));
  };

  return (
    <div>
      <h2>Bookmarked Articles</h2>
      <div className="flex flex-wrap -mb-5 gap-x-4 gap-y-3 justify-evenly">
        {bookmarkedArticles.map((a, index) => (
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
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 float-end hover:bg-red-200 cursor-pointer"
                onClick={() => handleDeleteBookmark(a)}
              >
                <DeleteIcon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
