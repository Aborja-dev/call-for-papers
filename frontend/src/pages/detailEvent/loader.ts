import { EventService } from "@/pages/Home/service"

export const pageLoader = async ({ request, params }) => {
    const details = await EventService.getDetails({id: params.id })
    return {details }
}