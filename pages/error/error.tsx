import React from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query; // basically the query on the url (error?error=CredentialsSignin)
  console.log('Error: ', error);

  const errorMessages = {
    CredentialsSignin: 'Invalid email or password. Please try again.',
    UserNotActive:
      'Your account is not active. Please check your email and verify your account before continue.',
    TokenActivated: 'The token has already been activated. Please try again.',
    // more error messages if needed
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Authentication Error</h1>
      <p>
        {errorMessages[error as keyof typeof errorMessages] ||
          'An unknown error occurred. Please try again.'}
      </p>
      <button onClick={() => router.push('/')}>Go to Home</button>
    </div>
  );
};

export default ErrorPage;
