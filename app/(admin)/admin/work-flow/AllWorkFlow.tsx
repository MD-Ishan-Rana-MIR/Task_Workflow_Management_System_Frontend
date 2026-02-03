"use client";

import { useGetWorkflowsQuery } from "@/app/api/workflow/workflowsApi";
import { useGetTasksQuery } from "@/app/api/task/taskApi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CreateTask from "./CreateTask";

export default function AllWorkFlow() {

    const [open, setOpen] = useState<boolean>(false);

    const { data: workflowData, isLoading: workflowsLoading } = useGetWorkflowsQuery({});
    const { data: taskData, isLoading: tasksLoading } = useGetTasksQuery({});

    const workflows = workflowData?.data || [];
    const tasks = taskData?.data || [];

    const [boardData, setBoardData] = useState<Record<string, any[]>>({});

    // Organize tasks by stage
    useEffect(() => {
        if (workflows.length) {
            const temp: Record<string, any[]> = {};
            workflows.forEach((wf: any) => {
                wf.stages.forEach((stage: any) => {
                    const stageId = stage.order.toString();
                    temp[stageId] = tasks.filter(
                        (t: any) => t.stage === stageId && t.workflow === wf._id.toString()
                    );
                });
            });
            setBoardData(temp);
        }
    }, [workflows, tasks]);

    if (workflowsLoading || tasksLoading) return <p>Loading...</p>;
    if (!workflows.length) return <p>No workflows found</p>;

    const openTaskModal = (stageId: string) => {
        console.log("Open task modal for stage:", stageId);
        setOpen(!open)
    };

    return (
        <div className="p-6 space-y-8">
            {workflows.map((workflow: any) => (
                <div key={workflow._id} className="space-y-4">
                    <h2 className="text-2xl font-bold">{workflow.name}</h2>

                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {workflow.stages.map((stage: any) => {
                            const stageId = stage.order.toString();
                            return (
                                <div
                                    key={stageId}
                                    className="flex-shrink-0 w-64 bg-gray-100 rounded-lg p-4"
                                >
                                    <h3 className="font-semibold mb-2">{stage.name}</h3>

                                    <div className="space-y-2 min-h-[50px]">
                                        {(boardData[stageId] || []).map((task: any) => (
                                            <div
                                                key={task._id.toString()}
                                                className="bg-white p-2 rounded shadow-sm"
                                            >
                                                {task.title}
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="mt-2 w-full text-sm"
                                        onClick={() => openTaskModal(stageId)}
                                    >
                                        + Add Task
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div>
                {
                    open && (
                        <CreateTask open={open} setOpen={setOpen} ></CreateTask>
                    )
                }
            </div>
        </div>
    );
}
