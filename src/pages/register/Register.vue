<template>

  <div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user">
                <div class="form-group">
                  <input type="text" class="form-control form-control-user" id="name"
                         placeholder="Name" v-model="name">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control form-control-user" id="username"
                         placeholder="Username" v-model="username">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control form-control-user" id="email"
                         placeholder="Email Address" v-model="email">
                </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-user" id="mobile"
                         placeholder="Mobile" v-model="mobile">
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="password" class="form-control form-control-user" id="password"
                           placeholder="Password" v-model="password">
                  </div>
                  <div class="col-sm-6">
                    <input type="password" class="form-control form-control-user" id="confirmPassword"
                           placeholder="Repeat Password" v-model="confirmPassword">
                  </div>
                </div>
                <a href="" v-on:click.prevent="register" class="btn btn-primary btn-user btn-block">
                  Register Account
                </a>
              </form>
              <hr>
              <div class="text-center">
                <a class="small" href="login.html">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RegisterService from './RegisterService'

  export default {
    name: 'Register',
    data () {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        mobile: ''
      }
    },
    methods: {
      register () {
        RegisterService.register({
          name: this.name,
          password: this.password,
          username: this.username,
          email: this.email,
          mobile: this.mobile
        })
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>

<style scoped>

</style>
