import * as React from 'react';
import { Snackbar } from '@material-ui/core';
import { useErrorMessages } from '../../../store/hooks';
import { clearErrorMessasges } from '../../../store/actions';

const ErrorMessage: React.SFC = () => {
  const messages = useErrorMessages();
  const showMessages = messages && messages.length > 0;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showMessages}
      onClose={clearErrorMessasges}
      autoHideDuration={3000}
      message={messages[0]}
    />
  );
};

export { ErrorMessage };
