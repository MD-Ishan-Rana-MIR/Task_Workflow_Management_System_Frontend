import { baseApi } from "../baseApi/baseApi";

// Task API slice
export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get all tasks
    getTasks: builder.query({
      query: () => "/all-task",
      providesTags: ["Task"]
    }),

    // 2️⃣ Create new task
    createTask: builder.mutation
      ({
        query: (body) => ({
          url: "/tasks",
          method: "POST",
          body
        }),
        invalidatesTags: ["Task"]
      }),


    updateTaskStage: builder.mutation({
      query: ({ taskId, stageId }) => ({
        url: `/task-stage-change/${taskId}/stage`,
        method: "PUT",
        body: { nextStageId: stageId }
      })
    })
  })
});

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskStageMutation } = taskApi;
