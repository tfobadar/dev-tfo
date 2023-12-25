export const getIPad = () => {
  return (
    (navigator.maxTouchPoints > 2 && /Macintosh/.test(navigator.userAgent)) ||
    /iPad/.test(navigator.userAgent)
  );
};
