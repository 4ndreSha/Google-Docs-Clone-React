import React from 'react';
import { Link } from 'react-router-dom';
import TextEditor from '../components/TextEditor.tsx';
import '../styles.css';

function Home() {
  return (
    <>
      {/* <header> <Link className='link' to=''>Home</Link> </header> */}
      <TextEditor />
    </>
  );
}

export default Home;
