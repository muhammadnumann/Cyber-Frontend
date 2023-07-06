import { Api } from '../api';
import endpoints from '../constants/endPoints';
import { ApiErrorType } from '../helper';

export const GET_ALL_CASE_TYPES = async (page = 0, size = 20) => {
  const URL = `${endpoints.caseType.listing}?page=${page}&size=${size}`;
  try {
    const response = await Api.get(URL);
    return response.data;
  } catch (error) {
    throw ApiErrorType(error);
  }
};
