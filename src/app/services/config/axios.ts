
export const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    // Fallback for development
    return process.env.NODE_ENV === 'production' 
      ? 'https://event-planning-six.vercel.app' 
      : 'http://localhost:3000';
  };