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
    let token = window.localStorage.getItem('access_token');
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  setInterceptor(router) {
    Vue.axios.interceptors.response.use(undefined, err => {
      return new Promise(() => {
        if(err.response) {
          if (err.response.status === 401) {
            JwtService.destroyToken();
            router.push("/login");
          }
          throw err;
        }
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
  },
  logout() {
    return ApiService.post('logout');
  }
};

export const UsersService = {
  getListUsers(resource, params) {
    return ApiService.get(resource, params);
  },
  deleteUser(id){
    return ApiService.delete('admin/user', id);
  },
  getUserById(id) {
    return ApiService.getByParam('admin/users', id);
  }
};

export const GymsService = {
  getListGyms(params){
    return ApiService.get('admin/gyms', params);
  },
  getGym(id) {
    return ApiService.getByParam('admin/gyms', id);
  },
  confirmGym(id, params) {
    return ApiService.update('admin/gyms/confirm', id, params);
  },
  updateGym(id, params) {
    return ApiService.update('admin/gyms', id, params);
  }
};

export const LocationService = {
  getLocation(query) {
    return ApiService.get('admin/location', query);
  }
};

export const ReviewsService = {
  getListReviews(params) {
    return ApiService.get('admin/reviews', params);
  },
  getReview(id) {
    return ApiService.getByParam('admin/review', id);
  },
  confirmReview(id, params) {
    return ApiService.update('admin/review/confirm', id, params);
  },
  updateReview(id, params) {
    return ApiService.update('admin/review', id, params);
  }
};

export const CitiesService = {
  getListCities(params) {
    return ApiService.get('admin/list/cities', params);
  },
  getCity(id) {
    return ApiService.getByParam('admin/city', id);
  },
  updateCity(id, params) {
    return ApiService.update('admin/update/city', id, params);
  },
  createCity(params) {
    return ApiService.post('admin/create/city', params);
  },
  deleteCity(id) {
    return ApiService.delete('admin/delete/city', id);
  },
  listCitiesForSelect() {
    return ApiService.get('list/cities/for/select');
  }
};

export const ActivitiesService = {
  getListActivities(params) {
    return ApiService.get('admin/activities', params);
  },
  getActivity(id) {
    return ApiService.getByParam('admin/activity', id);
  },
  createActivity(params) {
    return ApiService.post('admin/create/activity', params);
  },
  updateActivity(params) {
    return ApiService.post('admin/update/activity', params);
  },
  deleteActivity(id) {
    return ApiService.delete('admin/activity', id);
  }
};

export const AchievementsService = {
  getListAchievements(params) {
    return ApiService.get('admin/achievements', params);
  },
  getAchievement(id) {
    return ApiService.getByParam('admin/achievement', id);
  },
  createAchievement(params) {
    return ApiService.post('admin/create/achievement', params);
  },
  updateAchievement(params) {
    return ApiService.post('admin/update/achievement', params);
  },
  deleteAchievement(id) {
    return ApiService.delete('admin/achievement', id);
  },
  getListActivitiesForSelect() {
    return ApiService.get('admin/list/activities/for/select');
  }
};

export const SliderPhotosService = {
  createSliderPhotos(params) {
    return ApiService.post('admin/slider/images', params);
  },
  getSliderImages() {
    return ApiService.get('admin/list/images');
  }
};