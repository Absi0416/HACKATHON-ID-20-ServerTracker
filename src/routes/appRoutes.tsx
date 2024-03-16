import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import LoginPage from '../pages/login/Login';
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ManageServerPage from "../pages/dashboard/ManageServer";
import AddServerPage from "../pages/dashboard/AddServerPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlertPage from "../pages/component/AlertPage";
import Installedversions from "../pages/component/InstalledversionPage";
//import RegistrationPage from "../pages/registration/RegistrationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";

const appRoutes: RouteType[] = [
  {

    index: true,
    element: <LoginPage />,
    state: "login"
  },
  {
    index: true,
    element: <HomePage />,
    state: "home"
  }, 
  {
    path: "/dashboard",
    element: <DashboardIndex />,
    state: "Profile",
    sidebarProps: {
      displayText: "My Profile",
      icon: <AccountCircleIcon />
    }
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/default",
        element: <DefaultPage />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Default"
        },
      },
      
      {
        path: "/dashboard/add",
        element: <AddServerPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Add Server"
        }
      },
      {
        path: "/dashboard/manageserver",
        element: <ManageServerPage />,
        state: "dashboard.manageserver",
        sidebarProps: {
          displayText: "Manage Server"
        }
      }
    ]
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Components",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "POC-AM CACHE"
        },
      },
      {
        path: "/component/installedversion",
        element: <Installedversions />,
        state: "component.installedversion",
        sidebarProps: {
          displayText: "Installed versions"
        }
      }
    ]
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Documentation",
      icon: <ArticleOutlinedIcon />
    }
  },
  {
    path: "/login",
    element: <LoginPage />,
    state: "login",
    sidebarProps: {
      displayText: "Login",
      icon: <FormatListBulletedOutlinedIcon />
    }
  }
];

export default appRoutes;