import React, {useRef} from 'react';
import {firestore} from '../firebase';
import { addDoc, collection } from '@firebase/firestore';

const FirebaseData = () => {

    const messageRef = useRef();
    const ref = collection(firestore, 'textInput');
    // if the collection textInput does not exist, it will create the collection

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);

        let data = {
            text: messageRef.current.value,
        };
        try {
            addDoc(ref, data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSave} >
                <label className='ma2'>Type text</label>
                <input className='ma2' type='text' ref={messageRef} />
                <button className='ma2' type='submit' >Save to Firebase</button>
            </form>
        </div>
    )
}

export default FirebaseData;

// The useRef Hook allows you to persist values between renders.

// It can be used to store a mutable value that does not cause a re-render when updated.

// It can be used to access a DOM element directly.

// useRef() only returns one item. It returns an Object called current.

