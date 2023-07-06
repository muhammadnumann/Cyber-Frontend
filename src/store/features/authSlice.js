/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Api } from '../../api';
import endPoints from '../../constants/endPoints';
import { ApiErrorType, rolesSwitch } from '../../helper';

const initialState = {
  IS_LOGGED: false,
  USER: null,
  TOKEN: null,
  LANGUAGE: null,
  ROLE: null,
  A3M_SUBSCRIPTION: null,
};

export const USER_DATA = createAsyncThunk(
  'auth/user_data',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios
        .get(endPoints.External_Apis.USER_INFO)
        .catch((err) => {
          window.location.href = `/auth/login`;
        });

      //A3M conversion from cognito
      const authToken = response.data.access_token;

      Api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

      const userResponse = await Api.get(endPoints.users.info);

      localStorage.setItem('token', authToken);

      const regex = /^ROLE_[\w&]+( [\w&]+)*$/;
      let userRole = '';
      for (const i of response.data.sub_permissions) {
        if (regex.test(i)) {
          userRole = i;
          break;
        }
      }
      const role = rolesSwitch(userRole);
      const user = {
        ...userResponse.data.result,
        username: response.data.sub,
        organization: response.data.sub_default_org_name,
        role: userRole.split('_').slice(1).join('_'),
      };

      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...user,
        })
      );

      const data = {
        user,
        token: authToken,
        role,
        subscription: response.data.sub_default_subscription_id,
      };

      return data;
    } catch (err) {
      return rejectWithValue(ApiErrorType(err));
    }
  }
);

export const USER_SESSION_DATA = createAsyncThunk(
  'auth/user_session_data',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token Not Found!');
      const decodedJwt = jwtDecode(token);

      if (!moment().isBefore(moment.unix(decodedJwt.exp)))
        throw new Error('Token Expired!');

      const userData = JSON.parse(localStorage.getItem('userData'));
      const data = {
        user: userData,
        token,
        role: userData.role,
        subscription: userData.sub_default_subscription_id,
      };
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const USER_LOGOUT = createAsyncThunk(
  'auth/user_logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(endPoints.External_Apis.LOG_OUT);
      localStorage.removeItem('userData');
      localStorage.removeItem('token');

      window.location.href = '/';
      return '';
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const sameResponse = (state, action) => {
  state.IS_LOGGED = true;
  state.TOKEN = action.payload.token;
  state.USER = action.payload.user;
  state.ROLE = action.payload.role;
  state.A3M_SUBSCRIPTION = action.payload.subscription;
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(USER_DATA.fulfilled, sameResponse);
    builder.addCase(USER_SESSION_DATA.fulfilled, sameResponse);
    builder.addCase(USER_LOGOUT.fulfilled, () => {
      return initialState;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
