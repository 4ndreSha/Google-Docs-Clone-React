// Необходимо реализовать функциональный
// компонент InputNumber, в котором нужно
// ввести число в input и в зависимости
// отрицательное или положительное это число
// в компоненте Message нужно выводить
// информацию: ”Число больше нуля” / “Число
// меньше нуля”.

import React from 'react';
import InputNumber from '../components/Task3/InputNumber';

function Task3Page() {
  return (
    <>
      <section class="main">
        <div class="task-number">Task 3</div>
        <InputNumber />
      </section>
    </>
  );
}

export default Task3Page;