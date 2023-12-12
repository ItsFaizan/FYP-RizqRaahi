import React from 'react';
import { toast } from 'react-toastify';

export default function CrisisInfo() {
  const [crisis, setCrisis] = React.useState();
  const [check, setCheck] = React.useState(true);
  const checkCrisis = async () => {
    var value = await localStorage.getItem('authToken');

    const response = await fetch(`/getcurrentcrisisalert`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value}`,
      },
    });

    const data = await response.json();

    if (data.success === true) {
      const isareword = data.crisisAlert.length > 1 ? 'are' : 'is';
      const crisisword = data.crisisAlert.length > 1 ? 'crises' : 'crisis';
      const itthemword = data.crisisAlert.length > 1 ? 'them' : 'it';
      setCrisis(data.crisisAlert);
      toast.warning(
        <>
          <p>{`Existing ${crisisword} ${isareword} affecting people's lives.`}</p><br/>
          <p>{`Donate to make a difference and help those affected by ${itthemword}.`}</p><br/>
          <p>{`The ${crisisword} ${isareword} named as: \n ${data.crisisAlert.map((crisis) => crisis.name).join(', ')}`}</p>
        </>,
        {
          autoClose: false, // Set your desired autoClose time in milliseconds
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          style: {
            fontSize: 16,
            padding: '16px',
            borderRadius: '8px',
            width: '100%',
          },
        }
      );
      }
      
    }      
  React.useEffect(() => {
      checkCrisis();
  }, []);

  return (
  <div>
    
  </div>
  )
}