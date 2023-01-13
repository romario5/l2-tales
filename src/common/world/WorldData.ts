export default interface WorldData {
    x: number
    y: number
    objects: { objectId: string, x: number, y: number, z: number}[]
}