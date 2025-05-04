'use client';

interface SearchResultItemProps {
    post: {
        title: string;
        body: string;
    };
}

export function SearchResultItem({post}: SearchResultItemProps) {
    return (
        <div className="border ml-3 my-1 rounded border-gray-300 p-2">
            <h2 className="font-bold">{post.title}</h2>
            <p className="text-gray-300">{post.body}</p>
        </div>
    )
}