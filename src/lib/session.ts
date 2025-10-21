
import { useSession } from "@tanstack/react-start/server";
import type { User } from '~/prisma/client';

type AppSession = {
    email: User['email']
    id: User['id']
    firstname: User['firstname']
    lastname: User['lastname']
}

export const useAppSession = ()=> {
    return useSession<AppSession>({
        password: "changemeonproductiondeploymentifyoudontwanttobefired"
    })
}



