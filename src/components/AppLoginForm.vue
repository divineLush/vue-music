<template>
  <div
    class="text-white text-center font-bold p-4 mb-4"
    :class="logAlertVariant"
    v-if="isLogShowAlert"
  >
    {{ logAlertMsg }}
  </div>
  <vee-form
    :validation-schema="loginSchema"
    @submit="login"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button type="submit" :disabled="isLogInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'AppLoginForm',

  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      isLogInSubmission: false,
      isLogShowAlert: false,
      logAlertVariant: 'bg-blue-500', // tailwing class
      logAlertMsg: 'Please wait! We are logging you in',
    };
  },

  methods: {
    //  values are provided by the vee-form component
    async login(values) {
      console.log(values);
      this.isLogInSubmission = true;
      this.isLogShowAlert = true;
      this.logAlertVariant = 'bg-blue-500';
      this.logAlertMsg = 'Please wait! We are logging you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch (err) {
        this.isLogInSubmission = false;
        this.logAlertVariant = 'bg-red-500';
        this.logAlertMsg = 'Invalid login details.';
        return;
      }

      this.logAlertVariant = 'bg-green-500';
      this.logAlertMsg = 'Success! We are now logged in.';
    },
  },
};
</script>
