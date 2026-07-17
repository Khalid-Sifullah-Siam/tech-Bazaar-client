"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      ...user,
    });

    setIsLoading(false);
    if (error) {
      toast.error(error.message || "Email অথবা password সঠিক নয়");
      return;
    }

    toast.success("Login successful");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Sign in</Fieldset.Legend>
            <Description>Sign in to your account</Description>
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className="w-full" isDisabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
