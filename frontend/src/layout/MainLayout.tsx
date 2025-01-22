import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./component/LeftSidebar";
import FriendsActivity from "./component/FriendsActivity";
import AudioPlayer from "./component/AudioPlayer";
import PlayBackControls from "./component/PlayBackControls";

const MainLayout = () => {
  const IsMobile = false;
  return (
    <div className="h-screen bg-black text-white  flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <AudioPlayer />
        {/* left side */}
        <ResizablePanel
          defaultSize={20}
          minSize={IsMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* maincontent */}
        <ResizablePanel defaultSize={IsMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        {/* right side */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
      <PlayBackControls />
    </div>
  );
};
export default MainLayout;
