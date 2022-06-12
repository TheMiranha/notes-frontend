import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Team from './components/Team'
import Footer from './components/Footer'
import { useEffect } from 'react'

const Home = ({api}) => {

  useEffect(() => {
    api.checkToken()
  },)

  return (
    <div>
      <Header api={api}/>
      <hr/>
      <section id="home">
        <Hero api={api}/>
      </section>
      <hr/>
      <section id="features">
        <Features/>
      </section>
      <hr/>
      <section id="team">
        <Team/>
      </section>
      <hr/>
      <Footer/>
    </div>
  )
}

export default Home

