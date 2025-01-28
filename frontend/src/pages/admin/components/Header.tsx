import { UserButton } from "@clerk/clerk-react";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <h1 className="text-zinc-400 mt-1">Manage your music catalog</h1>
        </div>
      </div>
      <div className="flex items-center px-3 gap-6">
        <Link to="/">
          <Home />
        </Link>

        <UserButton />
      </div>
    </div>
  );
};
export default Header;
