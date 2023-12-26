import react from 'react';
import AppBar from '../Components/AppBar';
import '../styles/Ourboxes.css';

function OurBoxes() {
    return <div>
      <AppBar transparent={false} />
      <div className='ourboxes-page'>
        <h1 className='ourboxes-title'>Our Boxes</h1>
      </div>
    </div>
  }

export default OurBoxes;