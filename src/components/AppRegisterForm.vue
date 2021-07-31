<template>
  <div
    v-if="isRegShowAlert"
    class="text-white text-center font-bold p-5 mb-4"
    :class="regAlertVariant"
  >
    {{ regAlertMsg }}
  </div>
  <!-- validation-schema attribute allows to outsource the rules into an object -->
  <vee-form
    :validation-schema="schema"
    :initial-values="userData"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field type="number" name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded" />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border
            border-gray-300 transition duration-500
            focus:outline-none focus:border-black rounded"
          placeholder="Password"
          type="password"
          v-bind="field"
        >
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <!-- :bails="false" will tell the vee-field component
        not to use the fast exit strategy -->
      <!-- this means every rule will checked even if
        the previous rule was broken -->
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field type="password" name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password" />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <!-- as="select" is needed to generate the select tag -->
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded">
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Imaginationland">Imaginationland</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5
        px-3 rounded transition hover:bg-purple-700"
      :disabled="isRegInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'AppRegisterForm',

  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:3|max:100',
      },
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:120',
        password: 'required|min:3|max:100',
        // @password must match a name we're checking against
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Imaginationland',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      isRegInSubmission: false,
      isRegShowAlert: false,
      regAlertVariant: 'bg-blue-500', // tailwing class
      regAlertMsg: 'Please wait! Your account is being created.',
    };
  },

  methods: {
    // accepting form values
    async register(values) {
      this.isRegShowAlert = true;
      this.isRegInSubmission = true;
      this.regAlertVariant = 'bg-blue-500';
      this.regAlertMsg = 'Please wait! Your account is being created.';

      try {
        await this.$store.dispatch('register', values);
      } catch (err) {
        this.isRegInSubmission = false;
        this.regAlertVariant = 'bg-red-500';
        this.regAlertMsg = 'An unexpected error occured. Please try again later.';
        return;
      }

      this.regAlertVariant = 'bg-green-500';
      this.regAlertMsg = 'Success! Your account has been created.';

      // reload the page
      window.location.reload();
    },
  },
};
</script>
