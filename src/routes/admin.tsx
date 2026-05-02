import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/admin")({
  component: () => (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
      </div>
    </ThemeProvider>
  ),
});
