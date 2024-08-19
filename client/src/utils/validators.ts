const REQUIRED_FIELD = 'field is required';

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'login must not contain russian letters';
    }

    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 6 || value.length > 20) {
      return 'password must contain more then 6 symbols and less then 20';
    }

    return true;
  },
};
