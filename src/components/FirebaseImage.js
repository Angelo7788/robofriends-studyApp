import React, {useState} from 'react';
import {storage} from '../firebase';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from '@firebase/storage';

const FirebaseImage = () => {

    const [file, setFile] = useState('');
    const [percent, setPercent] = useState(0);

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

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            ()=> {console.log("check")},
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('URL:', url);
                })
            }
        )
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
            <p>{percent} ' % done'</p>

        </div>

    )
}

export default FirebaseImage;

// Create an upload task by passing the Firebase storage instance to the uploadBytesResumable() function. 
// There are several methods you can use, but this particular one allows you to pause and resume an upload. 
// It also exposes progress updates.
