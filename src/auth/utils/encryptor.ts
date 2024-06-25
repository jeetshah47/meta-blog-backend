import appConfig from 'src/config/app.config';

export const sha256 = async (message: string) => {
  const newPattern = appConfig().shaPattern + message;
  const msgBuffer = new TextEncoder().encode(newPattern);

  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
};

// Example usage:
