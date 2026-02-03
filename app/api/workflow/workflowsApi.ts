import { baseApi } from "../baseApi/baseApi";

export const workflowsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query({
      query: () => "/all-workflow",
      providesTags: ["Workflow"]
    }),
    createWorkFlow: builder.mutation({
      query: (data) => ({
        url: `/create-workflow`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Workflow"]
    })
  })
});

export const { useGetWorkflowsQuery, useCreateWorkFlowMutation } = workflowsApi;