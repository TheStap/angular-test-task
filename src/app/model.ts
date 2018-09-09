export interface List<Item> {
    items: Item[];
    has_more: boolean;
    quota_max: number;
    quota_remaining: number;
}
