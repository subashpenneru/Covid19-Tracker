import React from 'react';
import { Avatar } from '@material-ui/core';
import {
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  AccountCircle as AccountCircleIcon,
  NearMe as NearMeIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
} from '@material-ui/icons';

import './Post.css';

const Post = ({ profilePic, image, username, timestamp, message }) => {
  return (
    <div className='post'>
      <div className='post__top'>
        <Avatar src={profilePic} className='post__avatar' />
        <div className='post__topInfo'>
          <h3>{username}</h3>
          <p>{timestamp ? new Date(timestamp.toDate()).toUTCString() : ''}</p>
        </div>
      </div>

      <div className='post__bottom'>
        <p>{message}</p>
      </div>
      <div className='post__image'>
        <img src={image} alt='' />
      </div>

      <div className='post__options'>
        <div className='post__option'>
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className='post__option'>
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className='post__option'>
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className='post__option'>
          <AccountCircleIcon />
          <ExpandMoreOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Post;
