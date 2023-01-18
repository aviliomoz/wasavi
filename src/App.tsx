import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { RebelRoute } from "./components/routes/RebelRoute";

// Components
import { LoginForm } from "./components/auth/LoginForm";
import { RecoveryForm } from "./components/auth/RecoveryForm";
import { ResetForm } from "./components/auth/ResetForm";
import { SignupForm } from "./components/auth/SignupForm";
import { RestaurantsList } from "./components/restaurant/RestaurantsList";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SuppliesPage } from "./pages/SuppliesPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ConverterPage } from "./pages/ConverterPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/*" element={<LandingPage />}>
          <Route element={<PrivateRoute />}>
            <Route path="reset" element={<ResetForm />} />
            <Route path="home" element={<RestaurantsList />} />
          </Route>
          <Route element={<RebelRoute />}>
            <Route path="" element={<LoginForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="recovery" element={<RecoveryForm />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/supplies/*" element={<SuppliesPage />}>
            <Route path="" element={<p>Selecciona un insumo</p>} />
            <Route path=":id" element={<p>Detalles del insumo (x)</p>} />
            <Route path="new" element={<p>New supply</p>} />
            <Route path="edit/:id" element={<p>Edit supply</p>} />
          </Route>
          <Route path="/products/*" element={<ProductsPage />}>
            <Route path="" element={<p>Selecciona un producto</p>} />
            <Route path=":id" element={<p>Detalles del producto (x)</p>} />
            <Route path="new" element={<p>New product</p>} />
            <Route path="edit/:id" element={<p>Edit product</p>} />
          </Route>
          <Route path="/converter" element={<ConverterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
