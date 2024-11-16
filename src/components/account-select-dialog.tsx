import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useDatabase } from "@/lib/hooks/databaseProvider.tsx";
import type { Account } from "@/lib/schema.ts";
import type { DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AccountSelectDialog(props: DialogProps) {
  const { loadDirectory, directory, loadDatabases, accountList } =
    useDatabase();
  const [accountSelected, setAccountSelected] = useState<Account>();

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogTitle>打开备份</DialogTitle>
        <Button
          variant="outline"
          className="w-fit h-auto flex flex-col"
          onClick={async () => {
            const directoryHandle = await window.showDirectoryPicker();
            if ((await directoryHandle.requestPermission()) === "granted") {
              loadDirectory(directoryHandle);
            }
          }}
        >
          <div className="size-6 bg-neutral-400" />
          打开备份文件夹
        </Button>
        {directory && (
          <Select
            onValueChange={(accountMd5) => {
              setAccountSelected(
                accountList.find((account) => account.md5 === accountMd5),
              );
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择账号" />
            </SelectTrigger>
            <SelectContent>
              {accountList.map((account) => (
                <SelectItem key={account.md5} value={account.md5}>
                  {account.md5}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          onClick={() => {
            loadDatabases(accountSelected);
          }}
        >
          打开
        </Button>
      </DialogContent>
    </Dialog>
  );
}
