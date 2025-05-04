'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { searchPosts } from "./utils/searchUtils";
import { SearchBox, SearchResultItem } from "./components";

export default function Home() {

    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>([]);

    const queryClient = useQueryClient();

    async function fetchPosts() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setData(data);
        return data;
    }

    const { isLoading } = useQuery({
        // queryKey - used as identification for internal caching and some other things, just like dependency array of useEffect
        queryKey: ["posts"],
        queryFn: fetchPosts,
        staleTime: Infinity,
    });

    const refetchPosts = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["posts"],
        });
    };


    useEffect(() => {
        const posts = searchPosts(search, data);
        setSearchResult(posts);
    }, [search, data]);

    return (
        <div>
            <h1>Home</h1>
            <SearchBox value={search} onChange={(value) => setSearch(value)} />
            <button onClick={async () => await refetchPosts()}>invalidate</button>
            {
                isLoading || !searchResult?.length || !search ? (
                    <div>{search ? "No Data Found" : "Type something to search"}</div>
                ) : (
                    <div>
                        {
                            searchResult?.map((post: any) => (
                                <SearchResultItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
