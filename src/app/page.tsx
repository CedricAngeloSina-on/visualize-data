"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ThemeToggle } from "~/components/ui/theme-toggle";

// const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
// const ACCEPTED_FILE_TYPES = ["csv"];

const formSchema = z.object({
    username: z.string().min(2).max(50),
});

export default function HomePage() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="m-12 items-center text-5xl">
                <> Upload, Configure, Visualize.</> <ThemeToggle />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CSV</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="csv"
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </main>
    );
}
