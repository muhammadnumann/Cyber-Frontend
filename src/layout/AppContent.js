import React, { Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import routes from '../routes';
import { store } from '../context/MainContext';

import Loading from '../components/Common/Loading';

const AppContent = () => {
  const { sidebarShow } = useContext(store);
  return (
    <div
      id='MainContent'
      className={`main-content
        ${sidebarShow === true ? ' ' : ' minimize'}
      `}
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

export default React.memo(AppContent);
