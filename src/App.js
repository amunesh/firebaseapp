
import './App.css';

import { useState } from 'react';

import * as React from 'react';
import firebase from './firebase/firebase';

function App() {
  const options = [

    { label: 'Independence Day', value: 'Independence Day' },
    { label: 'Hariyali Teej', value: 'Hariyali Teej' },
    { label: 'Holi', value: 'HOli' },
    { label: 'Diwali', value: 'Diwali'},
    { label: 'New Year', value: 'New Year' },
    { label: 'Stickers', value: 'Stickers' },
    { label: 'Rakshabandhan ', value: 'Rakshabandhan' },
 
  ];
  const [value, setValue] = React.useState('fruit');
  //const [image, setImage] = useState('');
  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  const [progresspercent, setProgresspercent] = useState(0);
  
  const [count, setCount] = useState(0);
  const handleChange = (event) => {

    setValue(event.target.value);
 
  };

  const onStart = () => {
    setCount(count+1);
  };
  const onStop = () => {
    if(count===0){
      setCount(count-1);
    }
   
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}   

    const handleFireBaseUpload =  e => {
   
        e.preventDefault()
        console.log('start of upload')
       // database().ref(`/${value}`).put({name: "name", age: "age",}).catch(alert);

        
        if(imageAsFile === '' ) {
          alert("Please select image")
         // console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        }else{
         
         
          firebase.storage().ref(`/${value}/${imageAsFile.name}`).put(imageAsFile).on("state_changed", 
          (snapShot) => {
            //takes a snap shot of the process as it is happening
             const progress =
            Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
          setProgresspercent(progress);
            console.log(snapShot)
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            alert("success");
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            
            firebase.storage().ref(`/${value}`).child(imageAsFile.name).getDownloadURL()
             .then(fireBaseUrl => {
               setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl})) 
               firebase.database().ref(`/${value}`).child(count).set({
              user_id: count,
              image_url:fireBaseUrl,
             
            }).catch(alert);
             })
            
            
          })
         }
       
    }
 

  return (
    <div className="App">

      <div>
      <label>

Select festivals?

<select  value={value} onChange={handleChange}>

  {options.map((option) => (

    <option value={option.value}>{option.label}</option>

  ))}

</select>

</label>
<button onClick={onStart}>+</button>
       <label>{count}</label>
        <button onClick={onStop}>-</button>
      </div>
   
    <form onSubmit={handleFireBaseUpload}  className='form'>
        <input 
          type="file"
          onChange={handleImageAsFile}
        />
          <button>upload to firebase</button>
      
      
      </form>
      {
        !imageAsFile &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imageAsFile &&
        <img src={imageAsUrl.imgUrl} alt='uploaded file' height={100}  width={100}/>
      }
    
</div>
  );
}export  {
  App as default
}
