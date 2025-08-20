import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8000/books";

export function useBooks(search?: string) {
  return useQuery({
    queryKey: ["books", search],
    queryFn: async () => {
      const res = await axios.get(API_URL, { params: search ? { query: search } : {} });
      return res.data;
    },
  });
}

export function useAddBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (isbn: string) => {
      const res = await axios.post(API_URL, { isbn });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (isbn: string) => {
      await axios.delete(`${API_URL}/${isbn}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
