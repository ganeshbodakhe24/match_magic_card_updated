import Card from "./Card";
import { useState, useEffect ,useContext} from "react";
import { GlobalStore } from "../App";

function Cards_main() {
    const{resetHandler}=useContext(GlobalStore);
    const [items, setItems] = useState([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);//
    let demo=[1,1,1,1,1,1,1,1,1,1,1,1];
    const [data, setData] = useState([]);//having set memory
    const [checkList, setCheckList] = useState(items);//set 1 when click cards
    const [reverseFlip, setReverseFlip] = useState();
    const [flipList, setFlipList] = useState(items);
    const [state, setState] = useState(-1);
    const[toggle,setToggle]=useState(true);


    function reset() {
        let itemsCopy = [...items];
        for (let i = 0; i < 6; i++) {
            let random = 0;
            let flag = 1;
            random = Math.floor(Math.random() * 12);
            if (itemsCopy[random] === -1) {
                itemsCopy[random] = i;
            }
            else {
                while (flag !== 0) {
                    random = ((random + 1) % 12);
                    if (itemsCopy[random] === -1) {
                        itemsCopy[random] = i;
                        flag = 0;
                    }
                }

            }
            // second filld
            flag = 1;
            random = Math.floor(Math.random() * 12);
            if (itemsCopy[random] === -1) {
                itemsCopy[random] = i;
                // console.log("second",itemsCopy);
            }
            else {
                while (flag !== 0) {
                    random = ((random + 1) % 12);
                    if (itemsCopy[random] === -1) {
                        itemsCopy[random] = i;
                        flag = 0;
                        // console.log("second collision",itemsCopy);
                    }
                }
            }
        }
        //set array
        setData(itemsCopy);
      
    }
    useEffect(() => {
        reset();
        resetHandler();// reset count
        setFlipList(demo);
        setState(-1);
        setReverseFlip('');
        setCheckList(items);
    },[toggle])


    // flip logic;
    function setFlipList_index(index) {
        let flipListCopy = [...flipList];
        flipListCopy[index] = -1;
        setFlipList(flipListCopy);
        console.log(flipList);
    }
    function getIndex(index) {
        let checkListCopy = [...checkList];
        checkListCopy[index] = 1;
        setCheckList(checkListCopy);
        let img_id = data[index];
            //second logic 
                setState((pre) => {
                    // console.log(data[pre]);
                    // console.log(data[index]);
                    if(pre==index){
                        return index;
                    }
                    if (data[pre] === data[index]) {
                        // console.log(":flip");
                        let flipListCopy = [...flipList];
                            flipListCopy[pre] = -1;
                            flipListCopy[index] = -1;
                            setFlipList(flipListCopy);
                            setReverseFlip('');
                    }
                    else {
                        // console.log("reverse flip");
                        setReverseFlip((prev) => {
                            let flipListCopy = [...flipList];
                            flipListCopy[prev] = 1;
                            setFlipList(flipListCopy);
                            return index;
                        })
                    }
                    return index;
                })
            
       

    }
    return (
        <>
            <div className="reset_btn_outer">
                <button className="reset_btn" onClick={(e)=>{setToggle(!toggle)}}>Reset</button>
            </div>
            <div className="card_outer_div">
                {
                    data.map((item, index) => (
                        <Card key={index} index={index} image_id={item} flipback={flipList[index]} getIndex={getIndex} setFlipList_index={setFlipList_index}></Card>
                    ))
                }
            </div>
        </>
    )
}
export default Cards_main;