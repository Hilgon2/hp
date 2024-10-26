export interface HpApiResponse<T> {
    data: T[]
    links: {
        first: string
        last: string
        next: string
        previous: string
        self: string
    },
    meta: {
        currentPage: number
        totalPages: number
        totalResults: number
    }
}