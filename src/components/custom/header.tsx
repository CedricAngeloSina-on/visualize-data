import { ThemeToggle } from "~/components/ui/theme-toggle";

export function Header() {
    return (
        <header className="sticky top-0 flex h-16 items-center justify-center border-b px-4 lg:justify-start">
            <div className="flex items-end justify-center gap-2 text-5xl font-extrabold tracking-tight text-primary">
                <> DataChart</> <ThemeToggle />
            </div>
        </header>
    );
}
