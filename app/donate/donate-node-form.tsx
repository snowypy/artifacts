"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { donateNode } from "./actions"

export async function getServerSideProps(context: { req: { headers: { cookie: any } } }) {
    const res = await fetch('http://localhost:8080/api/user', {
        headers: {
            Cookie: context.req.headers.cookie,
        },
    });

    if (res.status === 401) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    const user = await res.json();

    return {
        props: { user },
    };
}

const formSchema = z.object({
    cpuCores: z.number().min(1, "Must have at least 1 CPU core").max(128, "Maximum 128 CPU cores"),
    ramGB: z.number().min(1, "Must have at least 1GB of RAM").max(1024, "Maximum 1024GB of RAM"),
    storageGB: z.number().min(10, "Must have at least 10GB of storage").max(10000, "Maximum 10000GB of storage"),
    availability: z.enum(["always", "scheduled", "on-demand"]),
})

export default function DonateNodeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpuCores: 2,
            ramGB: 4,
            storageGB: 20,
            availability: "always",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            await donateNode(values)
            toast({
                title: "Node Registered Successfully",
                description: "Thank you for donating your computing resources! Check your email for setup instructions.",
            })
            form.reset()
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem registering your node. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // @ts-ignore
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="cpuCores"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPU Cores</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                                The number of CPU cores you can dedicate to building projects. More cores allow for faster builds and parallel processing.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ramGB"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>RAM (GB)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                                The amount of RAM in gigabytes you can allocate. More RAM enables handling larger projects and multiple builds simultaneously.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="storageGB"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Storage (GB)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                                The amount of storage space in gigabytes you can provide. This is used for caching dependencies and storing build artifacts temporarily.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Availability</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select availability" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="always">Always Available</SelectItem>
                                    <SelectItem value="scheduled">Scheduled Availability</SelectItem>
                                    <SelectItem value="on-demand">On-Demand</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Choose how often your node will be available for builds:
                                <ul className="list-disc list-inside mt-2">
                                    <li>Always Available: Your node is ready to accept tasks 24/7</li>
                                    <li>Scheduled Availability: Set specific times when your node can run builds</li>
                                    <li>On-Demand: Manually start and stop your node&#39;s availability</li>
                                </ul>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering Node..." : "Register Node"}
                </Button>
            </form>
        </Form>
    )
}

