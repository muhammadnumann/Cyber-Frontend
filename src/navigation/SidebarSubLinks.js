import React, { useMemo, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@mui/material';
import { setActiveLinkStyle } from './Sidebar';
import { store } from '../context/MainContext';

function SidebarSubLinks({ link, getActivePage }) {
  const { userInfo } = useContext(store);
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    setUserPermissions(userInfo?.sub_permissions);
  }, [userInfo?.sub_permissions]);

  const filteredRoutes = useMemo(
    () =>
      link?.items?.filter(
        (x) =>
          !x.permission ||
          x.permission?.some((ai) => userPermissions?.includes(ai))
      ),
    [link?.items, userPermissions]
  );

  return (
    <>
      <List id='SidebarSubLinkList' className='SidebarSubLinkList'>
        {filteredRoutes?.map((sublink, subindex) => (
          <div key={subindex}>
            <ListItem
              id={`sublink${subindex}`}
              className={`${getActivePage(link.to)}`}
              onClick={() => setActiveLinkStyle(`sublink${subindex}`)}
            >
              <Link to={sublink.to} className='sublink'>
                {sublink.icon}
                {sublink.name}
              </Link>
            </ListItem>
            {sublink?.items?.length > 0 && (
              <List id='SidebarSubLinkList2' className='SidebarSubLinkList2'>
                {sublink.items?.map((sublink2, subindex2) => (
                  <ListItem
                    key={subindex2}
                    id={`sublink2${subindex2}`}
                    className={`${getActivePage(link.to)}`}
                    onClick={() => setActiveLinkStyle(`sublink2${subindex2}`)}
                  >
                    <Link to={sublink2.to} className='sublink2'>
                      {sublink2.icon}
                      {sublink2.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        ))}
      </List>
    </>
  );
}

export default SidebarSubLinks;
