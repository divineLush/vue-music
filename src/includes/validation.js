import {
  defineRule,
  configure,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  confirmed,
  alpha_spaces as alphaSpaces,
  min_value as minVal,
  max_value as maxVal,
  not_one_of as excluded,
} from '@vee-validate/rules';

// plugins are objects with a method called install
export default {
  // 'app' is a reference to the Vue app
  // 'options' is additional data passed from the Vue instance to the plugin
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    // alpha_spaces only allows alphabetic characters
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    // configure messages
    configure({
      // context gives us acces to the name, value and rule being broken by the fiels
      generateMessage: (context) => {
        const { field, rule } = context;
        const messages = {
          required: `The field ${field} is required`,
          min: `The field ${field} is too short`,
          max: `The field ${field} is too long`,
          alpha_spaces: `The field ${field} may only contain alphabetic characters and spaces`,
          email: `The field ${field} must be a valid email`,
          min_value: `The field ${field} is too low`,
          max_value: `The field ${field} is too high`,
          excluded: `You are not allowed to use this value for the field ${field}`,
          country_excluded: 'Due to restrictions, we do not accept users from this location',
          passwords_mismatch: 'The passwords don\'t match',
          tos: 'You must accept the Terms of Service',
        };

        return messages[rule.name]
          ? messages[rule.name]
          : `The field ${field} is invalid`;
      },
    });
  },
};
