import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { data } from "react-router-dom";

function useDeleteLike(){
    return useMutation({
        mutationFn:deleteLike,
        onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey:[QUERY_KEY.lps],
                        exact: false,
                    });
                },
    });;
}

export default useDeleteLike;