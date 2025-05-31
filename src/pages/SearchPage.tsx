import { Outlet } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useState } from "react";

const HomePage = () => {
    const { data, isPending, isError } = useGetLpList({});
    const {search, setSearch} = useState("");

    console.log(data);

    return <div>
        {data?.data.data.map((lp)=><h1>{lp.title}</h1>)}
    </div>;
}

export default HomePage;