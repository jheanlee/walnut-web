import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import { PasswordForm } from "@/components/forms/password-item.tsx";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="passwords" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
        </TabsList>
        <TabsContent value="passwords">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel></ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
              {/* TODO limit panel size */}
              <PasswordForm />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};
