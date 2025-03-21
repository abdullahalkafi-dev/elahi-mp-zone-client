import { baseApi } from "../../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...
    getAllProducts: builder.query({
      query: (query) => {
        const queryString = query
          ? `/?${new URLSearchParams(query).toString()}`
          : "";

        return {
          url: `/product${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (body) => {
        return {
          url: "/product",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags:['Product']
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => ["Product"],
    }),

    // New endpoints for product variants
    createProductVariant: builder.mutation({
      query: (body) => {
        return {
          url: "/product/variant",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ProductVariant", "Product"],
    }),

    getProductVariants: builder.query({
      query: (productId) => {
        return {
          url: `/product/${productId}/variants`,
          method: "GET",
        };
      },
     providesTags:['ProductVariant','Product']
    }),

    getVariantById: builder.query({
      query: (id) => {
        return {
          url: `/product/variant/${id}`,
          method: "GET",
        };
      },
      providesTags:['ProductVariant','Product']
    }),

    updateVariant: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/product/variant/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["ProductVariant"],
    }),

    deleteVariant: builder.mutation({
      query: (id: string) => {
        return {
          url: `/product/variant/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ProductVariant", "Product"],
    }),

    getProductWithVariants: builder.query({
      query: (productId) => {
        return {
          url: `/product/${productId}/with-variants`,
          method: "GET",
        };
      },
      providesTags:['ProductVariant','Product']
    }),

  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  // New exports for variant endpoints
  useCreateProductVariantMutation,
  useGetProductVariantsQuery,
  useGetVariantByIdQuery,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useGetProductWithVariantsQuery,
  // Keep other existing exports...
} = productApi;
