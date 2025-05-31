import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
    // const { data, isPending, isError } = useGetLpList({
    //     search,
    //     limit: 50,
    // });
    const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } = useGetInfiniteLpList(5, debouncedValue, PAGINATION_ORDER.desc);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    console.log(inView);

    if (isPending) {
        return <div className="mt-20">Loading</div>;
    }

    if (isError) {
        return <div className="mt-20">Error</div>
    }

    console.log(lps);

    return (
        <div className="container mx-auto px-4 py-6">
            <input className="bg-amber-50" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-amber-50">

                {isPending && <LpCardSkeletonList count={20}/>}

                {lps?.pages?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp) => 
                    <LpCard key={lp.id} lp={lp}/>)}

                {isFetching && <LpCardSkeletonList count={20}/>}
                
            </div>
            <div ref={ref} className="h-2"></div>
        </div>
    );
}

export default HomePage;