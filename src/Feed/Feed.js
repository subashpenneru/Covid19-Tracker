import React, { useState, useEffect } from 'react';

import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './Post';
import db from '../firebase';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className='feed'>
      <StoryReel />
      <MessageSender />
      {posts.map(({ id, data }) => (
        <Post
          key={id}
          profilePic={data.profilePic}
          message={data.message}
          timestamp={data.timestamp}
          username={data.username}
          image={data.image}
        />
      ))}
    </div>
  );
};

export default Feed;
