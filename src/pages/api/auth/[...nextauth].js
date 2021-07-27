import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from '../../../api/axios/axios-flame-coach';
import ErrorMessage from '../../../components/Notification/ErrorMessage/ErrorMessage';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Credentials({
      id: 'email-password-credential',
      authorize: async (credentials) => {

        const data = JSON.stringify({
          email: credentials.username,
          password: credentials.password
        });

        const config = {
          method: 'post',
          url: '/customer/newSession',
          headers: {
            'Content-Type': 'application/json'
          },
          data
        };

        try {
          const response = await axios(config);

          return response.data;
        } catch (error) {
          let errorCode;

          if (error.response) {
            errorCode = ErrorMessage.fromCode(error.response.data.code);
          } else {
            errorCode = ErrorMessage.CODE_9999;
          }

          throw new Error('?error=' + errorCode.msg + '&level=' + errorCode.level + '&email=' + credentials.username);
        }
      }
    })
  ],

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  //secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 60 * 60, // 2 hours

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/login',  // Displays signin buttons
    signOut: '/logout', // Displays form with sign out button
    error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: '/auth/new-user' // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // eslint-disable-next-line no-unused-vars
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        //Copy the response user from login to token.user
        token.user = user;
      }
      return token;
    },
    async session(session, token) {
      //Expose the user from token to session.user
      session.user = token.user;
      return session;
    },

  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'auto',

  // Enable debug messages in the console if you are having problems
  debug: true,
});
