import { CSVForm } from "~/components/custom/csv-form";

export default function HomePage() {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center lg:flex-row">
            <div className="flex w-1/2 flex-col items-center">
                <CSVForm />
            </div>
            <div className="flex w-1/2 flex-col items-center">
                <p className="text-4xl font-bold text-primary">
                    RENDER CHART HERE
                </p>
            </div>
        </main>
    );
}
