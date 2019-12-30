import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";

import LoginPage from "@/views/LoginPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import UserPage from "@/views/UserPage";
import GymsPage from "../views/GymsPage";
import GymPage from "../views/GymPage";
import ReviewsPage from "../views/ReviewsPage";
import ReviewPage from "../views/ReviewPage";
import CitiesPage from "../views/CitiesPage";
import CityPage from "../views/CityPage";
import ActivitiesPage from "../views/ActivitiesPage";
import ActivityPage from "../views/ActivityPage";
import CreateCityPage from "../views/CreateCityPage";
import CreateActivityPage from "../views/CreateActivityPage";
import CreateAchiemenentPage from "../views/CreateAchiemenentPage";
import AchievementsPage from "../views/AchievementsPage";
import AchievementPage from "../views/AchievementPage";
import PhotoSliderPage from "../views/PhotoSliderPage";
import CreatePhotosSliderPage from "../views/CreatePhotosSliderPage";

const routes = [
  {
    path: "/",
    name: "home",
    component: DashboardLayout,
    redirect: "/users",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "/users",
        name: "users",
        component: UsersPage
      },
      {
        name: "user",
        path: "/users/:id",
        component: UserPage
      },
      {
        name: "gyms",
        path: "/gyms",
        component: GymsPage
      },
      {
        name: "gym",
        path: "/gyms/:id",
        component: GymPage
      },
      {
        path: "reviews",
        name: "Reviews Page",
        component: ReviewsPage
      },
      {
        name: "review",
        path: "/reviews/:id",
        component: ReviewPage
      },
      {
        name: "cities",
        path: "/cities",
        component: CitiesPage
      },
      {
        name: "city",
        path: "/city/:id",
        component: CityPage
      },
      {
        name: "create_city",
        path: "create/city",
        component: CreateCityPage
      },
      {
        name: "activities",
        path: '/activities',
        component: ActivitiesPage
      },
      {
        name: "activity",
        path: '/activity/:id',
        component: ActivityPage
      },
      {
        name: "create_activity",
        path: '/create/activity',
        component: CreateActivityPage
      },
      {
        name: "achievements",
        path: "achievements",
        component: AchievementsPage
      },
      {
        name: "achievement",
        path: "/achievement/:id",
        component: AchievementPage,
      },
      {
        name: "create_achievement",
        path: "/create/achievement",
        component: CreateAchiemenentPage
      },
      {
        name: "photos_for_slider",
        path: "photos/slider",
        component: PhotoSliderPage
      },
      {
        name: "create_photos_for_slider",
        path: "create/photos/slider",
        component: CreatePhotosSliderPage,
      },
      // {
      //   name: "slider_photo",
      //   path: "slider/photo/:id",
      //   component: Slider
      // }
    ],
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/login",
    name: "login_page",
    component: LoginPage
  },
];

export default routes;
