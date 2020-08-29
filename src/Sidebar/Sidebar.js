import React from 'react';
import {
  EmojiFlags as EmojiFlagsIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
  Storefront as StorefrontIcon,
  VideoLibrary as VideoLibraryIcon,
  ExpandMoreOutlined as ExpandMoreOutlinedIcon,
} from '@material-ui/icons';

import SidebarRow from './SidebarRow';
import { useStateValue } from '../StateProvider';
import './Sidebar.css';

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='sidebar'>
      <SidebarRow src={user.photoURL} title={user.displayName} />
      <SidebarRow
        Icon={LocalHospitalIcon}
        title='Covid-19 Information Center'
      />
      <SidebarRow Icon={EmojiFlagsIcon} title='Pages' />
      <SidebarRow Icon={PeopleIcon} title='Friends' />
      <SidebarRow Icon={ChatIcon} title='Messenger' />
      <SidebarRow Icon={StorefrontIcon} title='Marketplace' />
      <SidebarRow Icon={VideoLibraryIcon} title='Videos' />
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title='Marketplace' />
    </div>
  );
};

export default Sidebar;
