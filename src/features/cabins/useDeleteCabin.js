import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  //?Hook for getting the queryClient used in the app.jsx
  const queryClient = useQueryClient();

  //? Hook for mutating a state
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    //? function for mutating the state(deleting a cabin using the id)
    mutationFn: (id) => deleteCabinApi(id),
    //? Updating the UI by invalidating the queries
    onSuccess: () => {
      toast.success("Cabin Successfully Deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
