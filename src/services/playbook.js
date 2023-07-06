import { Api } from '../api';
import endpoints from '../constants/endPoints';
import { ApiErrorType } from '../helper';

export const GET_ALL_USER_PLAYBOOKS = async (page = 0, size = 20) => {
  const URL = `${endpoints.playBook.listing}?page=${page}&size=${size}`;
  try {
    const response = await Api.get(URL);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};

export const GET_PLAYBOOK_BY_ID = async (id) => {
  const URL = `${endpoints.playBook.default}/${id}`;
  try {
    const response = await Api.get(URL);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};

export const ADD_NEW_PLAYBOOKS = async (data) => {
  const URL = `${endpoints.playBook.default}`;
  try {
    const response = await Api.post(URL, data);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};

export const UPDATE_PLAYBOOK_BY_ID = async (id, data) => {
  const URL = `${endpoints.playBook.default}/${id}`;
  try {
    const response = await Api.patch(URL, data);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};

export const DELETE_PLAYBOOKS = async (id) => {
  const URL = `${endpoints.playBook.default}/${id}`;
  try {
    const response = await Api.delete(URL);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};
