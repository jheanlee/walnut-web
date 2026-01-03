import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  getPasswordItems,
  type PasswordListItem,
} from "@/services/items/password.ts";
import { paths } from "@/config/paths.ts";
import { toast } from "sonner";

export const PasswordList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<PasswordListItem[] | undefined>(undefined);

  useEffect(() => {
    const getItems = async () => {
      const res = await getPasswordItems();
      if (typeof res === "number") {
        toast.error(() => {
          switch (res) {
            case 400:
              return "Invalid item";
            case 401:
              navigate(paths.root.login.getHref());
              return "Session expired";
            case 403:
              return "Access denied";
            case 500:
              return "Unable to connect to server";
            default:
              return `An error has occurred. Error code: ${res}`;
          }
        });
      } else {
        setItems(res);
      }
    };

    void (async () => await getItems())();
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {items !== undefined &&
        items.map((item) => (
          <div className="text-left">
            <p>{item.name}</p>
          </div>
        ))}
    </div>
  );
};
