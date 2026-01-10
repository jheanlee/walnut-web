import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input.tsx";
import { login } from "@/services/auth.ts";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths.ts";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field.tsx";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { localStorageKeys } from "@/config/local-storage.ts";
import { validateKey } from "@/lib/key.ts";
import { AuthManager } from "@/store/auth.ts";
import { getMasterKey, setMasterKey } from "@/services/master-key.ts";
import { loginSchema } from "@/services/form-schemas/login.ts";
import { toast } from "sonner";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState<number>(200);
  const [key, setKey] = useState<string | undefined>(undefined);

  const getSubmitStatusMessage = () => {
    switch (submitStatus) {
      case 401:
        return "Incorrect username or password";
      case 500:
        return "Unable to connect to the server";
      case 1403:
        return "Unable to decrypt master key";
      default:
        return `An error has occurred. Error code: ${submitStatus}`;
    }
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      masterKey: "",
    },
  });

  useEffect(() => {
    const localStorageMasterKey = localStorage.getItem(
      localStorageKeys.masterKey,
    );
    if (localStorageMasterKey == null) {
      AuthManager.masterKey = undefined;
      localStorage.removeItem(localStorageKeys.masterKey);
    } else {
      setKey(localStorageMasterKey);
    }

    console.log(localStorageMasterKey);
  }, []);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (
      localStorage.getItem(localStorageKeys.masterKey) === null &&
      values.masterKey === ""
    ) {
      form.setError("masterKey", {
        message: "Please enter your master key",
      });
      return;
    }

    if (
      localStorage.getItem(localStorageKeys.masterKey) === null &&
      !validateKey(values.masterKey)
    ) {
      form.setError("masterKey", { message: "Invalid key" });
      return;
    }

    const res = await login({
      username: values.username,
      password: values.password,
    });
    setSubmitStatus(res);

    if (res === 200) {
      if (localStorage.getItem(localStorageKeys.masterKey) === null) {
        await setMasterKey({
          masterPassword: values.password,
          masterKey: values.masterKey,
        });
        AuthManager.masterKey = values.masterKey;
        navigate(paths.root.home.getHref());
      } else {
        const decryptRes = await getMasterKey({
          masterPassword: values.password,
        });
        if (decryptRes !== 200) {
          setSubmitStatus(1403);
          AuthManager.masterKey = undefined;
          localStorage.removeItem(localStorageKeys.masterKey);
          toast.error("Unable to decrypt master key");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          navigate(paths.root.home.getHref());
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center content-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-100 h-70 mt-20 flex flex-col gap-4 content-center"
      >
        <FieldSet data-invalid={submitStatus !== 200}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    type="text"
                    placeholder="user"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {key === undefined && (
              <Controller
                name="masterKey"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Master Key</FieldLabel>
                    <Input
                      type="text"
                      placeholder=""
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
            {submitStatus !== 200 && (
              <FieldError>{getSubmitStatusMessage()}</FieldError>
            )}
            <div className="flex flex-col gap-2">
              {key !== undefined && (
                <Field>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      AuthManager.masterKey = undefined;
                      localStorage.removeItem(localStorageKeys.masterKey);
                      setKey(undefined);
                    }}
                  >
                    Reset master key
                  </Button>
                </Field>
              )}
              <Field>
                <Button type="submit">Submit</Button>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
