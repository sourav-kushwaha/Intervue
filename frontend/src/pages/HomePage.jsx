import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

function HomePage() {
  return (
    <div>
        <button className='btn btn-primary' onClick={()=>toast.success("you've successfully clicked it")}>click me</button>
      <SignedOut>
     <SignInButton mode='modal'><button>Login</button></SignInButton>
  </SignedOut>

  <SignedIn>
    <SignOutButton mode='modal'/>
  </SignedIn>

  <UserButton/> 
    
    </div>
  )
}

export default HomePage
