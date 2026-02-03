"use client";

import { useState } from "react";
import { useCreateProjectMutation, useGetProjectsQuery } from "@/redux/api/projectsApi";
import { useGetWorkflowsQuery } from "@/redux/api/workflowsApi";
import { useGetUsersQuery } from "@/redux/api/usersApi";

export default function CreateProjectForm() {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { data: workflows } = useGetWorkflowsQuery();
  const { data: users } = useGetUsersQuery();

  const [form, setForm] = useState({
    name: "",
    description: "",
    workflowId: "",
    members: [] as string[]
  });

  const submitHandler = async () => {
    if (!form.name || !form.workflowId) return alert("Name & Workflow required");

    try {
      await createProject(form).unwrap();
      alert("Project created");
      setForm({ name: "", description: "", workflowId: "", members: [] });
    } catch {
      alert("Failed to create project");
    }
  };

  return (
    <div className="p-4 border rounded w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Create Project</h2>

      <input
        placeholder="Project Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 mb-2 w-full"
      />

      <select
        value={form.workflowId}
        onChange={(e) => setForm({ ...form, workflowId: e.target.value })}
        className="border p-2 mb-2 w-full"
      >
        <option value="">Select Workflow</option>
        {workflows?.map((w: any) => (
          <option key={w._id} value={w._id}>{w.name}</option>
        ))}
      </select>

      <select
        multiple
        value={form.members}
        onChange={(e) =>
          setForm({ ...form, members: Array.from(e.target.selectedOptions, o => o.value) })
        }
        className="border p-2 mb-2 w-full"
      >
        {users?.map((u: any) => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <button
        onClick={submitHandler}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {isLoading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}
