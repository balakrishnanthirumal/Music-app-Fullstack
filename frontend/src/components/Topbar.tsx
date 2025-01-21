import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";
import { useSelector } from "react-redux";
const Topbar = () => {
  const isAdmin: boolean = useSelector((state: any) => state.admin.isAdmin);
  console.log({ isAdmin });
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center text-[2rem] mb-[13px]">
        {" "}
        Music.
      </div>
      <div className="flex items-center gap-6">
        {isAdmin && (
          <Link to={"/admin"} className="flex items-center">
            <LayoutDashboardIcon className="size-4 inline mr-1" />
            Admin DashBoard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
