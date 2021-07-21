import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
} from 'vee-validate';
import { required } from '@vee-validate/rules';

// plugins are objects with a method called install
export default {
  // "app" is a reference to the Vue app
  // "options" is additional data passed from the Vue instance to the plugin
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
  },
};
