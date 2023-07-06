import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function setCSSLink() {
  var ss = document.createElement('link');
  ss.type = 'text/css';
  ss.rel = 'stylesheet';
  const isDark = window.sessionStorage.getItem('darkMode');
  if (isDark === 'true') {
    ss.href = `${process.env.PUBLIC_URL}/assets/css/dark.min.css`;
  } else {
    ss.href = `${process.env.PUBLIC_URL}/assets/css/sweetalert2.min.css`;
  }
  document.head.appendChild(ss);
  return ss;
}

export const ErrorDialog = (message) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    });
  }, 500);
};
export const SuccessDialog = (message) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'success',
      title: 'Good job!',
      text: message,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    });
  }, 500);
};

export const SuccessDialogWithAction = (message, actionFunc) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'success',
      title: 'Good job!',
      text: message,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        actionFunc();
      }
    });
  }, 500);
};

export const WarningDialog = (message) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    });
  }, 500);
};

export const WarningDialogWithOKAction = (message, okFunction) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'warning',
      title: message,
      confirmButtonColor: '#DD0000',
      showCancelButton: true,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        okFunction && okFunction();
      }
    });
  }, 500);
};

export const InfoDialog = (message) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'info',
      title: 'Information!',
      text: message,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    });
  }, 500);
};

export const InfoDialogWithOKAction = (
  message,
  okFunction,
  showCancelButton = true
) => {
  const tag = setCSSLink();
  setTimeout(() => {
    MySwal.fire({
      icon: 'info',
      title: 'Information!',
      text: message,
      showCancelButton,
      didClose: () => {
        tag.parentNode.removeChild(tag);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        okFunction && okFunction();
      }
    });
  }, 500);
};
