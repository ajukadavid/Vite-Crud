import {
    default as axios,
    AxiosRequestConfig,
    AxiosRequestHeaders,
  } from 'axios';
  

  

  
  export function getAuthHeaders (): AxiosRequestHeaders {
    const minTokenLength = 1;
  
    try {
      const userInfo = localStorage.getItem('appToken') || '';
      // Abort if not string
      if (typeof userInfo !== 'string') throw new Error('User info not found');
  
    
      // Abort if token is not string and min length
      if (!(typeof userInfo === 'string' && userInfo.length >= minTokenLength)) {
        throw new Error('Invalid user access token');
      }
         return {Authorization: `Bearer ${userInfo}`};

    }
    catch {
      // Catch any errors and return an empty headers object
      return {};
    }
  }


  