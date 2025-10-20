import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { CopyCheck, Copy } from "lucide-react";
import { useEffect, useState } from "react";

const passwordSchema = z.object({
  name: z.string().normalize().min(1).max(256),
  email: z.email().optional(),
  username: z.string().normalize().max(1024),
  password: z.string().normalize().max(1024),
  websites: z.array(z.string().normalize().max(2048)).max(256),
  notes: z.string().normalize().max(2048),
});

export const PasswordForm = () => {
  const [usernameCopied, setUsernameCopied] = useState<boolean>(false);
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false);

  useEffect(() => {
    if (usernameCopied) {
      const timer = setTimeout(() => {
        setUsernameCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [usernameCopied]);
  useEffect(() => {
    if (passwordCopied) {
      const timer = setTimeout(() => {
        setPasswordCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [passwordCopied]);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      name: "",
      email: undefined,
      username: "",
      password: "",
      websites: [],
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    //  TODO
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FieldSet>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Item Name</FieldLabel>
                  <FieldContent>
                    <Input
                      type="text"
                      placeholder="Item Name"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <FieldContent>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        type="text"
                        placeholder="Username"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          aria-label="copy"
                          title="copy"
                          size="icon-xs"
                          onClick={async () => {
                            void navigator.clipboard.writeText(
                              form.getValues("username"),
                            );
                            setUsernameCopied(true);
                          }}
                        >
                          {usernameCopied ? <CopyCheck /> : <Copy />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        type="password"
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          aria-label="copy"
                          title="copy"
                          size="icon-xs"
                          onClick={async () => {
                            void navigator.clipboard.writeText(
                              form.getValues("password"),
                            );
                            setPasswordCopied(true);
                          }}
                        >
                          {passwordCopied ? <CopyCheck /> : <Copy />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="websites"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Website(s)</FieldLabel>
                  <FieldContent>
                    <Input
                      type="text"
                      placeholder="example.com"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            {/* TODO multiple websites*/}
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Notes</FieldLabel>
                  <FieldContent>
                    <Textarea
                      placeholder="Notes"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};
