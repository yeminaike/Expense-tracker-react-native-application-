import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { Image } from 'expo-image'
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = useState("")

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <KeyboardAwareScrollView
     style={{flex:1}}
    contentContainerStyle={{flexGrow:1}}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    // extraScrollHeight={100}
    
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration}/>

    <Text style={styles.title}>Welcome Back 👋</Text>
 {error ? (
        <View style={styles.errorBox}>
          <Ionicons name='alert-circle' size={20} color={COLORS.expense}/>
            <Text style ={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
               <Ionicons name='close' size={20} color={COLORS.text}/>
            </TouchableOpacity>
        </View>

        ):null}
      <TextInput
      style={[styles.input, error && styles.errorInput]}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
      style={[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity  style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
     
               <Text style ={styles.footerText}>Do&apos;nt have an account?</Text>
               <Link href="/sign-up" asChild>
                 <TouchableOpacity>
                 <Text style={styles.linkText}>Sign up</Text>
                 
               </TouchableOpacity>
               </Link>
             
            
             </View>
      </View>
     
    </KeyboardAwareScrollView>
  )
}




//  <View style = {styles.container} >
// //       <Text style={styles.heading}>Believe Similoluwa. You Can and You Will.</Text>

// //       <Link href={'/about'}>About Us</Link>


// //       {/* <Image
// //       source={{uri: 'https://images.unsplash.com/photo-1761839257144-297ce252742e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
// //       style={{width:300, height: 300}}
// //       >

// //       </Image> */}
// // <View><Text>Hello</Text></View>
// //       <Image
// //       source={require("@/assets/images/android-icon-foreground.png")}
// //        style={{width:100, height: 100}}
      
// //       >
// //       </Image>
// //     </View>