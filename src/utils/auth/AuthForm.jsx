"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "./supabase";
export default function AuthForm() {
  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={true}
      providers={["google", "discord"]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
