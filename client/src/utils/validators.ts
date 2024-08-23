const REQUIRED_FIELD = 'field is required';

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string | undefined) => {
    if (value === undefined) {
      return 'field is required';
    }

    if (value.match(/[а-яА-Я]/)) {
      return 'name must not contain russian letters';
    }

    return true;
  },
};

export const tagValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string | undefined) => {
    if (value === undefined) {
      return 'field is required';
    }
    if (value.match(/[а-яА-Я]/)) {
      return 'tag must not contain russian letters';
    }
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string | undefined) => {
    if (value === undefined) {
      return 'field is required';
    }

    if (value.length < 6 || value.length > 20) {
      return 'password must contain more then 6 symbols and less then 20';
    }

    return true;
  },
};

export const nameChangeValidation = {
  validate: (value: string | undefined) => {
    if (value?.match(/[а-яА-Я]/)) {
      return 'name must not contain russian letters';
    }

    return true;
  },
};

export const tagChangeValidation = {
  validate: (value: string | undefined) => {
    if (value?.match(/[а-яА-Я]/)) {
      return 'tag must not contain russian letters';
    }

    return true;
  },
};

export const passwordChangeValidation = {
  validate: (value: string | undefined) => {
    if ((value && value.length < 6) || (value && value.length > 20)) {
      return 'password must contain more then 6 symbols and less then 20';
    }

    return true;
  },
};

export const createTodoValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string | undefined) => {
    if (value === undefined) {
      return 'field is required';
    }

    if (value.match(/[а-яА-Я]/)) {
      return 'name must not contain russian letters';
    }

    return true;
  },
};
