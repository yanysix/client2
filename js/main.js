function createCard(title, items) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const header = document.createElement("div");
    header.textContent = title;
    cardDiv.appendChild(header);

    const list = document.createElement("ul");
    items.forEach(itemText => {
        const listItem = document.createElement("li");
        listItem.textContent = itemText;
        list.appendChild(listItem);
    });
    cardDiv.appendChild(list);

    return cardDiv;
}
document.addEventListener("DOMContentLoaded", () => {
    const addCardForm = document.getElementById("addCardForm");

    addCardForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("cardTitle").value.trim();
        if (!title) return;

        const items = [];
        for (let i = 1; i <= 5; i++) {
            const itemText = document.getElementById(`item${i}`).value.trim();
            if (itemText) items.push(itemText);
        }

        if (items.length < 3 || items.length > 5) {
            alert("Карточка должна содержать от 3 до 5 пунктов.");
            return;
        }

        const newCard = createCard(title, items);
        document.getElementById("column1").appendChild(newCard);
        addCardForm.reset();
    });
});
function createCard(title, items) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const header = document.createElement("div");
    header.textContent = title;
    cardDiv.appendChild(header);

    const list = document.createElement("ul");
    items.forEach(itemText => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(itemText));
        list.appendChild(listItem);
    });
    cardDiv.appendChild(list);

    return cardDiv;
}
function toggleItemCompletion(card, index) {
    const checkboxes = card.querySelectorAll("input[type='checkbox']");
    const completedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalItems = checkboxes.length;

    if (completedCount >= totalItems * 0.5 && card.parentElement.id === "column1") {
        moveCardToColumn(card, "column2");
    } else if (completedCount === totalItems && card.parentElement.id === "column2") {
        moveCardToColumn(card, "column3");
    }
}

function moveCardToColumn(card, newColumnId) {
    const newColumn = document.getElementById(newColumnId);
    newColumn.appendChild(card);
}