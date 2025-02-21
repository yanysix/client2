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