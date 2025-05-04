    export function searchPosts(search: string, data: any) {
        const filteredData = Object.values(data).filter((post: any) => post.title.toLowerCase().includes(search.toLowerCase()));
        return filteredData;
    }