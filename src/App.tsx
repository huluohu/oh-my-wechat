import ContactList from "@/components/contact-list.tsx";
import MessageList from "@/components/message-list.tsx";
import SessionList from "@/components/session-list.tsx";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useDatabase } from "@/lib/hooks/databaseProvider";
import { useState } from "react";

const App = () => {
  const { initialized, loadDirectory, databases } = useDatabase();

  const [wxid, setWxid] = useState<string | null>(null);
  const [isChatroom, setIsChatroom] = useState<boolean>(false);

  return (
    <>
      <div className="fixed bottom-0 left-0">
        <Button
          variant="outline"
          onClick={async () => {
            const directoryHandle = await window.showDirectoryPicker();
            if ((await directoryHandle.requestPermission()) === "granted") {
              loadDirectory(directoryHandle);
            }
          }}
        >
          Open Backup Directory
        </Button>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <Tabs defaultValue="sessions" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="sessions">消息</TabsTrigger>
              <TabsTrigger value="contact">通讯录</TabsTrigger>
            </TabsList>
            <TabsContent value="sessions">
              {initialized && (
                <SessionList
                  onClickUser={(wxid) => {
                    setWxid(wxid);
                  }}
                />
              )}
            </TabsContent>
            <TabsContent value="contact">
              {initialized && (
                <ContactList
                  onClickUser={(wxid) => {
                    if (wxid.endsWith("@chatroom")) {
                      setIsChatroom(true);
                    } else {
                      setIsChatroom(false);
                    }
                    setWxid(wxid);
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {wxid && <MessageList wxid={wxid} isChatroom={isChatroom} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default App;
