import { baseApi } from "../baseApi/baseApi";

// Task API slice
export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get all tasks
    getTasks: builder.query<any[], void>({
      query: () => "/all-task",
      providesTags: ["Task"]
    }),

    // 2️⃣ Create new task
    createTask: builder.mutation<any, any>({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body
      }),
      invalidatesTags: ["Task"]
    }),

    // 3️⃣ Change task stage
    changeStage: builder.mutation<any, { taskId: string; nextStageId: string }>({
      query: ({ taskId, nextStageId }) => ({
        url: `/task-stage-change/${taskId}/stage`,
        method: "PUT",
        body: { nextStageId }
      }),
      invalidatesTags: ["Task"]
    })
  })
});

export const { useGetTasksQuery, useCreateTaskMutation, useChangeStageMutation } = taskApi;
