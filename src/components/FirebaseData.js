import React, {useEffect, useRef, useState} from 'react';
import {firestore} from '../firebase';
import { addDoc, collection, getDocs } from '@firebase/firestore';
import { async } from '@firebase/util';

const FirebaseData = () => {

    const messageRef = useRef();
    const ref = collection(firestore, 'textInput');
    // if the collection textInput does not exist, it will create the collection

    const [info, setInfo] = useState('');
    const [infoFromFB, setInfoFromFB] = useState([]);

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

    // Second method to save to FB

    const addToFB = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(firestore, 'info'),{
                info: info,
            });
            console.log('Document ID:', docRef.id);
        } catch {
            console.error('Error adding doc:', e);
        }
    }

    //Read data from Firebase

    const fetchPost = async () => {
        await getDocs(collection(firestore, 'info'))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc)=> ({...doc.data(), id: doc.id}));
                setInfoFromFB(newData);
                console.log(newData);
            })
    }

    useEffect(()=> {
        fetchPost();
    }, [])

    return (
        <div>
            <form onSubmit={handleSave} >
                <label className='ma2'>Type text</label>
                <input className='ma2' type='text' ref={messageRef} />
                <button className='ma2' type='submit' >Save to Firebase</button>
            </form>
            <div>
                <h2>Collection Info</h2>
                <input
                    className='ma2'
                    type='text'
                    placeholder='What you want to save'
                    onChange={(e) => setInfo(e.target.value)}
                />
                <button
                    type='submit'
                    className='ma2'
                    onClick={addToFB}
                    >
                    Save to FB
                </button>
            </div>
            {/* showing info get from firebase */}
            <div className='ma2' >
                {
                    infoFromFB?.map((info,i)=> (
                        <p key={i} >
                            {info.info}
                        </p>
                    ))
                }
            </div>
        </div>
        
    )
}

export default FirebaseData;

// The useRef Hook allows you to persist values between renders.

// It can be used to store a mutable value that does not cause a re-render when updated.

// It can be used to access a DOM element directly.

// useRef() only returns one item. It returns an Object called current.

// The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

// For example, this can be useful when:

// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL