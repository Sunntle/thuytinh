
import { useNavigate } from "react-router-dom"

function SelectTable() {
  const navigate = useNavigate()
  //handle select table
  const handleSelectTable = async(id)=>{
    navigate(`/ban-${id}`)
  }
  return (
    <div>Select table before going to the next site</div>
  )
}

export default SelectTable