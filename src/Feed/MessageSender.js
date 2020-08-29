import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import {
  Videocam as VideocamIcon,
  PhotoLibrary as PhotoLibraryIcon,
  InsertEmoticon as InsertEmoticonIcon,
} from '@material-ui/icons';
import firebase from 'firebase';

import { useStateValue } from '../StateProvider';
import db from '../firebase';
import './MessageSender.css';

const MessageSender = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.collection('posts').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        profilePic: user.photoURL,
        username: user.displayName,
        image: imageUrl,
      });
    } catch (err) {
      console.error(err);
    }

    setInput('');
    setImageUrl('');
  };

  return (
    <div className='messageSender'>
      <div className='messageSender__top'>
        <Avatar src={user.photoURL} />
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='messageSender__input'
            placeholder={`What's on your mind ${user.displayName}?`}
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder='image URL (optional)'
          />
          <button type='submit'>Hidden submit</button>
        </form>
      </div>

      <div className='messageSender__bottom'>
        <div className='messageSender__option'>
          <VideocamIcon style={{ color: 'red' }} />
          <h3>Live Video</h3>
        </div>
        <div className='messageSender__option'>
          <PhotoLibraryIcon style={{ color: 'green' }} />
          <h3>Photo/Video</h3>
        </div>
        <div className='messageSender__option'>
          <InsertEmoticonIcon style={{ color: 'orange' }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
