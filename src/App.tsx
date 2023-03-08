import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { RebelRoute } from "./components/routes/RebelRoute";

// Components
import { MainContainer } from "./components/ui/MainContainer";
import { LoginForm } from "./components/auth/LoginForm";
import { RecoveryForm } from "./components/auth/RecoveryForm";
import { SignupForm } from "./components/auth/SignupForm";
import { RestaurantsList } from "./components/restaurant/RestaurantsList";
import { EmptyItem } from "./components/ui/EmptyItem";
import { AppLayout } from "./components/ui/AppLayout";
import { SupplyEditor } from "./components/supplies/SupplyEditor";
import { ProductDetails } from "./components/products/ProductDetails";
import { SupplyCreator } from "./components/supplies/SupplyCreator";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SuppliesPage } from "./pages/SuppliesPage";
import { ProductsPage } from "./pages/ProductsPage";
import { PurchasesPage } from "./pages/PurchasesPage";
import { StockPage } from "./pages/StockPage";

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
            <Route element={<AppLayout />}>
              <Route path="/supplies" element={<SuppliesPage />} />
              <Route path="/supplies/new" element={<SupplyCreator />} />
              <Route path="/supplies/:id" element={<SupplyEditor />} />
              <Route path="/products/*" element={<ProductsPage />}>
                <Route path="" element={<EmptyItem />} />
                <Route path=":id" element={<ProductDetails />} />
                <Route path="new" element={<p>New product</p>} />
                <Route path="edit/:id" element={<p>Edit product</p>} />
              </Route>
              <Route path="/purchases" element={<PurchasesPage />} />
              <Route path="/stock" element={<StockPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
