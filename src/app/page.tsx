"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ThemeToggle } from "~/components/ui/theme-toggle";
import { MultiSelect } from "~/components/ui/multi-select";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";

const frameworksList = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

const FormSchema = z.object({
    frameworks: z
        .array(z.string().min(1))
        .min(1)
        .nonempty("Please select at least one framework."),
});

export default function HomePage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            frameworks: ["next.js", "nuxt.js"],
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="m-12 items-center text-5xl">
                <> Upload, Configure, Visualize.</> <ThemeToggle />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="frameworks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frameworks</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={frameworksList}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select options"
                                            variant="inverted"
                                            animation={2}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose the frameworks you are interested
                                        in.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant="default"
                            type="submit"
                            className="w-full"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5"></div>
        </main>
    );
}
