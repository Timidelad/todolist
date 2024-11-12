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

        if(inputValue.trim() === '') {
            alert(`Type something, you can't have an empty task!`)
        } else {
            let newItem = {
                id: lists.length + 1,
                checkbox: false,
                text: inputValue,
                isEditing : false
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

    function saveTodo(id, newText) {
        if(newText.trim() === '') {
            alert(`Sorry, you can't have an empty task!`)
            let newList = lists.filter((item)=> (
                item.id !== id
            ));
            updateList(newList)
        } else {
            let updatedList = lists.map((list) => (
                list.id === id ? {...list, text : newText, isEditing : false} : list
            ))
            updateList(updatedList)
        }
        // let updatedList = lists.map((list) => (
        //     list.id === id ? {...list, text : newText, isEditing : false} : list
        // ))
        // updateList(updatedList)
    }

    function editIt(id) {
        let updatedList = lists.map((list)=>(
            list.id === id ? {...list, isEditing : true} : list
        ));
        updateList(updatedList)
    }
    return(
        <div className=" mt-5 mx-3 md:mx-[64px] lg:mx-[128px] ">
            <div className="flex items-center justify-center w-full">
                <input 
                    className="border-2 border-myRound w-full bg-transparent rounded-md py-2 ps-1 focus:border-blue-500 focus:outline-none text-wrap text-white"
                    type="text"
                    placeholder="Add your task"
                    onChange={(e) => handleInputChange(e)}
                    value={inputValue}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            addToList()
                        }
                    }}
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


                        {item.isEditing? 
                        (<input 
                            type="text"
                            defaultValue={item.text}
                            className="bg-bgCol  font-normal text-[20px] text-white py-1.5 ps-1 w-full text-wrap"
                            onBlur={(e) => saveTodo(item.id, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    saveTodo(item.id, e.target.value)
                                }
                            }}
                         />) : (
                            <span
                            onClick={() => editIt(item.id)}
                            style={(item.checkbox) ? {textDecoration: 'line-through'} : null}
                            className="bg-bgCol  font-normal text-[20px] text-white py-1.5 ps-1 w-full"
                        >{item.text}</span>
                         )}

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

            <div className="text-white text-center absolute bottom-0 left-0 w-full">PROJECT CREATED BY <a href="https://linktr.ee/timidelad" target="_blank" rel="noopener noreferrer" className="text-greencol">Timi Delad</a> </div>
            
        </div>
        
    )
}

export default ToDoList;
