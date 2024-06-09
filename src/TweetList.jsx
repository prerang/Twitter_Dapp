import React from 'react';
import Tweet from './Tweet';

const TweetList = ({ tweets, likeTweet, deleteTweet, account }) => {
  return (
    <div id="tweetsContainer">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} likeTweet={likeTweet} deleteTweet={deleteTweet} account={account} />
      ))}
    </div>
  );
};

export default TweetList;
