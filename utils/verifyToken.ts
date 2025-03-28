

export function decodeJWT(token: string | undefined) {
  console.log(token);
 
  try {
    const base64Url = token?.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
 console.log(JSON.parse(jsonPayload));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
