import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Car } from "lucide-react";

import { Button } from "../../components/ui/Button";
import useAuthToken from "../../hooks/useAuth";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { getItem } = useAuthToken();
  const { token, isRole } = getItem();
  useEffect(() => {
    if (
      token ||
      isRole ||
      (isRole && ["sys_admin", "sacco_admin", "gov_admin"].includes(isRole))
    ) {
      if (isRole == "gov_admin") {
        return navigate("/govt-dashboard");
      }
      return navigate("/dashboard");
    }
    if (token || isRole) {
      if (isRole == "gov_admin") {
        return navigate("/govt-dashboard");
      }
      return navigate("/dashboard");
    }
  }, [isRole]);

  const handleLogin = async () => {
    setIsLoading(true);
    const notify = toast.loading("Logging in...");
    if (!username || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DJANGO_URI}/auth/login/`,
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Login successful", { id: notify });
        const data = await response.json();
        localStorage.setItem("tozaAuth", data?.access);
        localStorage.setItem("tozaRole", data?.role);
        if (data?.role == "gov_admin") {
          console.log(data.role);
          return navigate("/govt-dashboard");
        }

        navigate("/dashboard");
      }

      if (response.status === 404) {
        toast.error("Invalid credentials", { id: notify });
        console.log("Invalid credentials");
      }
      if (response.status === 401) {
        toast.error("Unauthorized 401", { id: notify });
        console.log("Unauthorized 401");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred", { id: notify });
      console.log(error);
    } finally {
      // toast.dismiss(notify);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col justify-center py-12 lg:px-8 items-center px-4 bg-login">
      <Toaster position="top-right" />
      <form
        action=""
        className="w-full md:w-[40%] justify-center items-center flex flex-col gap-4 border-2 py-12 px-2 shadow-2xl rounded-lg bg-gray-100"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md pb-6">
          <div className="flex justify-center items-center">
            <Car className="h-12 w-12 text-blue-600" />
            <h2 className="text-center text-3xl font-extrabold text-gray-700">
              TozaSmart
            </h2>
          </div>

          <p className="mt-2 text-center text-md font-bold text-gray-600">
            Vehicle Taxation Management System
          </p>
        </div>
        <div className="w-full flex flex-col justify-center">
          <label htmlFor="username" className="font-bold py-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username..."
            className="w-full border-2 rounded-lg p-2 border-gray-500"
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <label htmlFor="password" className="font-bold py-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
            className="w-full border-2 rounded-lg p-2 border-gray-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleLogin()}
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
