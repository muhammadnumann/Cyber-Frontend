import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  setActiveLinkStyle,
  // openCloseSubMenuAndOthersClose
} from './Sidebar';
import SidebarSubLinks from './SidebarSubLinks';
import { List, ListItem } from '@mui/material';

import { store } from '../context/MainContext';
import Tippy from '@tippyjs/react/headless';

function SidebarLink({ link, index, getActivePage }) {
  const { sidebarShow } = useContext(store);

  if (sidebarShow === true) {
    return (
      <>
        <ListItem id={`link${index}`} className={`${getActivePage(link.to)}`}>
          <Link
            to={link.to}
            onClick={() => {
              setActiveLinkStyle(`link${index}`);
              // openCloseSubMenuAndOthersClose(`divsublink${index}`, sidebarShow);
            }}
            className='sidenavlink'
          >
            <link.icon />
            {link.name}
          </Link>
        </ListItem>
        <div id={`divsublink${index}`}>
          {link.items?.length > 0 && (
            <SidebarSubLinks link={link} getActivePage={getActivePage} />
          )}
        </div>
      </>
    );
  }
  const onLinkClick = (e) => {
    window.location.href = e;
    document.querySelectorAll('[id*=tippy-]').forEach((x) => x.remove());
  };

  return (
    <ListItem
      id={`link${index}`}
      className={`${getActivePage(link.to)}`}
      onClick={() => setActiveLinkStyle(`link${index}`)}
      style={{
        padding: sidebarShow ? 0 : 0,
      }}
    >
      <Tippy
        trigger='mouseenter focus'
        interactive={true}
        offset={[0, 20]}
        arrow={true}
        appendTo={document.body}
        popperOptions={{ positionFixed: true }}
        render={(attrs) => (
          <List className='tippy-menu'>
            <ListItem
              component='button'
              color='success'
              onClick={() => onLinkClick('#' + link?.to)}
              className='sidenavPopUp'
            >
              <link.icon />
              {link.name}
            </ListItem>

            {link.items?.length > 0 &&
              link.items.map((x, i) => {
                return (
                  <>
                    <ListItem
                      component='button'
                      color='success'
                      onClick={() => onLinkClick('#' + x?.to)}
                      key={x.name}
                    >
                      {x?.icon && (
                        <img
                          src={x?.icon}
                          width='20'
                          height='20'
                          alt={link.name}
                          style={{ marginRight: '10px' }}
                        />
                      )}
                      {x.name}
                    </ListItem>
                    {x.items?.length > 0 &&
                      x.items.map((y, j) => {
                        return (
                          <ListItem
                            component='button'
                            color='success'
                            onClick={() => onLinkClick('#' + y?.to)}
                            key={y.name}
                            className='ps-4'
                          >
                            <img
                              src={y.icon}
                              width='20'
                              height='20'
                              alt={y.name}
                            />
                            {y.name}
                          </ListItem>
                        );
                      })}
                  </>
                );
              })}
          </List>
        )}
        placement='right'
      >
        <Link to={link?.to}>
          <link.icon />
        </Link>
      </Tippy>
    </ListItem>
  );
}

export default SidebarLink;
