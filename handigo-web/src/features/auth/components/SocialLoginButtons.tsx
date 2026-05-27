import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FBAuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
}

interface FBLoginResponse {
  authResponse: FBAuthResponse | null;
  status: string;
}

interface FacebookSDK {
  init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
  login: (callback: (response: FBLoginResponse) => void, options: { scope: string }) => void;
}

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}

const FB_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

const initFacebook = (): Promise<void> =>
  new Promise((resolve) => {
    if (window.FB) return resolve();
    window.fbAsyncInit = () => {
      window.FB.init({ appId: FB_APP_ID, cookie: true, xfbml: true, version: 'v19.0' });
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });

interface Props {
  onError?: (msg: string) => void;
}

const SocialLoginButtons: React.FC<Props> = ({ onError }) => {
  const { googleLogin, facebookLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (role: string) => {
    if (role === 'CUSTOMER' || role === 'customer') navigate('/customer');
    else if (role === 'PROVIDER' || role === 'provider') navigate('/provider');
    else navigate('/');
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) return onError?.('Google login failed');
    const user = await googleLogin(credentialResponse.credential);
    if (user) handleNavigate(user.role);
    else onError?.('Google login failed');
  };

  const handleFacebook = async () => {
    await initFacebook();
    window.FB.login(
      (response: FBLoginResponse) => {
        if (response.authResponse?.accessToken) {
          facebookLogin(response.authResponse.accessToken).then((user) => {
            if (user) handleNavigate(user.role);
            else onError?.('Facebook login failed');
          });
        } else {
          onError?.('Facebook login was cancelled');
        }
      },
      { scope: 'public_profile,email' },
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => onError?.('Google login failed')}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />

      <button
        type="button"
        disabled={isLoading || !FB_APP_ID}
        onClick={handleFacebook}
        className="flex items-center justify-center space-x-2 py-2.5 px-4 border border-outline-variant dark:border-outline/30 rounded-xl hover:bg-surface-container-high dark:hover:bg-on-surface-variant/20 transition-all text-xs font-bold text-on-surface dark:text-surface-bright disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span>Facebook</span>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
