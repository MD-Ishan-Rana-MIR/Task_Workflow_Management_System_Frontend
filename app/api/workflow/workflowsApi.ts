import { baseApi } from "../baseApi/baseApi";

export const workflowsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkflows: builder.query<any[], void>({
      query: () => "/workflows",
      providesTags: ["Workflow"]
    })
  })
});

export const { useGetWorkflowsQuery } = workflowsApi;