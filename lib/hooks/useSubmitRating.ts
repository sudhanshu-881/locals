
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitRatingAction } from '@/lib/actions/ratings';
import { toast } from 'sonner';

export function useSubmitRating(rateeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitRatingAction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success('Rating submitted successfully!');
        queryClient.invalidateQueries({ queryKey: ['provider', rateeId] });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
