import { useMutation, useQueryClient } from "react-query";
import { changeFollowState } from "../services/user";
import { keys } from "./queryKeys";
import { auth } from "../configs/firebase";

export const useFollowingMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(changeFollowState, {
    ...options,
    onMutate: (variables) => {
      queryClient.setQueryData(
        keys.userFollowing(auth.currentUser?.uid, variables.otherUserId),
        !variables.isFollowing
      );
    },
  });
};
