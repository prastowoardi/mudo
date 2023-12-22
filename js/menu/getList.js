function getList(page) {
    fetch(`https://api.mudoapi.tech/menus?perPage=10&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const menuData = data.data.Data;
            displayMenuList(menuData);
        })
        .catch(error => {
            console.error('Error fetching menu list:', error);
        });
}

function attachDetailButtonHandler(button, menuId) {
    button.addEventListener("click", function() {
        showDetail(menuId);
    });
}

function displayMenuList(menuList) {
    const listMenu = document.getElementById("data-menu");
    listMenu.innerHTML = "";

    if (!Array.isArray(menuList)) {
        console.error('Menu list is not an array');
        return;
    }

    menuList.forEach((menu, index) => {
        const row = document.createElement("tr");
        const detailButton = document.createElement("button");
        detailButton.textContent = "Detail";
        attachDetailButtonHandler(detailButton, menu.id);

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${menu.name}</td>
            <td>${menu.description}</td>
            <td>${menu.priceFormatted}</td>
        `;
        const actionCell = document.createElement("td");
        actionCell.appendChild(detailButton);
        row.appendChild(actionCell);

        listMenu.appendChild(row);
    });
}

function showDetail(menuId) {
    window.location.href = `detail-menu.html?id=${menuId}`;
}


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = urlParams.get('id');
    const pageId = urlParams.get('page');

    if (menuId) {
        fetchMenuDetail(menuId);
    }

    getList(pageId);
});
