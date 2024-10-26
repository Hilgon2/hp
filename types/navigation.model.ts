export interface HpNavItem {
    name: string
    label: string
    handler?: () => void
    path?: string
}