export const getMaskedEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const maskedUsername =
    username.length > 2
      ? username[0] + '*'.repeat(username.length - 2) + username.slice(-1)
      : username;
  return `${maskedUsername}@${domain}`;
};
