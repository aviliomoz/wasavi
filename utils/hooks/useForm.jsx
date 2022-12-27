import { useState } from "react";

export const useForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, handleInputChange };
};
