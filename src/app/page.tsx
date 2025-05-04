'use client';

import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {

    const queryClient = useQueryClient();

    async function fetchPosts() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        return res.json();
    }

    const { data: todos, isLoading } = useQuery({
        // queryKey - used as identification for internal caching and some other things
        queryKey: ["todos"],
        queryFn: fetchPosts,
    });

    const refetchTodos = async () => {
        await queryClient.invalidateQueries({
            queryKey: ["todos"],
        });
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={async () => await refetchTodos()}>invalidate</button>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {
                            todos?.map((post: any) => (
                                <div key={post.id}>
                                    <h2>{post.title}</h2>
                                    <p>{post.body}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
