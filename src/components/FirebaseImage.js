import React, {useState} from 'react';

const FirebaseImage = () => {

    const [file, setFile] = useState('');

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file);
    }

    return(
        <div>
            <input
                className='ma2'
                type='file'
                accept='image/*'
                onChange={handleChange}
                />
            <button 
                className='ma2'
                onClick={()=>{console.log(file)}}
                >Upload to Firebase</button>
        </div>

    )
}

export default FirebaseImage;
