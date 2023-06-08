import './App.css'
import { Auth } from './components/Auth'

function App() {
  return (
    <>
      <Auth
        url='dashboard'
        buttonColor='blue'
        buttonText='Login'
        buttonTextColor='white'
      />
    </>
  )
}

export default App
