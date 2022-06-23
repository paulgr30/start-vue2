<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button">
          <i class="fas fa-bars"></i>
        </a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Datos de Usuario -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fas fa-user mr-2"></i>
          <span class="f-2">{{ auth.name }}</span>
          <i class="fas fa-angle-down ml-1 pt-1"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header bg-dark">Administrar cuenta</span>
          <div class="dropdown-divider"></div>
          <router-link :to="{ name:'profile' }" class="dropdown-item">
            <i class="far fa-user mr-2"></i> Perfil
          </router-link>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" @click="signOut">
            <i class="fas fa-sign-out-alt"></i> Cerrar sesión
          </a>
        </div>
      </li>

      <!-- Pantalla Completa -->
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>

      <!-- Menu de Configuracion -->
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <i class="fas fa-th-large"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    auth() { return this.$store.getters["mAuths/auth"] },
  },
  methods: {
    async signOut() { await this.$store.dispatch("mAuths/logout") },
  },
};
</script>

<style>
</style>