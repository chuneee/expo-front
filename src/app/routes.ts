import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Payment from "./pages/Payment";
import TicketmasterValidation from "./pages/TicketmasterValidation";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ExhibitorRegistration from "./pages/ExhibitorRegistration";
import ExhibitorPackages from "./pages/ExhibitorPackages";
import ExhibitorPayment from "./pages/ExhibitorPayment";
import ExhibitorConfirmation from "./pages/ExhibitorConfirmation";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EventsManagement from "./pages/EventsManagement";
import CreateEvent from "./pages/CreateEvent";
import AttendeesManagement from "./pages/AttendeesManagement";
import ProvidersManagement from "./pages/ProvidersManagement";
import PaymentsManagement from "./pages/PaymentsManagement";
import ValidationManagement from "./pages/ValidationManagement";
import ReportsManagement from "./pages/ReportsManagement";
import SettingsManagement from "./pages/SettingsManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/registro",
    Component: Registration,
  },
  {
    path: "/pago",
    Component: Payment,
  },
  {
    path: "/validacion",
    Component: TicketmasterValidation,
  },
  {
    path: "/checkout",
    Component: Checkout,
  },
  {
    path: "/confirmacion",
    Component: Confirmation,
  },
  {
    path: "/registro-expositor",
    Component: ExhibitorRegistration,
  },
  {
    path: "/paquetes-expositor",
    Component: ExhibitorPackages,
  },
  {
    path: "/pago-expositor",
    Component: ExhibitorPayment,
  },
  {
    path: "/confirmacion-expositor",
    Component: ExhibitorConfirmation,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/eventos",
    Component: EventsManagement,
  },
  {
    path: "/admin/eventos/crear",
    Component: CreateEvent,
  },
  {
    path: "/admin/asistentes",
    Component: AttendeesManagement,
  },
  {
    path: "/admin/proveedores",
    Component: ProvidersManagement,
  },
  {
    path: "/admin/pagos",
    Component: PaymentsManagement,
  },
  {
    path: "/admin/validaciones",
    Component: ValidationManagement,
  },
  {
    path: "/admin/reportes",
    Component: ReportsManagement,
  },
  {
    path: "/admin/configuracion",
    Component: SettingsManagement,
  },
]);