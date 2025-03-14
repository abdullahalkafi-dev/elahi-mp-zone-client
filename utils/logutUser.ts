'use client';

import Cookies from 'js-cookie';
import { toast } from 'sonner';

export const logoutUser = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  toast.success('Logout successful!');
  setTimeout(() => {
    window.location.href = '/';
  }, 1800);
};
