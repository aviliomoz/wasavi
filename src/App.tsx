import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import { LoginForm } from "./components/auth/LoginForm";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { RebelRoute } from "./components/routes/RebelRoute";
import { RecoveryForm } from "./components/auth/RecoveryForm";
import { ResetForm } from "./components/auth/ResetForm";
import { SignupForm } from "./components/auth/SignupForm";
import { RestaurantsList } from "./components/restaurant/RestaurantsList";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

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
      </Routes>
    </BrowserRouter>
  );
};
