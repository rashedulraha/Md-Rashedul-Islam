import RealTimeChatWidget from "@/components/RealTimeChatWidget/RealTimeChatWidget";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Outlet></Outlet>
      <RealTimeChatWidget />
    </div>
  );
};

export default Layout;
