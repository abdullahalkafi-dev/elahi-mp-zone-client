'use server';

import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import axios from 'axios';
import { decodeJWT } from './verifyToken';
import { TUser } from '@/types';

export const getCurrentUser = async () => {
  try {
    // Detect if running on the server or client
    const isServer = typeof window === 'undefined';

    // Get the token from cookies
    const accessToken = isServer
      ? cookies().get('accessToken')?.value
      : Cookies.get('accessToken');

    if (!accessToken) {
      return null;
    }

    const decodedUser = decodeJWT(accessToken);

    if (!decodedUser || !decodedUser._id) {
      return null;
    }

    // Fetch the user details from the API using the user ID
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${decodedUser._id}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    // Return the user data from the response
    return response.data?.data as TUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};
