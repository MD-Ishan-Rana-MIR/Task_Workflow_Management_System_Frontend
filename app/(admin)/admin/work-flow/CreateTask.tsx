"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Example stages data (can fetch from API inside this component if needed)
const   defaultStages = [
    { _id: "stage1", name: "To Do" },
    { _id: "stage2", name: "In Progress" },
    { _id: "stage3", name: "Done" },
];

type CreateTaskForm = {
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    currentStage: string;
    dueDate: string;
};

interface Props {
    open: boolean;
    setOpen: (val: boolean) => void;
}

const CreateTask: React.FC<Props> = ({ open, setOpen }) => {
    const { register, handleSubmit, control, reset } = useForm<CreateTaskForm>({
        defaultValues: {
            title: "",
            description: "",
            priority: "MEDIUM",
            currentStage: defaultStages[0]?._id || "",
            dueDate: "",
        },
    });

    const [creatingTask, setCreatingTask] = useState(false);
    const [stages, setStages] = useState(defaultStages);

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset({
                title: "",
                description: "",
                priority: "MEDIUM",
                currentStage: stages[0]?._id || "",
                dueDate: "",
            });
        }
    }, [open, reset, stages]);

    const submitHandler = async (data: CreateTaskForm) => {
        setCreatingTask(true);

        try {
            // Simulate API call
            await new Promise((res) => setTimeout(res, 1000));

            toast.success(`Task "${data.title}" created successfully!`);
            setOpen(false);
            reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to create task");
        } finally {
            setCreatingTask(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg mx-auto">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-4">
                    <div className="space-y-1">
                        <Label>Title</Label>
                        <Input placeholder="Task Title" {...register("title", { required: true })} />
                    </div>

                    <div className="space-y-1">
                        <Label>Description</Label>
                        <textarea
                            placeholder="Task Description"
                            className="border p-2 rounded w-full"
                            {...register("description", { required: true })}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Priority</Label>
                        <Controller
                            control={control}
                            name="priority"
                            render={({ field }) => (
                                <Select {...field}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Stage</Label>
                        <Controller
                            control={control}
                            name="currentStage"
                            render={({ field }) => (
                                <Select {...field}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stages.map((s) => (
                                            <SelectItem key={s._id} value={s._id}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Due Date</Label>
                        <Input type="date" {...register("dueDate", { required: true })} />
                    </div>

                    <Button type="submit" className="w-full" disabled={creatingTask}>
                        {creatingTask ? "Creating..." : "Create Task"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTask;
