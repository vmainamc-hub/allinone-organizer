import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppTopBar } from "@/components/app/AppTopBar";
import { StreamProvider } from "@/lib/stream-context";
import { DerivAccountProvider } from "@/lib/deriv/account-context";
import { AutoTraderProvider } from "@/lib/deriv/auto-trader";

export const Route = createFileRoute("/_authenticated/app")({ component: AppLayout });

function AppLayout() {
  return (
    <DerivAccountProvider>
      <StreamProvider>
        <AutoTraderProvider>
          <div className="min-h-screen flex w-full flex-col">
            <AppTopBar />
            <main className="flex-1 grid-bg min-w-0">
              <Outlet />
            </main>
          </div>
        </AutoTraderProvider>
      </StreamProvider>
    </DerivAccountProvider>
  );
}
