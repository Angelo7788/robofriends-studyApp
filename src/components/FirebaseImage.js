import React, {useState} from 'react';
import {storage} from '../firebase';
import {
    ref,
    uploadBytesResumable
} from '@firebase/storage';

const FirebaseImage = () => {

    const [file, setFile] = useState('');

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file);
    }

    const handleUpload = () => {
        if (!file) {
            alert('Please select a file first!')
        }
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
    }

    //'files' name of the folder where to put the file

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
                onClick={handleUpload}
                >Upload to Firebase</button>
        </div>

    )
}

export default FirebaseImage;

// Create an upload task by passing the Firebase storage instance to the uploadBytesResumable() function. 
// There are several methods you can use, but this particular one allows you to pause and resume an upload. 
// It also exposes progress updates.
