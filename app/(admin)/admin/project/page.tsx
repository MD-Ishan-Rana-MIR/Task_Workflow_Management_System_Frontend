"use client";

import { useAllUserQuery } from "@/app/api/auth/authApi";
import { useCreateProjectMutation } from "@/app/api/project/projectApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateProjectForm() {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { data: user } = useAllUserQuery({});
  const [open, setOpen] = useState<boolean>(false);

  const users = user?.data || [];

  const [form, setForm] = useState({
    name: "",
    description: "",
    members: [] as string[]
  });

  // Add user to selected members
  const addMember = (id: string) => {
    if (!form.members.includes(id)) {
      setForm({ ...form, members: [...form.members, id] });
    }
  };

  // Remove user from selected members
  const removeMember = (id: string) => {
    setForm({ ...form, members: form.members.filter((m) => m !== id) });
  };

  const submitHandler = async () => {


    try {
      const res = await createProject(form).unwrap();
      if (res) {
        toast.success(res?.message)
        setForm({ name: "", description: "", members: [] });
        setOpen(false); // close modal after success
      }
    } catch {
      alert("Failed to create project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <div className="p-4 border rounded w-full bg-white mx-auto space-y-4">
          <h2 className="text-xl font-bold mb-2">Create Project</h2>

          {/* Project Name */}
          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 w-full rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 w-full rounded"
          />

          {/* Users select dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Assign Users</label>
            <select
              className="border p-2 w-full rounded"
              onChange={(e) => addMember(e.target.value)}
              value=""
            >
              <option value="">Select user</option>
              {users
                .filter(u => !form.members.includes(u._id))
                .map((u: any) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
            </select>

            {/* Selected users */}
            <div className="flex flex-wrap gap-2 mt-2">
              {form.members.map((memberId) => {
                const member = users.find((u) => u._id === memberId);
                if (!member) return null;
                return (
                  <div
                    key={member._id}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {member.name}
                    <button
                      type="button"
                      onClick={() => removeMember(member._id)}
                      className="ml-1 text-blue-600 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={submitHandler}
            disabled={isLoading}
            className="w-full text-white p-2 rounded"
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
