self.addEventListener("message", function (e) {
  let { permutation1, permutation2, iterations } = e.data;

  let wins1 = 0; // Количество побед первой перестановки
  let wins2 = 0; // Количество побед второй перестановки

  for (let i = 0; i < iterations; i++) {
    let winner = simulate(permutation1, permutation2);
    if (winner === 1) {
      wins1++;
    } else if (winner === 2) {
      wins2++;
    }
  }

  // Отправляем результат обратно
  self.postMessage({
    wins1: wins1,
    wins2: wins2,
    total: iterations,
  });
});

function simulate(perm1, perm2) {
  let currentSequence = [];

  while (true) {
    // Генерируем случайный результат подбрасывания (0 или 1)
    let coinFlip = Math.floor(Math.random() * 2);
    currentSequence.push(coinFlip);

    // Проверяем, достигли ли мы длины перестановок
    if (currentSequence.length >= perm1.length) {
      // Сравниваем с обеими перестановками, начиная с конца текущей последовательности
      let endSequence = currentSequence.slice(-perm1.length);

      if (arraysEqual(endSequence, perm1)) {
        return 1; // Первая перестановка выиграла
      } else if (arraysEqual(endSequence, perm2)) {
        return 2; // Вторая перестановка выиграла
      }
    }
  }
}

// Функция для сравнения двух массивов
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
