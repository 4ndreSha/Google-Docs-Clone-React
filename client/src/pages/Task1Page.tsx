// Реализовать форму c помощью функциональных компонентов,
// в форме должно быть реализовано одно поле и
// значение этого поля нужно выводить в
// консоль после нажатия на кнопку, которая
// находится тоже в форме. Нужно использовать
// хук useRef для того, чтобы вывести значение,
// которое введено в input.

import React from 'react';
import UserForm from '../components/Task1/UserForm';

function Task1Page() {
  return (
    <>
      <section class="main">
        <div class="task-number">Task 1</div>
        <UserForm />
        <div class="hint-text">*check console</div>
      </section>
    </>
  );
}

export default Task1Page;