<template>
  <b-container>
    <b-row class="mt-5 pt-5">
      <b-col class="d-flex justify-content-center align-items-center">
        <b-card
          border-variant="light"
          class="mb-0 pb-0 bg-transparent"
          style="max-width: 400px"
        >
          <b-img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            fluid
          />
          <b-card-text>
            <!-- Overlay -->
            <b-overlay :show="showOverlay" no-wrap rounded>
              <template #overlay>
                <b-spinner></b-spinner>
                <strong class="ml-2 fs-4">Autenticando...</strong>
              </template>
            </b-overlay>

            <form @submit.stop.prevent="signIn" autocomplete="off" novalidate>
              <!-- Titulo -->
              <h3 class="pb-3 text-center" style="letter-spacing: 1px">
                Inicie Sesión
              </h3>

              <!-- Alert de errores -->
              <b-alert fade variant="danger" :show="alertShow">
                <ul>
                  <li v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </b-alert>

              <!-- Email -->
              <div class="form-outline mb-4">
                <b-form-input
                  type="email"
                  v-model="credentials.email"
                  placeholder="Ingrese email"
                />
              </div>

              <!-- Contraseña -->
              <div class="form-outline mb-4">
                <b-form-input
                  type="password"
                  v-model="credentials.password"
                  placeholder="Ingrese clave"
                />
              </div>

              <!-- Boton iniciar sesion -->
              <div class="pt-1 mb-4">
                <b-button type="submit" variant="primary" block>
                  Iniciar sesion
                </b-button>
              </div>
            </form>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showOverlay: false,
      alertShow: false,
      credentials: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async signIn() {
      this.showOverlay = true;
      this.alertShow = false;
      try {
        await this.$store.dispatch("mAuths/login", this.credentials);
      } catch (err) {
        if (err.code == 422) {
          this.errors.length = 0;
          for (var index in err.errors) {
            for (var error of err.errors[index]) {
              this.errors.push(error);
            }
          }
        } else {
          console.log(err);
        }
        this.alertShow = true;
      } finally {
        this.showOverlay = false;
      }
    },
  },
};
</script>
