const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const uploadResumeAPI = async (formData) => {
  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
};