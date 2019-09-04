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

const routes = [
  {
    path: "/",
    name: "home",
    component: DashboardLayout,
    redirect: "/dashboard",
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
        path: "/gyms",
        name: "gyms",
        component: GymsPage
      }
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
