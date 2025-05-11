import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { boolean } from "zod";

function useGetLpList({cursor, search, order, limit}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps, search],
        queryFn: () => getLpList({
            cursor, search, order, limit
        }),
        staleTime: 1000*6*5,
        gcTime: 1000*6*10,
    });
}

export default useGetLpList;