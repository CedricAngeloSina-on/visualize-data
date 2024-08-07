"use client";
import { useEffect, useState, type ChangeEvent } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Papa from "papaparse";
import { cn } from "~/lib/utils";

import { ThemeToggle } from "~/components/ui/theme-toggle";
import { MultiSelect } from "~/components/ui/multi-select";
import { Button } from "~/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "~/components/ui/command";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";

const chartTypes = [
    { label: "Bar Chart", value: "bar" },
    { label: "Line Chart", value: "line" },
    { label: "Pie Chart", value: "pie" },
];

const FormSchema = z.object({
    columns: z
        .array(z.string().min(2))
        .min(2, "Please select at least two columns."),
    chartType: z.string({
        required_error: "Please select a chart type.",
    }),
});

export default function HomePage() {
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    const multiSelectOptions = columns.map((column) => ({
        label: column,
        value: column,
    }));

    useEffect(() => {
        console.log("Parsed Data: ", data);
    }, [data]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse<Record<string, unknown>>(file, {
                header: true,
                complete: (results) => {
                    setData(results.data);

                    if (results.data.length > 0 && results.data[0]) {
                        const keys = Object.keys(results.data[0]);
                        setColumns(keys);
                    }
                },
            });
        }
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            columns: [],
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="m-12 items-center text-5xl">
                <> Upload, Configure, Visualize.</> <ThemeToggle />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <div>
                        <Label htmlFor="csv">Upload Your CSV</Label>
                        <Input
                            id="csv"
                            type="file"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="columns"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Columns</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={multiSelectOptions}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select columns"
                                            variant="inverted"
                                            animation={2}
                                            maxCount={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose the columns you want to include.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chartType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Chart Type</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-[200px] justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? chartTypes.find(
                                                              (chartType) =>
                                                                  chartType.value ===
                                                                  field.value
                                                          )?.label
                                                        : "Select chart type"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search chart type..." />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No chart type found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {chartTypes.map(
                                                            (chartType) => (
                                                                <CommandItem
                                                                    value={
                                                                        chartType.label
                                                                    }
                                                                    key={
                                                                        chartType.value
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "chartType",
                                                                            chartType.value
                                                                        );
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            chartType.value ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {
                                                                        chartType.label
                                                                    }
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
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
