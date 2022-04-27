import SignIn from "../pages/SignIn/SignIn";
import Home from "../pages/Home/Home";
import Error404 from "../pages/Error404";
const routes = [
  {
    path: "/",
    component: Home,
    extact: true,
  },
  {
    path: "/login",
    component: SignIn,
    extact: true,
  },
  {
    component: Error404,
  },
];

export default routes;
