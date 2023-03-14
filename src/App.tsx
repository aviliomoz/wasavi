import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Routes
import { RebelRoute } from "./components/routes/RebelRoute";
import { PrivateRoute } from "./components/routes/PrivateRoute";

// Components
import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { RecoveryForm } from "./components/auth/RecoveryForm";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { SuppliesEditor } from "./pages/SuppliesEditor";
import { ProductsEditor } from "./pages/ProductsEditor";
import { ElementsPage } from "./pages/ElementsPage";

// Utils
import { getSession } from "./utils/auth";

// Layouts
import { RootLayout } from "./layouts/RootLayout";
import { AuthLayout } from "./layouts/AuthLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<RebelRoute />} loader={getSession}>
        <Route index element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="recovery" element={<RecoveryForm />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />} loader={getSession}>
        <Route path="home" element={<HomePage />} />
        <Route
          path="products/:pagination"
          element={<ElementsPage target="products" />}
        />
        <Route path="products/editor/:id" element={<ProductsEditor />} />
        <Route
          path="supplies/:pagination"
          element={<ElementsPage target="supplies" />}
        />
        <Route path="supplies/editor/:id" element={<SuppliesEditor />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
