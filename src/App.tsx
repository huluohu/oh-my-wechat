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
import { useApp } from "@/lib/hooks/appProvider.tsx";
import { useDatabase } from "@/lib/hooks/databaseProvider";
import { useState } from "react";

const App = () => {
  const { initialized, loadDirectory, databases } = useDatabase();

  const { session, setSession } = useApp();

  const [wxid, setWxid] = useState<string | null>(null);
  const [isChatroom, setIsChatroom] = useState<boolean>(false);

  return (
    <>


      <ResizablePanelGroup direction="horizontal" className="min-h-screen max-h-screen">
        <ResizablePanel defaultSize={30}>
          <Tabs defaultValue="sessions" className="h-full flex flex-col">
            <TabsContent value="sessions" className="grow overflow-auto">
              <div>
                {initialized && (
                  <SessionList
                    onClickUser={(wxid) => {
                      setSession(wxid);
                      setWxid(wxid);
                    }}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="contact" className="grow overflow-auto">
              <div>
                {initialized && (
                  <ContactList
                    onClickUser={(wxid) => {
                      if (wxid.endsWith("@chatroom")) {
                        setIsChatroom(true);
                      } else {
                        setIsChatroom(false);
                      }
                      setSession(wxid);
                      setWxid(wxid);
                    }}
                  />
                )}
              </div>
            </TabsContent>

            <div className={"p-2.5 flex items-center gap-2.5"}>
              <TabsList>
                <TabsTrigger value="sessions">消息</TabsTrigger>
                <TabsTrigger value="contact">通讯录</TabsTrigger>
              </TabsList>

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
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className={"h-full p-2.5 overflow-auto"}>
            {wxid && <MessageList wxid={wxid} isChatroom={isChatroom} />}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default App;
