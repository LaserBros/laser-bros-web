// utils/encodeS3Url.js

export const encodeS3Url = (url) => {
    if (!url) return "";
    
    try {
      const parts = url.split('/');
      const domain = parts.slice(0, 3).join('/');
      const encodedPath = parts.slice(3).map(part => encodeURIComponent(part)).join('/');
      return `${domain}/${encodedPath}`;
    } catch (error) {
      console.error("Error encoding S3 URL:", error);
      return url;
    }
  };
  