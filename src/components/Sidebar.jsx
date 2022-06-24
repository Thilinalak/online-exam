import '../App.css'
import { SidebarData } from './SidebarData'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
        <ul className='SidebarList'>
          {SidebarData.map((val, key) => {
          return <li onClick={() => window.location.pathname = val.path} className='row' key={key} >
             <div>{val.icon}</div> <div>{val.titile}</div></li>
        })}
        </ul> 
    </div>
  )
}

export default Sidebar