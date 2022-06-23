import Vue from "vue";
import swal from 'sweetalert2'

const services = {
  toastSuccess: function (
    _this,
    title = "Sistema",
    message = "Operación realizada con éxito",
  ) {
    _this.$bvToast.toast(message, {
      title: title,
      toaster: "b-toaster-top-right",
      variant: "success",
      solid: true,
      autoHideDelay: 2500,
      appendToast: false,
    });
  },
  toastWarning: function (_this, title, message) {
    _this.$bvToast.toast(message, {
      title: title,
      toaster: "b-toaster-top-left",
      variant: "warning",
      solid: true,
      autoHideDelay: 2500,
      appendToast: false,
    });
  },
  toastDanger: function (_this, title, message) {
    _this.$bvToast.toast(message, {
      title: title,
      toaster: "b-toaster-top-left",
      variant: "danger",
      solid: true,
      autoHideDelay: 3000,
      appendToast: false,
    });
  },



  swalConfirmDelete() {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-info ml-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    return swalWithBootstrapButtons.fire({
      title: "Esta seguro?",
      text: "¡Ya no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    });
  },
  swalDanger(title, message) {
    swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  },
  
    





  generatePdf(url) {
    return axios.get(url, {
      method: "get",
      responseType: "blob",
    });
  },

  upperCase: function (value) {
    if (!value) return "";
    value = value.toString();
    return value.toUpperCase();
  },

  getIndexByKey(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
      let object = obj[i];
      if (key in object && object[key] === value) return i;
    }
    return -1;
  },

  getItemByKey(obj, column, value) {
    for (var i = 0; i < obj.length; i++) {
      var object = obj[i];
      if (column in object && object[column] === value) {
        return object;
      }
    }
    return null;
  },

  getFilteredByKey(array, key, value) {
    return array.filter(function (e) {
      return e[key] == value ? e[key] : null;
    });
  },

  itemExists(obj, key, value) {
    let item = this.getItemByKey(obj, key, value);
    return item ? true : false;
  },

  getArrayByKey(arr, key) {
    return arr.map(item => item[key]);
  },

  convertFromStringToDate(responseDate) {
    let datePieces = responseDate.split("/");
    return datePieces[0] + "-" + datePieces[1] + "-" + datePieces[2];
  },

  isObject(obj) {
    return typeof obj === "object";
  },

  isObjEmpty(obj) {
    if (this.isObject(obj)) {
      return Object.keys(obj).length === 0;
    }
    return true;
  },

  isKeyExists(obj, key) {
    //try {
    return obj.hasOwnProperty("id");
    /*} catch (error) {
            if (error == undefined) {
                return false;
            }
            console.log(error);
        }*/
  },
};




Vue.services = services;
Vue.prototype.$services = services;