"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useCreateWorkFlowMutation } from "@/app/api/workflow/workflowsApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectsQuery } from "@/app/api/project/projectApi"; // ✅ RTK Query hook for projects

type StageForm = {
    name: string;
    order: number;
};

type WorkflowFormData = {
    name: string;
    projectId: string; // ✅ new field
    stages: StageForm[];
};

export default function WorkflowCreateForm() {
    const [createWorkFlow, { isLoading }] = useCreateWorkFlowMutation();
    const { data: projects } = useGetProjectsQuery({}); // fetch projects
    console.log("project", projects)
    const [open, setOpen] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<WorkflowFormData>({
        defaultValues: {
            name: "",
            projectId: "",
            stages: [
                { name: "Backlog", order: 1 },
                { name: "In Progress", order: 2 },
                { name: "Code Review", order: 3 },
                { name: "QA ", order: 4 },
                { name: "Done", order: 5 },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "stages",
    });

    const onSubmit = async (data: WorkflowFormData) => {
        console.log(data)
        const payload = {
            name: data.name,
            projectId: data.projectId,
            stages: data.stages.map((s, index) => ({
                name: s.name,
                order: index + 1,
            })),
        };

        try {
            const res = await createWorkFlow(payload).unwrap();
            toast.success(res?.message || "Workflow created");
            reset();
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create workflow");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Button */}
            <DialogTrigger asChild>
                <Button>Create Workflow</Button>
            </DialogTrigger>

            {/* Modal */}
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create New Workflow</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 rounded-lg border w-full p-4 mx-auto bg-white"
                >
                    <h2 className="text-xl font-semibold">Create Workflow</h2>

                    {/* Workflow Name */}
                    <div className="space-y-1">
                        <Label>Workflow Name</Label>
                        <Input
                            placeholder="e.g. Task Management Flow"
                            {...register("name", { required: "Workflow name is required" })}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Project Dropdown */}
                    <div className="space-y-1">
                        <Label>Project</Label>
                        <select
                            className="border p-2 w-full rounded"
                            {...register("projectId", { required: "Please select a project" })}
                        >
                            <option value="">Select Project</option>
                            {projects?.map((p: any) => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                        {errors.projectId && (
                            <p className="text-sm text-red-500">{errors.projectId.message}</p>
                        )}
                    </div>

                    {/* Stages */}
                    <div className="space-y-2">
                        <Label>Stages</Label>

                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <Input
                                    placeholder={`Stage ${index + 1}`}
                                    {...register(`stages.${index}.name`, { required: "Stage name required" })}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({ name: "", order: fields.length + 1 })}
                            className="w-full"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Stage
                        </Button>
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full">
                        {isLoading ? <div className="flex justify-center"><Spinner /></div> : "Create Workflow"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
