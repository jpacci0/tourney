"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };

  const result = signinSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (!result.success) {
    const errori = result.error.flatten();
    if (errori.fieldErrors.password || errori.fieldErrors.email) {
      return redirect(`/login?message=Invalid email or password`);
    }
  } else {
    const { email, password } = result.data;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return redirect("/login?message=Invalid email or password");
    }
    return redirect("/");
  }
}

const signupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine((password) => {
      return (
        password.match(/[a-z]/) &&
        password.match(/[A-Z]/) &&
        password.match(/[0-9]/)
      );
    }, " Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});
// la funzione signup in questo modo non manda email di verifica. Il codice commentato serve nel caso in cui si voglia implementare l'invio di email di verifica. Mandando l'email di verifica non appare l'errore di email già esistente quindi bisogna gestirlo in altro modo.
export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  // };
  // const { error } = await supabase.auth.signUp(data);

  const result = signupSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (!result.success) {
    const errori = result.error.flatten();
    if (errori.fieldErrors.password && errori.fieldErrors.email) {
      return redirect(`/login?message=Invalid email and password`);
    }
    if (errori.fieldErrors.email) {
      return redirect(`/login?message=${errori.fieldErrors.email}`);
    }
    if (errori.fieldErrors.password) {
      return redirect(`/login?message=${errori.fieldErrors.password}`);
    }
  } else {
    const { email, password } = result.data;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return redirect("/login?message=This email address already exists");
    }
    return redirect("/profile");
  }
}

export async function signout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

const forgotPasswordSchema = z.string().email();

export async function forgotPassword(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const email = formData.get("email") as string;
  const result = forgotPasswordSchema.safeParse(
    formData.get("email") as string
  );
  if (!result.success) {
    return redirect(`/reset?message=Invalid email`);
  } else {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      result.data,
      {
        redirectTo: "http://localhost:3000/auth/reset",
      }
    );
    return redirect("/reset?message=Email sent");
  }
}

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .refine((password) => {
        return (
          password.match(/[a-z]/) &&
          password.match(/[A-Z]/) &&
          password.match(/[0-9]/)
        );
      }, " Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export async function updatePassword(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const result = resetPasswordSchema.safeParse({
    password: formData.get("password") as string,
    confirm: formData.get("passwordConfirmation") as string,
  });

  if (!result.success) {
    const errori = result.error.flatten().fieldErrors;
    if (errori.password) {
      return redirect(`/reset/update-password?message=${errori.password}`);
    }
    if (errori.confirm) {
      return redirect(`/reset/update-password?message=${errori.confirm}`);
    }
  } else {
    const { password } = result.data;
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    return redirect("/");
  }
}
