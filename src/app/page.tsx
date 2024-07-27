import { ThemeToggle } from "~/components/ui/theme-toggle";
import UploadthingUploadButton from "~/components/uploadthing-upload-button";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="m-12 items-center text-5xl">
                <> Upload, Configure, Visualize.</> <ThemeToggle />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <UploadthingUploadButton />
            </div>
        </main>
    );
}
