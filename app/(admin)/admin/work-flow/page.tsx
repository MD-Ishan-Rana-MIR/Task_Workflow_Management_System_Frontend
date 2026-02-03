// "use client";

// import { useAllUserQuery } from "@/app/api/auth/authApi";
// import { useGetProjectsQuery } from "@/app/api/project/projectApi";
// import { useChangeStageMutation, useCreateTaskMutation, useGetTasksQuery } from "@/app/api/task/taskApi";
// import { useGetWorkflowsQuery } from "@/app/api/workflow/workflowsApi";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// // import ProtectedRoute from "@/components/ProtectedRoute";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


// export default function TasksPage() {
//   const [open, setOpen] = useState(false);


//   // all users 

//   const { data: user } = useAllUserQuery({});

//   const users = user?.data || [];

//   // all project 


//   const { data } = useGetProjectsQuery({})

//   // all workflow 

//   const { data: project } = useGetWorkflowsQuery({});

//   const projects = project?.data || []

//   const workflows = data?.data || [];

//   // Task queries & mutations
//   const { data: tasks, isLoading } = useGetTasksQuery();
//   const [changeStage] = useChangeStageMutation();
//   const [createTask, { isLoading: creating }] = useCreateTaskMutation();

//   // Form state
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     priority: "MEDIUM",
//     workflow: "",
//     project: "",
//     assignedUsers: [] as string[],
//     dueDate: ""
//   });

//   // Submit new task
//   const submitHandler = async () => {
//     if (!form.title || !form.workflow) return alert("Fill required fields");
//     try {
//       await createTask(form).unwrap();
//       alert("Task created");
//       setForm({
//         title: "",
//         description: "",
//         priority: "MEDIUM",
//         workflow: "",
//         project: "",
//         assignedUsers: [],
//         dueDate: ""
//       });
//     } catch {
//       alert("Failed to create task");
//     }
//   };

//   // Drag & drop
//   const onDragEnd = async (result: DropResult) => {
//     const { source, destination, draggableId } = result;
//     if (!destination || source.droppableId === destination.droppableId) return;

//     const task = tasks.find((t: any) => t._id === draggableId);
//     if (!task || !task.nextStageId) return alert("Cannot move task");

//     try {
//       await changeStage({ taskId: task._id, nextStageId: task.nextStageId }).unwrap();
//     } catch {
//       alert("Stage move not allowed");
//     }
//   };



//   // Group tasks by stage
//   const grouped: any = {};
//   tasks?.forEach((task: any) => {
//     const stage = task.currentStage.stageName;
//     if (!grouped[stage]) grouped[stage] = [];
//     grouped[stage].push(task);
//   });

//   if (isLoading) return <p>Loading tasks...</p>;

//   return (
//     // <ProtectedRoute roles={["ADMIN","MANAGER","MEMBER"]}>
//     <div className="flex  p-4   ">
//       {/* Task Create Form */}
//       <div className="flex justify-end">
//         <Dialog open={open} onOpenChange={setOpen}>
//           {/* Open Button */}
//           <DialogTrigger asChild>
//             <Button>Task Create</Button>
//           </DialogTrigger>

//           {/* Modal */}
//           <DialogContent className="max-w-lg">
//             <DialogHeader>
//               <DialogTitle>Create Task</DialogTitle>
//             </DialogHeader>

//             <div className=" p-4 bg-white max-w-lg mx-auto ">

//               <input
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               />

//               <textarea
//                 placeholder="Description"
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               />

//               <select
//                 value={form.priority}
//                 onChange={(e) => setForm({ ...form, priority: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               >
//                 <option value="LOW">Low</option>
//                 <option value="MEDIUM">Medium</option>
//                 <option value="HIGH">High</option>
//               </select>

//               <select
//                 value={form.workflow}
//                 onChange={(e) => setForm({ ...form, workflow: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               >
//                 <option value="">Select Workflow</option>
//                 {workflows.map((w: any) => (
//                   <option key={w._id} value={w._id}>{w.name}</option>
//                 ))}
//               </select>

//               <select
//                 value={form.project}
//                 onChange={(e) => setForm({ ...form, project: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               >
//                 <option value="">Select Project</option>
//                 {projects.map((p: any) => (
//                   <option key={p._id} value={p._id}>{p.name}</option>
//                 ))}
//               </select>

//               <select
//                 multiple
//                 value={form.assignedUsers}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     assignedUsers: Array.from(e.target.selectedOptions, o => o.value)
//                   })
//                 }
//                 className="border p-2 mb-2 w-full"
//               >
//                 {users.map((u: any) => (
//                   <option key={u._id} value={u._id}>{u.name}</option>
//                 ))}
//               </select>

//               <input
//                 type="date"
//                 value={form.dueDate}
//                 onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
//                 className="border p-2 mb-2 w-full"
//               />

//               <Button
//                 onClick={submitHandler}
//                 disabled={creating}
//                 className="text-white p-2 rounded w-full"
//               >
//                 {creating ? "Creating..." : "Create Task"}
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Kanban Board */}
//       <div className="flex-1 overflow-x-auto border border-black ">
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className="flex gap-4">
//             {Object.keys(grouped).map((stageName) => (
//               <Droppable droppableId={stageName} key={stageName}>
//                 {(provided: any) => (
//                   <div
//                     className="min-w-[250px] bg-gray-100 p-2 rounded"
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                   >
//                     <h3 className="font-bold mb-2">{stageName}</h3>
//                     {grouped[stageName].map((task: any, index: number) => (
//                       <Draggable key={task._id} draggableId={task._id} index={index}>
//                         {(provided: any) => (
//                           <div
//                             className="border p-2 mb-2 bg-white rounded"
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                           >
//                             <p className="font-medium">{task.title}</p>
//                             <p className="text-xs text-gray-500">{task.priority}</p>
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             ))}
//           </div>
//         </DragDropContext>
//       </div>
//     </div >
//     // </ProtectedRoute>
//   );
// }


import React from 'react'
import WorkflowCreateForm from './WorkFlowCreate'
import AllWorkFlow from './AllWorkFlow'

const Page = () => {
  return (
    <div>
      <WorkflowCreateForm />
      <AllWorkFlow />
    </div>
  )
}

export default Page