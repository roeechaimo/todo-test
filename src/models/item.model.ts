export interface Item {
    item_id: number,
    item_title: string,
    item_body: string,
    item_image_url: string,
    show_image: boolean,
    item_creation_date: string,
    is_highlighted?: boolean
}