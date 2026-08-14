"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../lib/firebase";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  // Login page is always accessible
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Authentication check
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050807] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

          <p className="mt-4 text-sm text-gray-500">
            Checking admin access...
          </p>
        </div>
      </main>
    );
  }

  // Don't render protected pages when not authenticated
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050807] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

          <p className="mt-4 text-sm text-gray-500">
            Redirecting to login...
          </p>
        </div>
      </main>
    );
  }

  // Authenticated admin
  return <>{children}</>;
}