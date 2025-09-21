import axios from "axios";

const config = {
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-origin": "*",
  },
};

export const fetchRequest = async (endpoint) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const { data } = await axios.get(`${baseUrl}/${endpoint}`, config);
  return data;
};

export const createRequest = async (endpoint, newData) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const { data } = await axios.post(
    `${baseUrl}/${endpoint}`,
    JSON.stringify(newData),
    config
  );
  return data;
};

export function getImageSrc(imgUrl) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  if (imgUrl?.startsWith("./")) {
    // Remove the './' and prepend the base URL
    return baseUrl + "/" + imgUrl.slice(2);
  } else if (imgUrl?.startsWith("/")) {
    // If it starts with '/', just prepend the base URL
    return baseUrl + imgUrl;
  } else {
    // For absolute URLs or other cases, return as is
    return imgUrl;
  }
}

export const deleteRequest = async (endpoint) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const { data } = await axios.delete(`${baseUrl}/${endpoint}`, config);
  return data;
};
