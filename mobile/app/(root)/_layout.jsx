import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";



export default function Layout (){
const { isSignedIn } = useUser()

 if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{headersShown: false}} />

}