import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SessionProvider>{children}</SessionProvider>
    </section>
  );
}