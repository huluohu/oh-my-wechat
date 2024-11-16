import ChatList from "@/components/chat-list.tsx";
import MessageList from "@/components/message-list.tsx";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import AccountSelectDialog from "@/components/account-select-dialog.tsx";
import Example from "@/components/example.tsx";
import { useApp } from "@/lib/hooks/appProvider.tsx";
import { useDatabase } from "@/lib/hooks/databaseProvider";
import { useState } from "react";
import ContactList from "./components/contact-list";
import { cn } from "./lib/utils";

const App = () => {
  const { account } = useDatabase();

  const { user, setUser, chat, setChat } = useApp();

  const [wxid, setWxid] = useState<string | null>(null);
  const [isChatroom, setIsChatroom] = useState<boolean>(false);

  return (
    <>
      {!account && <AccountSelectDialog open={false} />}

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen max-h-screen items-stretch"
      >
        <ResizablePanel defaultSize={25} minSize={10} className="flex">
          <Tabs defaultValue="sessions" className="w-full flex">
            <div className={"flex flex-col justify-between border-r"}>
              <TabsList className="h-auto p-0 flex flex-col bg-transparent">
                <TabsTrigger
                  value="sessions"
                  className={cn(
                    "w-16 h-[4.5rem] flex flex-col",
                    "data-[state=active]:shadow-none",
                  )}
                >
                  <div className="mt-1 w-8 h-8 rounded-full bg-neutral-400" />
                  <span className="mt-1 text-xs">消息</span>
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className={cn(
                    "w-16 h-[4.5rem] flex flex-col",
                    "data-[state=active]:shadow-none",
                  )}
                >
                  <div className="mt-1 w-8 h-8 rounded-full bg-neutral-400" />
                  <span className="mt-1 text-xs">通讯录</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sessions" className="grow overflow-auto m-0">
              <div>
                {account && (
                  <ChatList
                    onClick={(chat) => {
                      setChat(chat);
                      // setWxid(wxid);
                    }}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="contact" className="grow overflow-auto">
              <div>
                {account && (
                  <ContactList
                    onClick={() => {
                      // setChat()
                    }}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {chat ? (
            <MessageList
              chat={chat}
              isChatroom={chat.type === "chatroom"}
              className="w-full h-full"
            />
          ) : (
            <Example />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Details</DialogTitle>
            <DialogDescription>...</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
