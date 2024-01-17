import axios from "axios";

// const API_BASE_URL = "http://localhost:9000";
const API_BASE_URL = "https://kra.betaeserver.com";
const API_BASE_URL_OTHER = "https://developervijay.vercel.app/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const setUserToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const loginUser = async (formData) => {
  try {
    // const response = await axiosInstance.post("/api/user/login", config);
    // return response.data;
    const res = await fetch(API_BASE_URL_OTHER + "api/db/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to send data");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

// export const getUser = (data = {}) => {
//   return new Promise((resolve, reject) => {
//     axiosInstance
//       .post("/api/user/allUsers", data)
//       .then((response) => {
//         resolve(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const getUser = async (data = {}) => {
//   try {
//     const response = await axiosInstance.post("/api/user/allUsers", data);
//     return response.data;
   
//   } catch (error) {
//     throw error;
//   }
// };
export const getUser = async () => {
  try {
    const res = await fetch(API_BASE_URL_OTHER + "api/db/getUser");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export const editUser = async (data) => {
  try {
    const response = await axiosInstance.get(
      "api/user/getUserById/" + data.id,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRole = async (data = {}) => {
  try {
    const response = await axiosInstance.get("/api/listing/getRoles", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDesignation = async (data = {}) => {
  try {
    const response = await axiosInstance.get(
      "/api/listing/getDesignations",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartment = async (data = {}) => {
  try {
    const response = await axiosInstance.get(
      "/api/listing/getDepartments",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data = {}) => {
  try {
    const response = await axiosInstance.put(
      "api/user/update/" + data.get("id"),
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
