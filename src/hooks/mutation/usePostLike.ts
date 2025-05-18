import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike(){
    return useMutation({
        mutationFn:postLike,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps],
                exact:false,
            });
        },
    });;
}

export default usePostLike;