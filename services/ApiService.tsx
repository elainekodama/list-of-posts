import { Post } from "@/models/Post";

export class ApiService {
    private baseUrl;

    constructor(baseUrl: string) {
        console.log(baseUrl)
        this.baseUrl = baseUrl;
    }

    /**
     * Get patient experience posts with gender and age filters
     * @param cursor 
     * @param limit 
     * @param minAge 
     * @param gender 
     * @returns 
     */
    public async fetchPatientPosts(cursor: number, limit: number, minAge?: number, gender: string = "A-Za-z") {
        let encoded: string;
        if (minAge != undefined) {
            const tensPlace = minAge === 0 ? 0 : Math.floor(minAge / 10);
            encoded = `[([${tensPlace}-${tensPlace + 1}][0-9]([${gender}])`;
        } else {
            encoded = `[([0-9][0-9]([${gender}])`;
        }
        const endpoint = '/data';
        const query = `_page=${cursor}&_limit=${limit}&title_like=${encoded}`;
        const posts: Post[] = [];
        const jsonData = await this.get(endpoint, query);
        if (jsonData as any[]) {
            jsonData.forEach((element: any) => {
                posts.push(Post.getPostFromJson(element));
            });
        }
        return posts;
    }

    /**
     * Update the number of hugs for a post
     * @param postUrl 
     * @param newNumHugs 
     */
    public async updateNumberOfHugs(postUrl: string, newNumHugs: number): Promise<void> {
        const endpoint = `/data/${postUrl}`;
        await this.patch(endpoint, { "num_hugs": newNumHugs });
    }

    /**
     * Create get request
     * @param endpoint 
     * @param query 
     * @returns 
     */
    private async get(endpoint: string, query?: string) {
        try {
            let url = `${this.baseUrl}${endpoint}`;
            if (query) {
                url += `?${query}`;
            }
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            throw new Error("Error fetching data", {
                cause: error
            });
        }
    }

    /**
     * Update object in database
     * @param endpoint 
     * @param updates 
     * @returns 
     */
    private async patch(endpoint: string, updates: object) {
        try {
            return await fetch(`${this.baseUrl}${endpoint}`, {
                method: "PATCH",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(updates)
            })
        } catch (error) {
            throw new Error("Error fetching data", {
                cause: error
            });
        }
    }
}