import { FaDownload } from "react-icons/fa";

export const DownloadButton = () => {
  return (
    <button className="bg-white flex items-center space-x-3 py-2 px-5 rounded-sm border text-sm text-emerald-500">
      <FaDownload />
      <p className="text-black">Descargar</p>
    </button>
  );
};
