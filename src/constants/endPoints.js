const External_Apis = {
  USER_INFO: '/auth/userinfo',
  LOG_OUT: '/logout',
};

const playBook = {
  default: '/playbooks/v1',
  listing: '/playbooks/v1/list',
};

const caseType = {
  default: '/casetype/v1',
  listing: '/casetype/v1/list',
};

const users = {
  default: '/users/v1',
  info: '/users/v1/info',
  list: '/users/list',
};

const endpoints = { playBook, caseType, External_Apis, users };
export default endpoints;
