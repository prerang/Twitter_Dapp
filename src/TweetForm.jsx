import React, { useState } from 'react';

const TweetForm = ({ createTweet }) => {
  const [tweetContent, setTweetContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tweetContent.trim() === '') {
      alert('Tweet content cannot be empty');
      return;
    }
    await createTweet(tweetContent);
    setTweetContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        rows="4"
        placeholder="What's happening?"
      ></textarea>
      <br />
      <button type="submit">Tweet</button>
    </form>
  );
};

export default TweetForm;
