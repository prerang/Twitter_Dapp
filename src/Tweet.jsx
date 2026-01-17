//Making changes in this file

import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Tweet = ({ tweet, likeTweet, deleteTweet, account }) => {
  const handleLike = async () => {
    await likeTweet(tweet.author, tweet.id);
  };

  const handleDelete = async () => {
    await deleteTweet(tweet.id);
  };

  return (
    <div className="tweet">
      {tweet.author.toLowerCase() === account.toLowerCase() && (
        <button className="delete-button" onClick={handleDelete}>
          <i className="fas fa-times"></i>
        </button>
      )}
      <img
        className="user-icon"
        src={`https://robohash.org/${tweet.author}.png?set=set4`}
        alt="User Icon"
      />
      <div className="tweet-inner">
        <div className="author">{shortAddress(tweet.author)}</div>
        <div className="content">{tweet.content}</div>
        <div className="actions">
          <button className="like-button" onClick={handleLike}>
            <i className="far fa-heart"></i>
            <span className="likes-count">{`${tweet.likes}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const shortAddress = (address, startLength = 6, endLength = 4) => {
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export default Tweet;
