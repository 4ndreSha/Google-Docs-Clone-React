import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <div class="task-list">
        <Link class='link' to='/task1'>Task 1</Link>
        <Link class='link' to='/task2'>Task 2</Link>
        <Link class='link' to='/task3'>Task 3</Link>
      </div>
    </>
  );
}

export default Home;
