// // auth.js

// import { useState, useEffect } from "react";
// import { createAuth } from "@supabase/ui";
// import supabase from "./supabase";

// export function useAuth() {
//   const [auth, setAuth] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = createAuth({
//       supabaseClient: supabase,
//       redirectTo: "/",
//     });

//     setAuth(auth);
//     setLoading(false);

//     const { data: authListener } = auth.onAuthStateChange((event, session) => {
//       setLoading(false);
//     });

//     return () => {
//       authListener.unsubscribe();
//     };
//   }, []);

//   return {
//     auth,
//     loading,
//   };
// }
