import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  //?Hook for getting the queryClient used in the app.jsx
  const queryClient = useQueryClient();

  //? Hook for mutating a state
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    //? function for mutating the state(deleting a cabin using the id)
    mutationFn: (id) => deleteBookingApi(id),
    //? Updating the UI by invalidating the queries
    onSuccess: () => {
      toast.success("Booking Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
