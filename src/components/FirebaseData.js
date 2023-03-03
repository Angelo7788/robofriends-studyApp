import React, {useRef} from 'react';

const FirebaseData = () => {

    const messageRef = useRef();

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(messageRef.current.value);
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

