import React, {useState} from 'react';

const UserInfo = ({name,age, IncreaseAge,DecreaseAge,onChangeName})=> {

    const [newName, setNewname] = useState('');

    return(
        <div>
            <h2 className='tc'> My name is {name} and I am {age} </h2>
            <button className='tc' onClick={IncreaseAge} >
                Increment age
            </button>
            <button className='tc ma2' onClick={DecreaseAge} >
                Decrease age
            </button>
            <div>
                    <h2 className='tc'>Type the new name</h2>
                    <input className='tc ma2'
                        value={newName}
                        onChange={(event)=> {
                            setNewname(event.target.value)
                        }}
                    />
                    <button className='ma2' onClick={()=>{onChangeName(newName)}}>Change name</button>
            </div>
        </div>
    )
}

export default UserInfo;
