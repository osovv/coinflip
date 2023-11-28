document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("calculateButton")
    .addEventListener("click", function () {
      let N = Number(document.getElementById("inputN").value);
      let iterations = Number(document.getElementById("inputIterations").value);

      // Проверка входных данных
      if (N > 0 && iterations > 0) {
        startSimulation(N, iterations);
      } else {
        alert("Пожалуйста, введите корректные значения!");
      }
    });
});

function startSimulation(N, iterations) {
  // Показать индикатор
  document.getElementById("loadingIndicator").style.display = "block";

  // Генерация всех перестановок
  let permutations = generatePermutations(N);

  let results = {}; // Объект для хранения результатов
  let pairsProcessed = 0; // Счетчик обработанных пар
  let totalPairs = permutations.length * permutations.length;

  permutations.forEach((perm1, index1) => {
    permutations.forEach((perm2, index2) => {
      // Создание Worker'а для каждой пары перестановок
      let worker = new Worker("worker.js");
      worker.postMessage({
        permutation1: perm1,
        permutation2: perm2,
        iterations: iterations,
      });

      worker.onmessage = function (e) {
        // Обработка полученных результатов
        let key = `Pair_${index1}_${index2}`;
        results[key] = e.data;
        pairsProcessed++;

        // Проверяем, все ли пары обработаны
        if (pairsProcessed === totalPairs) {
          console.log(results);
          createResultTable(permutations, results);
          document.getElementById("loadingIndicator").style.display = "none";
        }

        worker.terminate();
      };
    });
  });
}

function createResultTable(permutations, results) {
  let table = document.createElement("table");
  table.style.borderCollapse = "collapse";

  function permutationToString(permutation) {
    return permutation.map((bit) => (bit === 0 ? "О" : "Р")).join("");
  }

  // Создание заголовка таблицы
  let thead = table.createTHead();
  let headerRow = thead.insertRow();
  headerRow.appendChild(document.createElement("th")); // Пустая ячейка в углу

  permutations.forEach((perm, index) => {
    let th = document.createElement("th");
    th.textContent = permutationToString(perm);
    th.style.border = "1px solid black";
    headerRow.appendChild(th);
  });

  // Создание строк таблицы
  permutations.forEach((perm1, index1) => {
    let row = table.insertRow();
    let headerCell = row.insertCell();
    headerCell.textContent = permutationToString(perm1);
    headerCell.style.border = "1px solid black";

    permutations.forEach((perm2, index2) => {
      let cell = row.insertCell();
      cell.style.border = "1px solid black";

      if (index1 !== index2) {
        let key = `Pair_${Math.min(index1, index2)}_${Math.max(
          index1,
          index2
        )}`;
        let result = results[key];

        let probability =
          index1 < index2
            ? result.wins1 / result.total
            : result.wins2 / result.total;
        cell.textContent = probability.toFixed(4); // Форматирование вероятности с 4 знаками после запятой
      } else {
        cell.textContent = "—"; // Заполнение для одинаковых перестановок
      }
    });
  });

  // Добавление таблицы на страницу
  let tableContainer = document.getElementById("resultTable");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function generatePermutations(N) {
  let result = [];

  function permute(arr, len) {
    if (len === N) {
      result.push(arr.slice()); // Копирование и сохранение текущего состояния массива
      return;
    }

    // Добавляем 'Орел' (0) и 'Решка' (1) и рекурсивно вызываем функцию
    permute(arr.concat(0), len + 1);
    permute(arr.concat(1), len + 1);
  }

  permute([], 0);
  return result;
}
