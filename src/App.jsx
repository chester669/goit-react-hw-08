import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictRoute";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>Loading...</p>;

  return (
    <Routes>
      {}
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<HomePage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute component={ContactsPage} redirectTo="/login" />
          }
        />
      </Route>

      {}
      <Route
        path="/login"
        element={
          <RestrictedRoute component={LoginPage} redirectTo="/contacts" />
        }
      />
      <Route
        path="/register"
        element={
          <RestrictedRoute component={RegisterPage} redirectTo="/contacts" />
        }
      />

      {}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};
export default App;
