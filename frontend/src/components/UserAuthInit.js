import { useLocation, useNavigate } from "react-router-dom"
import { callUserAuthApi } from '../services';
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";

function UserAuthInit() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await callUserAuthApi();
      
      if (data?.userInfo) {
        setUser(data.userInfo);
      }
      return data?.success ?
        location.pathname.startsWith('/auth') && navigate('/tasks/list')
        : !location.pathname.startsWith('/auth') && navigate('/auth/signin');
    }
    verifyUserCookie();
  }, [navigate, location.pathname,setUser])

  return null;
}

export default UserAuthInit