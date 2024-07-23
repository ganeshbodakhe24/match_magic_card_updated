import { useContext } from "react";
import { GlobalStore } from "../App";
function Swap(){
    const{swapCount}=useContext(GlobalStore)
    return(
        <>
       <div className="swap">
       <h2>Total Swap : {swapCount}</h2>
       </div>
        </>
    )
}
export default Swap;