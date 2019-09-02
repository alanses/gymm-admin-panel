import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import JwtService from "@/common/jwt.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${JwtService.getToken()}`;
  },

  setInterceptor(router) {
    Vue.axios.interceptors.response.use(undefined, err => {
      return new Promise(() => {
        if (err.response.status === 401) {
          JwtService.destroyToken();
          router.push("/login");
        }
        throw err;
      });
    });
  },

  get(resource, params) {
    return Vue.axios.get(`${resource}`, {params});
  },

  getByParam(resource, id) {
    return Vue.axios.get(`${resource}/${id}`);
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, id, params) {
    return Vue.axios.put(`${resource}/${id}`, params);
  },

  delete(resource, id) {
    return Vue.axios.delete(`${resource}/${id}`);
  }
};

export default ApiService;

export const AutificationService = {
  login(resource, params) {
    return ApiService.post(resource, params);
  }
};

export const UsersService = {
  getListUsers(resource, params) {
    return ApiService.get(resource, params);
  },
  deleteUser(id){
    return ApiService.delete('admin/user', id);
  }
};
