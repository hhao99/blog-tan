import { useServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import type { User } from '~/prisma/client';
type AppSession = {
    email: User['email']
    user_id: User['id']
    firstname: User['firstname']
    lastname: User['lastname']
}

export const useAppSession = ()=> {
    return useSession<AppSession>({
        password: "changemeonproductiondeploymentifyoudontwanttobefired"
    })
}

