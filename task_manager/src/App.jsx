
import './App.css'
import NextWeek from './components/NextWeek'
import PrevWeek from './components/PrevWeek'
import ThisWeek from './components/ThisWeek'
import { Button } from './components/ui/button'

function App() {


  return (
    <>
      <div>
        <div className='header'>
        <button class="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-500 rounded hover:bg-blue-600 hover:border-blue-600 transition duration-300 ease-in-out">
  Create
</button>


        </div>
       <div className=' mt-[10%] flex gap-10 justify-center'>
       <PrevWeek />
        <ThisWeek />
        <NextWeek />
       </div>
      </div>
    </>
  )
}

export default App
