import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/books";

export function useAddBooksBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (isbns: string[]) => {
      const res = await axios.post(`${API_URL}/bulk`, { isbns });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

export function useDeleteBooksBulk() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (isbns: string[]) => {
      const res = await axios.delete(`${API_URL}/bulk`, { data: { isbns } });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
