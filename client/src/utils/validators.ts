const REQUIRED_FIELD = 'field is required';

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'name must not contain russian letters';
    }

    return true;
  },
};

export const tagValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'tag must not contain russian letters';
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
