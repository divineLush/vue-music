import {
  defineRule,
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
    defineRule('min', min);
    defineRule('max', max);
    // alpha_spaces only allows alphabetic characters
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('confirmed', confirmed);
    defineRule('excluded', excluded);
  },
};
