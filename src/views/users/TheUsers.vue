<template>
  <div>
    <b-card no-body class="my-0 pt-3 pb-2 px-4 elevation-0">
      <b-row>
        <b-col cols="6">
          <!-- Titulo -->
          <h5>
            <i class="nav-icon fas fa-users"></i>
            Usuarios
          </h5>
        </b-col>

        <b-col cols="6">
          <!-- Boton Agregar -->
          <div class="d-flex justify-content-end">
            <b-button
              variant="primary"
              size="sm"
              @click="setItem()"
              v-b-modal.modalUser
              v-permission="'users.store'"
            >
              <i class="fas fa-plus mt-1 mr-md-1"></i>
              <span class="d-none d-md-inline">Agregar Usuario</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="mb-2 elevation-0" style="height: 415px !important">
      <!-- Formulario de Busqueda -->
      <b-form autocomplete="off" @submit.prevent="searchData" novalidate>
        <b-input-group size="md" prepend="Buscar" class="mb-3">
          <b-form-input
            name="txtSearch"
            type="search"
            placeholder="Ingrese nombre a buscar"
            v-model="searchValue"
          />
        </b-input-group>
      </b-form>

      <!-- OverlayDelete -->
      <b-overlay :show="showOverlay" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <b-icon icon="trash" font-scale="2" variant="danger" />
            <h6 class="text-danger">Eliminando...</h6>
          </div>
        </template>

        <!-- Tabla de Datos -->
        <b-table
          fixed
          small
          hover
          sticky-header
          show-empty
          responsive
          :busy="isLoading"
          :fields="fields"
          :items="users"
        >
          <!-- Loading -->
          <template #table-busy>
            <div class="text-center text-primary py-5">
              <b-spinner class="align-middle"></b-spinner>
              <strong>&nbsp;Consultando...</strong>
            </div>
          </template>

          <!-- Empty -->
          <template #empty>
            <h5 class="text-center py-5">No hay datos para mostrar</h5>
          </template>

          <!-- Botonera Tabla -->
          <template #cell(opciones)="{ item }">
            <!-- Boton Editar -->
            <b-link
              class="mr-4 text-center"
              @click="setItem(item)"
              v-b-modal.modalUser
              v-permission="'users.update'"
              v-show="showButtton(item.id)"
            >
              <b-icon icon="pencil-square" scale="1.5" variant="info" />
            </b-link>

            <!-- Boton Eliminar -->
            <b-link
              class="text-center"
              @click="remove(item.id)"
              v-permission="'users.destroy'"
              v-show="showButtton(item.id)"
            >
              <b-icon icon="trash" scale="1.5" variant="danger" />
            </b-link>
          </template>
        </b-table>
      </b-overlay>
    </b-card>

    <b-row>
      <!-- Estadisticas de Paginacion -->
      <b-col md="6" sm="12">
        <div class="py-2 pt-md-2 text-center text-md-left">
          Pagina {{ page }} de {{ pages }} - {{ total }} resultados
        </div>
      </b-col>

      <!-- Paginador -->
      <b-col md="6" sm="12">
        <div>
          <b-pagination-nav
            :number-of-pages="pages"
            :link-gen="linkGen"
            :no-page-detect="true"
            size="sm"
            v-model="page"
            first-number
            last-number
            use-router
            @page-click="loadUsers"
            class="d-flex justify-content-center justify-content-md-end"
          />
        </div>
      </b-col>
    </b-row>

    <user />
  </div>
</template>

<script>
import user from "./User";

export default {
  components: {
    user,
  },
  data() {
    return {
      showOverlay: false,
      isLoading: false,
      searchValue: null,
    };
  },
  computed: {
    auth() { return this.$store.getters["mAuths/auth"]; },
    users() { return this.$store.getters["mUsers/users"]; },
    total() { return this.$store.getters["mUsers/totalRecords"]; },
    pages() { return this.$store.getters["mUsers/numberPages"]; },
    page: {
      get() {
        return this.$store.getters["mUsers/currentPage"];
      },
      set(value) {
        this.$store.dispatch("mUsers/setPage", value);
      },
    },
    fields() {
      return [
        {
          key: "name",
          label: "Nombre",
          //sortable: true,
          thStyle: "width:200px;",
        },
        {
          key: "email",
          label: "Email",
          thStyle: "width:200px;",
        },
        { key: "roles[0].name", label: "Rol", thStyle: "width:100px;" },
        {
          key: "opciones",
          label: "",
          tdClass: "text-right pr-3",
          thStyle: "width:80px;",
        },
      ];
    },
  },
  methods: {
    async loadUsers(e, page = 1) {
      this.page = page;
      this.isLoading = true;
      try {
        await this.$store.dispatch("mUsers/getByCriteria");
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    searchData() {
      this.$store.dispatch("mUsers/setSearchValue", this.searchValue);
      this.loadUsers();
    },
    showButtton(id) {
      return this.auth.id != id ? true : false;
    },
    setItem(item = {}) {
      this.$store.dispatch("mUsers/setUser", item);
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    async remove(id) {
      this.showOverlay = true;
      let response = await this.$services.swalConfirmDelete();
      if (response.isConfirmed) {
        try {
          await this.$store.dispatch("mUsers/destroy", id);
          this.$services.toastSuccess(this);
        } catch (err) {
          this.$services.swalDanger(
            "Ocurrio un problema",
            err.statusText + " - " + err.message
          );
        }
      }
      this.showOverlay = false;
    },
  },
  created() {
    this.$store.dispatch("mUsers/setSearchValue", "");
    this.loadUsers();
  },
};
</script>
