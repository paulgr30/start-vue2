<template>
  <div>
    <b-card no-body class="mb-0 pt-2 pl-4 elevation-0">
      <b-card-title>Mi Perfil</b-card-title>
    </b-card>

    <b-row>
      <!-- Titulo Perfil -->
      <b-col md="6">
        <div class="mt-3 pl-1 pl-md-4">
          <h5>Información de Perfil</h5>
          <span>Actualice la información de su cuenta y la dirección de correo electrónico</span>
        </div>
      </b-col>
      <!-- Formulario Perfil -->
      <b-col md="6">
        <b-card class="mt-3 elevation-0">
          <ValidationObserver ref="vdtObserverProfile">
            <b-form
              id="frmProfile"
              name="frmProfile"
              autocomplete="off"
              novalidate
              @submit.prevent="updateProfile"
            >
              <!-- Overlay -->
              <b-overlay :show="showOverlay" no-wrap rounded>
                <template #overlay>
                  <b-spinner></b-spinner>
                  <strong class="ml-2 fs-4">Procesando...</strong>
                </template>
              </b-overlay>

              <!-- Nombre -->
              <ValidationProvider
                vid="name"
                name="Nombre"
                :rules="{ required: true }"
                v-slot="{ errors }"
              >
                <b-form-group label="Nombre">
                  <b-form-input
                    id="name"
                    type="text"
                    v-model="profile.name"
                    :class="{ 'is-invalid': submittedProfile && errors[0] }"
                  />
                  <span
                    v-if="submittedProfile && errors[0]"
                    class="invalid-feedback"
                  >
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Email -->
              <ValidationProvider
                vid="email"
                name="Email"
                :rules="{ required: true, email: true }"
                v-slot="{ errors }"
              >
                <b-form-group label="Email">
                  <b-form-input
                    id="email"
                    type="text"
                    v-model="profile.email"
                    :class="{ 'is-invalid': submittedProfile && errors[0] }"
                  />
                  <span
                    v-if="submittedProfile && errors[0]"
                    class="invalid-feedback"
                  >
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Boton Actualizar Perfil -->
              <b-button
                type="submit"
                size="sm"
                variant="primary"
                class="mt-3 d-flex ml-auto"
              >
                Actualizar
              </b-button>
            </b-form>
          </ValidationObserver>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <!-- Titulo Contraseña -->
      <b-col md="6">
        <div class="pl-1 pl-md-4">
          <h5>Cambio de Contraseña</h5>
          <span>
            Actualice su contraseña por seguridad. Recuerde que tendra que
            volver a iniciar sesión.
          </span>
        </div>
      </b-col>
      <!-- Formulario Contraseña -->
      <b-col md="6">
        <b-card class="elevation-0">
          <ValidationObserver ref="vdtObserverPassword">
            <b-form
              id="frmPassword"
              name="frmPassword"
              autocomplete="off"
              novalidate
              @submit.prevent="updatePassword"
            >
              <!-- Overlay -->
              <b-overlay :show="showOverlay" no-wrap rounded>
                <template #overlay>
                  <b-spinner></b-spinner>
                  <strong class="ml-2 fs-4">Procesando...</strong>
                </template>
              </b-overlay>

              <!-- Contraseña Actual -->
              <ValidationProvider
                vid="current_password"
                name="Contraseña Actual"
                :rules="{ required: true }"
                v-slot="{ errors }"
              >
                <b-form-group label="Contraseña Actual">
                  <b-form-input
                    id="current_password"
                    type="password"
                    v-model="profilePassword.current_password"
                    :class="{ 'is-invalid': submittedPassword && errors[0] }"
                  />
                  <span
                    v-if="submittedPassword && errors[0]"
                    class="invalid-feedback"
                  >
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Nueva Contraseña -->
              <ValidationProvider
                vid="new_password"
                name="Nueva Contraseña"
                :rules="{ required: true, min: 10 }"
                v-slot="{ errors }"
              >
                <b-form-group label="Nueva Contraseña">
                  <b-form-input
                    id="new_password"
                    type="password"
                    v-model="profilePassword.new_password"
                    :class="{ 'is-invalid': submittedPassword && errors[0] }"
                  />
                  <span
                    v-if="submittedPassword && errors[0]"
                    class="invalid-feedback"
                  >
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Confirmar Nueva Contraseña -->
              <ValidationProvider
                vid="new_password_confirmation"
                name="Confirmar Nueva Contraseña"
                :rules="{ required: true, confirmed:'new_password', min: 10 }"
                v-slot="{ errors }"
              >
                <b-form-group label="Confirmar Nueva Contraseña">
                  <b-form-input
                    id="new_password_confirmation"
                    type="password"
                    v-model="profilePassword.new_password_confirmation"
                    :class="{ 'is-invalid': submittedPassword && errors[0] }"
                  />
                  <span
                    v-if="submittedPassword && errors[0]"
                    class="invalid-feedback"
                  >
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Boton Actualizar Contraseña -->
              <b-button
                type="submit"
                size="sm"
                variant="primary"
                class="mt-3 d-flex ml-auto"
              >
                Actualizar
              </b-button>
            </b-form>
          </ValidationObserver>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: false,
      submittedProfile: false,
      submittedPassword: false,
      profile: {},
      profilePassword: {},
    };
  },
  methods: {
    showMessage() {
      this.$services.toastSuccess(this);
      this.$refs.vdtObserverProfile.reset();
      this.$refs.vdtObserverPassword.reset();
      this.submittedProfile = false;
      this.submittedPassword = false;
    },

    async updateProfile() {
      try {
        this.showOverlay = true;
        this.submittedProfile = true;
        let success = await this.$refs.vdtObserverProfile.validate();
        if (!success) return;
        await this.$store.dispatch("mAuths/updateProfile",this.profile);
        this.showMessage();
      } catch (err) {
        if (err.code == 422) {
          this.$refs.vdtObserverProfile.setErrors(err.errors);
        } else {
          this.$services.swalDanger("Ocurrio un problema", err.statusText + " - " + err.message);
        }
      } finally {
        this.showOverlay = false;
      }
    },

    async updatePassword() {
      try {
        this.showOverlay = true;
        this.submittedPassword = true;
        let success = await this.$refs.vdtObserverPassword.validate();
        if (!success) return;
        await this.$store.dispatch("mAuths/changePassword", this.profilePassword);
        this.showMessage();
      } catch (err) {
        if (err.code == 422) {
          this.$refs.vdtObserverPassword.setErrors(err.errors);
        } else {
          this.$services.swalDanger("Ocurrio un problema", err.statusText + " - " + err.message);
        }
      } finally {
        this.showOverlay = false;
      }
    },
  },
  async created() {
    await this.$store.dispatch("mAuths/profile");
    this.profile = JSON.parse(JSON.stringify(this.$store.getters["mAuths/auth"]));
  },
};
</script>
