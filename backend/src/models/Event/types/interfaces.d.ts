import { Status, TypeEvent } from "../../types/consts"

export interface ForEventRepoManaging<TInsert, TUpdate, TDetails> {
    insert: (event: TInsert) => Promise<EventModel | Error | void>
    update: ({ id, updateData }: { id: number, updateData: TUpdate }) => Promise<void | Error>
    listAll: () => Promise<EventModel[] | null>
    listByUser: (userId: number) => Promise<EventModel[] | null>
    getById: (id: number) => Promise<EventModel | null>
    getDetails: (id: number) => Promise<TDetails | null>
    destroy: ({ id }: { id: number }) => Promise<void>
}
