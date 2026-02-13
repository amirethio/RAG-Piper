import Hero from '../components/Hero'
import { About } from '../components/About'
import Feature from '../components/Feature'
import Tech from '../components/Tech'
import Team from '../components/Team'
import ChatBot from '../components/ChatBot'
// import Contact from '../components/Contact'

function Landing() {
  return (
    <>
    <Hero/>
    <About/>
    <Feature/>
    <Tech/>
    <Team/>
    
    {/* <Contact/> */}
    <ChatBot/>
    </>
  )
}

export default Landing