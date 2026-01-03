import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { PasswordForm } from "@/components/forms/password-item.tsx";
import { PasswordList } from "@/components/list/password-list.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";

export const Home = () => {
  const [itemId, setItemId] = useState<number | null>(null);
  const [itemListUpdateTrigger, setItemListUpdateTrigger] =
    useState<boolean>(false);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Tabs
        defaultValue="passwords"
        className="w-full h-full flex flex-col m-4"
      >
        <div className="w-full flex flex-row justify-between px-4">
          <TabsList>
            <TabsTrigger value="passwords">Passwords</TabsTrigger>
          </TabsList>
          <Button onClick={() => setItemId(null)}>
            <Plus />
            Create
          </Button>
        </div>
        <TabsContent value="passwords" className="flex-1 overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full overflow-hidden"
          >
            <ResizablePanel>
              <PasswordList
                setItemId={setItemId}
                updateTrigger={itemListUpdateTrigger}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              {/* TODO limit panel size */}
              <PasswordForm
                id={itemId}
                updateTrigger={itemListUpdateTrigger}
                setUpdateTrigger={setItemListUpdateTrigger}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};
