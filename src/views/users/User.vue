<template>
  <div>
    <b-modal
      id="modalUser"
      ref="modalUser"
      :title="titleModal"
      hide-header-close
      no-close-on-backdrop
      body-class="position-static"
      size="md"
      button-size="sm"
      cancel-title="Cancelar"
      cancel-variant="dark"
      ok-title="Aceptar"
      ok-variant="primary"
      @ok.prevent="save"
      @show="loadUser"
    >
      <!-- Overlay -->
      <b-overlay :show="showOverlay" no-wrap rounded>
        <template #overlay>
          <b-spinner></b-spinner>
          <strong class="ml-2 fs-4">Procesando...</strong>
        </template>
      </b-overlay>

      <ValidationObserver ref="vdtObserver" v-slot="{ handleSubmit }">
        <b-form
          id="frmUser"
          name="frmUser"
          autocomplete="off"
          @submit.stop.prevent="handleSubmit(save)"
          novalidate
        >
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
                placeholder="Ingrese nombre"
                v-model="user.name"
                :class="{ 'is-invalid': submitted && errors[0] }"
              />
              <span v-if="submitted && errors[0]" class="invalid-feedback">
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
                placeholder="Ingrese correo"
                v-model="user.email"
                :class="{ 'is-invalid': submitted && errors[0] }"
              />
              <span v-if="submitted && errors[0]" class="invalid-feedback">
                {{ errors[0] }}
              </span>
            </b-form-group>
          </ValidationProvider>

          <b-row>
            <!-- Contraseña para Pegistro Nuevo -->
            <b-col md="6">
              <ValidationProvider
                vid="password"
                name="Contraseña"
                :rules="{ required: true, min: 8, max: 20 }"
                v-slot="{ errors }"
                v-if="!user.id"
              >
                <b-form-group label="Contraseña:">
                  <b-form-input
                    id="password"
                    type="text"
                    placeholder="Ingrese contraseña"
                    maxlength="20"
                    v-model="user.password"
                    :class="{ 'is-invalid': submitted && errors[0] }"
                  />
                  <span v-if="submitted && errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </span>
                </b-form-group>
              </ValidationProvider>

              <!-- Contraseña se muestra cuando se va a editar -->
              <b-form-group label="Contraseña:" v-else>
                <b-form-input
                  id="password"
                  type="text"
                  placeholder="Solo si desea modificarla"
                  maxlength="20"
                  v-model="user.password"
                />
              </b-form-group>
            </b-col>

            <!-- rol de usuario -->
            <b-col cols="6">
              <b-form-group label="Rol:">
                <ValidationProvider
                  vid="role"
                  name="rol"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-form-select
                    v-model="selectedRole"
                    :options="roles"
                    value-field="name"
                    text-field="name"
                    :class="{ 'is-invalid': submitted && errors[0] }"
                  >
                    <!-- Opcion deshabilitada -->
                    <template #first>
                      <b-form-select-option :value="null" disabled>
                        -- Seleccione un rol --
                      </b-form-select-option>
                    </template>
                  </b-form-select>
                  <span class="invalid-feedback">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </b-form-group>
            </b-col>
          </b-row>

          <!-- Estado - Activo / Inhabilitado -->
          <b-form-group label="Estado">
            <b-form-checkbox
              v-model="is_active"
              value="1"
              unchecked-value="0"
              switch
            >
              {{ userStatus }}
            </b-form-checkbox>
          </b-form-group>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script>
import { integer } from 'vee-validate/dist/rules';

export default {
  data() {
    return {
      showOverlay: false,
      submitted: false,
      user: {},
      is_active: 1,
      selectedRole: [],
    };
  },
  computed: {
    titleModal() {
      return this.user.id ? "EDITAR USUARIO" : "AGREGAR USUARIO";
    },
    roles() { return this.$store.getters["mRoles/roles"]; },
    userStatus() { return this.is_active == 1 ? "Activo" : "Inhabilitado"; },
    showMessageAndClean() {
      this.$services.toastSuccess(this);

      if (this.user.id) {
        this.$refs.modalUser.hide();
      }
      this.user = {};
      this.is_active = 1;
      this.$refs.vdtObserver.reset();
      this.submitted = false;
    },
  },
  methods: {
    loadUser() {
      (this.submitted = false), this.$store.dispatch("mRoles/getRoles");
      this.user = JSON.parse(
        JSON.stringify(this.$store.getters["mUsers/currentUser"])
      );

      // Si user es un objeto vacio (Nuevo usuario) colocamos a true su propiedad is_active.
      this.is_active = this.user.id ? Number(this.user.is_active) : 1;
      // Verificamos si el usuario tiene un rol asignado
      this.selectedRole = this.user.roles ? this.user.roles[0]["name"] : null;
    },
    async save() {
      this.showOverlay = true;
      this.submitted = true;
      try {
        let success = await this.$refs.vdtObserver.validate();
        if (!success) return;

        this.user.is_active = this.is_active;
        this.user.roles = this.selectedRole;
        await this.$store.dispatch("mUsers/addOrUpdate", this.user);
        this.showMessageAndClean;
      } catch (err) {
        if (err.code == 422) {
          this.$refs.vdtObserver.setErrors(err.errors);
        } else {
          this.$services.swalDanger("Ocurrio un problema", err.statusText + " - " + err.message);
        }
      } finally {
        this.showOverlay = false;
      }
    },
  },
};
</script>
