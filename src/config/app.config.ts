export default () => ({
  googleClient: process.env.GOOGLE_CLIENT,
  googleSecret: process.env.GOOGLE_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  githubClient: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_SECRET,
  shaPattern: process.env.SHA_PATTERNS,
});
