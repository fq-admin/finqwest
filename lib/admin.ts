import { auth } from "@clerk/nextjs/server"

const adminIds=[
   'user_2jjd3ASPPziaW1Suwph6t0npwaz'
]

export const isAdmin=()=>{
   const {userId}=auth()

   if(!userId){
      return false
   }

   return adminIds.indexOf(userId)!==-1
}