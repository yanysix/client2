document.addEventListener("DOMContentLoaded", () => {
    const column1 = document.getElementById("column1");
    const column2 = document.getElementById("column2");
    const column3 = document.getElementById("column3");
    const addCardForm = document.getElementById("addCardForm");

    // Загружаем данные из localStorage
    let cardsData = JSON.parse(localStorage.getItem("cards")) || [];

    // Функция для создания карточки
    function createCard(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        if (card.completed) cardDiv.classList.add("completed");

        // Заголовок карточки
        const header = document.createElement("div");
        header.classList.add("header");
        header.textContent = card.title;
        cardDiv.appendChild(header);

        // Список с чекбоксами
        const list = document.createElement("ul");
        card.items.forEach((item, index) => {
            const listItem = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.completed;
            checkbox.addEventListener("change", () => toggleItemCompletion(card, index));
            listItem.appendChild(checkbox);
            listItem.appendChild(document.createTextNode(item.text));
            list.appendChild(listItem);
        });
        cardDiv.appendChild(list);

        // Дата завершения (если карточка завершена)
        if (card.completed) {
            const completedAt = document.createElement("p");
            completedAt.textContent = `Завершено: ${card.completedAt}`;
            cardDiv.appendChild(completedAt);
        }

        return cardDiv;
    }

    // Функция для обновления интерфейса
    function updateUI() {
        column1.innerHTML = "";
        column2.innerHTML = "";
        column3.innerHTML = "";

        cardsData.forEach((card) => {
            const cardElement = createCard(card);
            if (card.column === 1) column1.appendChild(cardElement);
            else if (card.column === 2) column2.appendChild(cardElement);
            else if (card.column === 3) column3.appendChild(cardElement);
        });
    }

    // Функция для переключения выполнения пункта
    function toggleItemCompletion(card, index) {
        card.items[index].completed = !card.items[index].completed;

        const completedCount = card.items.filter((item) => item.completed).length;
        const totalItems = card.items.length;

        if (completedCount >= totalItems * 0.5 && card.column === 1) {
            moveCardToColumn(card, 2); // Перемещаем в "В процессе"
        } else if (completedCount === totalItems && card.column === 2) {
            moveCardToColumn(card, 3); // Перемещаем в "Завершено"
        }

        saveData();
        updateUI();
    }

    // Функция для перемещения карточки между столбцами
    function moveCardToColumn(card, newColumn) {
        card.column = newColumn;

        if (newColumn === 3) {
            card.completed = true;
            card.completedAt = new Date().toLocaleString();
        }

        saveData();
        updateUI();
    }

    // Функция для сохранения данных в localStorage
    function saveData() {
        localStorage.setItem("cards", JSON.stringify(cardsData));
    }

    // Функция для добавления новой карточки
    function addCard(event) {
        event.preventDefault();

        const title = document.getElementById("cardTitle").value.trim();
        if (!title) {
            alert("Введите заголовок карточки.");
            return;
        }

        const items = [];
        for (let i = 1; i <= 5; i++) {
            const itemText = document.getElementById(`item${i}`).value.trim();
            if (itemText) {
                items.push({ text: itemText, completed: false });
            }
        }

        if (items.length < 3 || items.length > 5) {
            alert("Карточка должна содержать от 3 до 5 пунктов.");
            return;
        }

        if (cardsData.filter((card) => card.column === 1).length >= 3) {
            alert("Первый столбец заполнен. Удалите или завершите одну из карточек.");
            return;
        }

        const newCard = {
            title,
            items,
            column: 1,
            completed: false,
            completedAt: null,
        };

        cardsData.push(newCard);
        saveData();
        updateUI();
        addCardForm.reset();
    }

    // Проверка блокировки первого столбца
    function checkColumnLock() {
        if (cardsData.filter((card) => card.column === 2).length >= 5) {
            alert("Первый столбец заблокирован. Освободите место во втором столбце.");
        }
    }

    // Инициализация приложения
    updateUI();
    checkColumnLock();

    // Слушатель события для формы
    addCardForm.addEventListener("submit", addCard);
});