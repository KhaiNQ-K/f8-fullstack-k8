import axiosClient from './axiosClient';

export const productApi = {
  getAll: async (params) => {
    const { data } = await axiosClient.get('/products', { params });
    return {
      data: data.listProduct,
      pagination: {
        page: params.page,
        limit: params.limit,
        total: data.totalPage,
      },
    };
  },
};
