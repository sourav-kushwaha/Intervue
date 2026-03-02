import {useMutation,useQuery} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/sessions"

export const useActiveSessions = ()=>{
    const result = useQuery({
        queryKey:["activeSessions"],
        queryFn:sessionApi.getActiveSessions
    })

    return result;
};

export const useCreateSession = () =>{
    const result = useMutation({
        mutationFn:sessionApi.createSession,
        onSuccess:()=> toast.success("Session created successfully"),
        onError:(error) => toast.error(error.response?.data?.message || "failed to create a room"),

    })
    return result;
}

export const useMyRecentSessions = () =>{
    const result = useQuery({
       queryKey:["myRecentSessions"],
       queryFn:sessionApi.getMyRecentSessions,
})
return result;
}

export const useSessionById = (id) =>{
    const result = useQuery({
       queryKey:["session",id],
       queryFn:sessionApi.getSessionById(id),
       enabled:!!id,
       refetchInterval:5000,
})
return result;
}

export const useJoinSession = (id) =>{
    const result = useMutation({
       mutationKey:["joinSession"],
       mutationFn:()=>sessionApi.joinSession(id),
       onSuccess:()=> toast.success("Joined the session successfully"),
       onError:(error)=> toast.error(error.response.data.message || "Failed to join the session")
})
return result;
}

export const useEndSession = (id) =>{
    const result = useMutation({
       mutationKey:["endSession"],
       mutationFn:()=>sessionApi.endSession(id),
       onSuccess:()=> toast.success("ended the session successfully"),
       onError:(error)=> toast.error(error.response.data.message || "Failed to end the session")
})
return result;
}
