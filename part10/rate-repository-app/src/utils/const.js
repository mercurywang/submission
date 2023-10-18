const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 5;
const MAX_PASSWORD_LENGTH = 50;
const MESSAGE = {
  USERNAME: {
    MIN: 'Username must be greater or equal to 5',
    MAX: 'Username must be less than 30',
    REQUIRED: 'Username is required'
  },
  PASSWORD: {
    HINT: 'Password must be between 5 and 50 digits',
    REQUIRED: 'Password is required'
  },
  PASSWORD_CONFIRM: {
    HINT: 'Password must be between 5 and 50 digits',
    REQUIRED: 'Password confirm is required'
  }
};

export {
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MESSAGE
};
