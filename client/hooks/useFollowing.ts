import { useQuery } from "react-query";
import { keys } from "./queryKeys";
import { getIsFollowing } from "../services/user";

export const useFollowing = (userId, otherUserId, options = {}) => {
  return useQuery(
    keys.userFollowing(userId, otherUserId),
    () => getIsFollowing(userId, otherUserId),
    options
  );
};
