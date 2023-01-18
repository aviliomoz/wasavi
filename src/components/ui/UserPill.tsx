import { useState } from "react";

// Icons
import {
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// Hooks
import { useUser } from "../../hooks/useUser";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  showName?: boolean;
};

export const UserPill = ({ showName = true }: Props) => {
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  if (loading) return <></>;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white py-1 px-3 text-sm font-normal rounded-md shadow-sm flex space-x-2 items-center"
      >
        <FaUser className="fill-emerald-500" />
        {user && showName && (
          <p className="max-w-[100px] truncate">{user.name}</p>
        )}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        {isOpen && (
          <ul className="z-10 text-sm absolute -bottom-20 right-0 bg-white p-2 rounded-md shadow-md">
            <li className="flex items-center justify-end space-x-2 hover:bg-gray-50 py-1 px-2 rounded-sm">
              <FaCog />
              <p className="min-w-max">Ajustes de usuario</p>
            </li>
            <li
              onClick={() => logout()}
              className="flex items-center justify-end space-x-2 hover:bg-gray-50 py-1 px-2 rounded-sm"
            >
              <FaSignOutAlt />
              <p className="min-w-max">Cerrar sesión</p>
            </li>
          </ul>
        )}
      </button>
    </>
  );
};
