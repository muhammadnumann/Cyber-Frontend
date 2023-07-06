/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Loading from './components/Common/Loading';

import './styles/index.scss';
import ApiCallStatusModal from './components/Common/ApiCallStatusModal';
import { useDispatch } from 'react-redux';
import { USER_DATA } from './store/features/authSlice';
import { ErrorDialog } from './components/Dialog';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(USER_DATA()).unwrap();
      } catch (error) {
        console.log(error);
        ErrorDialog(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ApiCallStatusModal />
      <HashRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='*' name='Home' element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </React.Fragment>
  );
}
