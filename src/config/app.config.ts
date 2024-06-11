export default () => ({
  googleClient: process.env.GOOGLE_CLIENT,
  googleSecret: process.env.GOOGLE_SECRET,
  jwtSecret: process.env.JWT_SECRET,
});
