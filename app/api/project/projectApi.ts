import { baseApi } from "../baseApi/baseApi";

// Project API
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Get all projects
    getProjects: builder.query<any[], void>({
      query: () => "/projects",
      providesTags: ["Project"]
    }),

    // 2️⃣ Create project
    createProject: builder.mutation<any, any>({
      query: (body) => ({
        url: "/projects",
        method: "POST",
        body
      }),
      invalidatesTags: ["Project"]
    }),

    // 3️⃣ Update project
    updateProject: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Project"]
    }),

    // 4️⃣ Delete project
    deleteProject: builder.mutation<any, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Project"]
    })
  })
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = projectsApi;
