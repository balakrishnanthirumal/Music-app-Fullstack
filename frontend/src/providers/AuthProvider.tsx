import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { UseSelector, useDispatch } from "react-redux";
import { checkAdminStatus } from "@/store/useAuthStore";
import { AppDispatch } from "@/store/store";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await dispatch(checkAdminStatus);
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <> {children}</>;
};
export default AuthProvider;
