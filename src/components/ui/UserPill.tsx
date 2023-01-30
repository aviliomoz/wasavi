import { useNavigate } from "react-router-dom";

// Icons
import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

// Components
import { Pill } from "./Pill";

export const UserPill = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!user) return <></>;

  return (
    <Pill
      info={{ name: user.name, icon: FaUser }}
      options={[
        { name: "Ajustes de usuario", icon: FaCog, action: () => {} },
        { name: "Cerrar sesión", icon: FaSignOutAlt, action: handleLogout },
      ]}
    />
  );
};
