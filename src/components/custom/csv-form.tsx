"use client";
import { useMemo, useState, type ChangeEvent } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Papa from "papaparse";
import { cn } from "~/lib/utils";

import { MultiSelect } from "~/components/custom/multi-select";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
        .array(z.string().min(2).max(10))
        .min(2, "Please select at least two columns.")
        .max(10, "Please select at most ten axis."),
    chartType: z.string({
        required_error: "Please select a chart type.",
    }),
    xAxes: z
        .array(z.string().min(1).max(10))
        .min(1, "Please select at least one axis.")
        .max(10, "Please select at most ten axis."),
    yAxes: z
        .array(z.string().min(1).max(10))
        .min(1, "Please select at least one axis.")
        .max(10, "Please select at most ten axis."),
});

export function CSVForm() {
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const multiSelectOptions = useMemo(
        () =>
            columns.map((column) => ({
                label: column,
                value: column,
            })),
        [columns]
    );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            columns: [],
            chartType: "",
            xAxes: [],
            yAxes: [],
        },
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        form.reset({
            columns: [],
            chartType: "",
            xAxes: [],
            yAxes: [],
        });

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
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <div className="w-full text-5xl">
            <Card className="mx-auto w-full border-none">
                <CardHeader>
                    <CardTitle className="text-xl">CSV Upload</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-4 pb-2">
                            <Label htmlFor="csv">Upload Your CSV</Label>
                            <Input
                                id="csv"
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="grid gap-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="chartType"
                                            render={({ field }) => (
                                                <FormItem className="grid pb-2">
                                                    <FormLabel>
                                                        Chart Type
                                                    </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "justify-between",
                                                                        !field.value &&
                                                                            "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? chartTypes.find(
                                                                              (
                                                                                  chartType
                                                                              ) =>
                                                                                  chartType.value ===
                                                                                  field.value
                                                                          )
                                                                              ?.label
                                                                        : "Select chart Type"}
                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Command>
                                                                <CommandInput placeholder="Search chart type..." />
                                                                <CommandList>
                                                                    <CommandEmpty>
                                                                        No chart
                                                                        type
                                                                        found.
                                                                    </CommandEmpty>
                                                                    <CommandGroup>
                                                                        {chartTypes.map(
                                                                            (
                                                                                chartType
                                                                            ) => (
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
                                                    <FormDescription>
                                                        Select the chart type
                                                        you want to render.
                                                    </FormDescription>
                                                    <div className="min-h-5">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="columns"
                                            render={({ field }) => (
                                                <FormItem className="grid pb-2">
                                                    <FormLabel>
                                                        Columns
                                                    </FormLabel>
                                                    <FormControl>
                                                        <MultiSelect
                                                            options={
                                                                multiSelectOptions
                                                            }
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder="Select columns"
                                                            variant="inverted"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the columns you
                                                        want to include.
                                                    </FormDescription>
                                                    <div className="min-h-5">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="xAxes"
                                            render={({ field }) => (
                                                <FormItem className="grid pb-2">
                                                    <FormLabel>
                                                        X-Axes
                                                    </FormLabel>
                                                    <FormControl>
                                                        <MultiSelect
                                                            options={
                                                                multiSelectOptions
                                                            }
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder="Select X-Axes"
                                                            variant="inverted"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the axes you want
                                                        to include.
                                                    </FormDescription>
                                                    <div className="min-h-5">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="yAxes"
                                            render={({ field }) => (
                                                <FormItem className="grid pb-2">
                                                    <FormLabel>
                                                        Y-Axes
                                                    </FormLabel>
                                                    <FormControl>
                                                        <MultiSelect
                                                            options={
                                                                multiSelectOptions
                                                            }
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            defaultValue={
                                                                field.value
                                                            }
                                                            placeholder="Select Y-Axes"
                                                            variant="inverted"
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Choose the axes you want
                                                        to include.
                                                    </FormDescription>
                                                    <div className="min-h-5">
                                                        <FormMessage />
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
