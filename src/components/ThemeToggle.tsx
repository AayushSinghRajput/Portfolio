import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full opacity-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-full border border-border/60 hover:bg-primary/10 hover:border-primary/50 text-foreground transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-amber-500 transition-all" />
          ) : theme === "dark" ? (
            <Moon className="h-4 w-4 text-cyan-400 transition-all" />
          ) : (
            <Laptop className="h-4 w-4 text-indigo-400 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border border-border/80 shadow-xl rounded-xl min-w-[130px]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium ${
            theme === "light" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-muted"
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium ${
            theme === "dark" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-muted"
          }`}
        >
          <Moon className="h-4 w-4 text-cyan-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-xs font-medium ${
            theme === "system" ? "bg-primary/15 text-primary font-semibold" : "hover:bg-muted"
          }`}
        >
          <Laptop className="h-4 w-4 text-indigo-400" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ThemeToggle;
