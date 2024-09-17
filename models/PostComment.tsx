export interface PostComment {
    id: number,
    display_name: string,
    text: string,
    created_at: string,
    parent_id?: number,
}