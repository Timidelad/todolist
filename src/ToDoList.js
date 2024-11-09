import { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

function ToDoList() {
    const [lists, updateList] = useState(() => {
        const savedItems = localStorage.getItem('lists');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const [inputValue, setInputValue] = useState('');

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
      }, [lists]);

    function addToList() {
        if(inputValue.trim !== "") {
            let newItem = {
                id: lists.length + 1,
                checkbox: false,
                text: inputValue
            };
            updateList([...lists, newItem])
            setInputValue('')
        }
    }
    function checkboxChange(id) {
        let updatedList = lists.map((item) => (
            item.id === id ? {...item, checkbox: !item.checkbox} : item
        ));
        updateList(updatedList)
    }
    function deleteList(id) {
        let newList = lists.filter((item)=> (
            item.id !== id
        ));
        updateList(newList)
    }
    return(
        <div className=" mt-5 mx-3 md:mx-[64px] lg:mx-[128px]">
            <div className="flex items-center justify-center w-full">
                <input 
                    className="border-2 border-myRound w-full bg-transparent rounded-md py-2 ps-1 focus:border-blue-500 focus:outline-none text-wrap text-white"
                    type="text"
                    placeholder="Add your task"
                    onChange={(e) => handleInputChange(e)}
                    value={inputValue}
                />
                <IoMdAddCircle 
                    onClick={addToList} 
                    style={{width : '40px', height : '40px', color: '#D6EF9C'}}
                />
            </div>
            <br />
            <br />
            <ul>
                {lists.map((item) => (
                    <li key={item.id} className="flex items-center mb-4 gap-2 w-full">
                        <input 
                        type="checkbox"
                        checked={item.checkbox}
                        onChange={() => checkboxChange(item.id)}
                        style={{width: '35px', height: '35px'}}
                        />
                        <label
                            onDoubleClick={() => checkboxChange(item.id)}
                            style={(item.checkbox) ? {textDecoration: 'line-through'} : null}
                            className="bg-bgCol  font-normal text-[20px] text-white py-1.5 ps-1 w-full"
                        >{item.text}</label>
                        <TiDelete 
                            onClick={() => deleteList(item.id)}
                            style={{width:'40px', height: '40px', color: '#EF0D49'}}
                        />
                    </li>
                ))}
            </ul>
            
            <br />
            <br />
            <br />

            <div className="text-white text-center">PROJECT CREATED BY <a href="https://linktr.ee/timidelad" target="_blank" rel="noreferrer" className="text-greencol">Timi Delad</a> </div>
            
        </div>
        
    )
}

export default ToDoList;
