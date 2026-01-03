import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { PasswordForm } from "@/components/forms/password-item.tsx";
import { PasswordList } from "@/components/list/password-list.tsx";
import { useState } from "react";

export const Home = () => {
  const [itemId, setItemId] = useState<number | null>(null);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Tabs
        defaultValue="passwords"
        className="w-full h-full flex flex-col m-4"
      >
        <TabsList>
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
        </TabsList>
        <TabsContent value="passwords" className="flex-1 overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full overflow-hidden"
          >
            <ResizablePanel>
              <PasswordList setItemId={setItemId} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              {/* TODO limit panel size */}
              <PasswordForm id={itemId} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};
