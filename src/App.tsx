import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { RebelRoute } from "./components/routes/RebelRoute";

// Components
import { MainContainer } from "./components/MainContainer";
import { LoginForm } from "./components/auth/LoginForm";
import { RecoveryForm } from "./components/auth/RecoveryForm";
import { SignupForm } from "./components/auth/SignupForm";
import { RestaurantsList } from "./components/restaurant/RestaurantsList";
import { EmptyItem } from "./components/ui/EmptyItem";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SuppliesPage } from "./pages/SuppliesPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ConverterPage } from "./pages/ConverterPage";
import { SupplyDetails } from "./components/supplies/SupplyDetails";
import { ProductDetails } from "./components/products/ProductDetails";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<MainContainer />}>
          <Route path="/*" element={<LandingPage />}>
            <Route element={<PrivateRoute />}>
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
              <Route path="" element={<EmptyItem />} />
              <Route path=":id" element={<SupplyDetails />} />
              <Route path="new" element={<p>New supply</p>} />
              <Route path="edit/:id" element={<p>Edit supply</p>} />
            </Route>
            <Route path="/products/*" element={<ProductsPage />}>
              <Route path="" element={<EmptyItem />} />
              <Route path=":id" element={<ProductDetails />} />
              <Route path="new" element={<p>New product</p>} />
              <Route path="edit/:id" element={<p>Edit product</p>} />
            </Route>
            <Route path="/converter" element={<ConverterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
