export function ApiErrorType(err) {
  if (err.response) {
    console.log('response', err.response.data);
    return err.response.data.error || 'Response Error';
  } else if (err.request) {
    console.log('request Error', err);
    return 'Network Error';
  } else {
    console.log('other Error', err);
    return err.message;
  }
}

export function rolesSwitch(role) {
  switch (role) {
    case 'ROLE_admin':
      return 'admin';
    case 'ROLE_data_manager':
      return 'data_manager';
    case 'ROLE_business_owner':
    case 'ROLE_Business Owner':
      return 'bo';
    case 'ROLE_Member':
      return 'org_subscriber';
    default:
      return 'subscriber';
  }
}
