import axios from "axios"; // or any other library to make HTTP requests
import BASE_URL from "../../config";

export type User = {
  displayName: string;
  email: string;
  password: string;
  token?: string;
};

// user register
export const userRegister = async (user: User) => {
  const { displayName, email, password } = user;
  try {
    const endpoint = "/users/signup";
    const url = BASE_URL + endpoint;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, email, password }),
    });

    if (!response.ok) {
      throw new Error("Error during registration. Please try again.");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error };
  }
};

// userLogin
export const userLogin = async (user: User) => {
  const { displayName, email, password } = user;
  try {
    const endpoint = "/users/login";
    const url = BASE_URL + endpoint;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, email, password }),
    });

    // check if the server is ok
    if (!response.ok) {
      throw new Error("Error during login. Please try again.");
    }

    const data = await response.json();

    // check if there is any error
    if (data.error) {
      throw new Error(data.error);
    }

    // store JWT
    localStorage.setItem("token", data.token);

    // return res
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error };
  }
};

export const userLogout = () => {
  // delete JWT
  try {
    localStorage.removeItem("token");
    return { message: "User logged out successfully." };
  } catch (error) {
    console.error("Error:", error);
    return { error: "Error during logout. Please try again." };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  // get JWT
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const endpoint = "/users/current";
    const url = BASE_URL + endpoint;
    // sent res get currentUser
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      return null;
    }
    const userData: User = await response.json();
    return userData;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export async function createUserDocumentFromAuth(userAuth: User) {
  try {
    const endpoint = "/users/document";
    const url = BASE_URL + endpoint;
    const response = await axios.post(url, {
      userAuth,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
