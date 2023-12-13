document.addEventListener("DOMContentLoaded", getList);

function getList() {
    fetch('https://api.mudoapi.tech/menus')
        .then(response => response.json())
        .then(data => {
            const menuData = data.data.Data;
            displayMenuList(menuData);
        })
        .catch(error => {
            console.error('Error fetching menu list:', error);
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
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${menu.name}</td>
            <td>${menu.description}</td>
            <td>${menu.priceFormatted}</td>
            <td><button onclick="showDetail(${menu.id})">Detail</button></td>
        `;

        listMenu.appendChild(row);
    });
}

function showDetail(menuId) {
    window.location.href = `menu.html?id=${menuId}`;
}


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = urlParams.get('id');

    if (menuId) {
        fetchMenuDetail(menuId);
    } else {
        console.error('Menu ID is missing in the URL');
    }
});

function displayMenuDetail(menu) {
    const detailContainer = document.querySelector(".detail-menu");

    detailContainer.innerHTML = `
        <h2>${menu.name}</h2>
        <img src="${menu.imageUrl}" width="300px" height="300px" alt="${menu.name}">
        <p>Description: ${menu.description}</p>
        <p>Type: ${menu.type}</p>
        <p>Price: ${menu.priceFormatted}</p>
    `;
}

function fetchMenuDetail(menuId) {
    fetch(`https://api.mudoapi.tech/menu/${menuId}`)
        .then(response => response.json())
        .then(data => {
            console.log('Detail Menu Response:', data);
            const menuDetail = data.data;
            displayMenuDetail(menuDetail);
        })
        .catch(error => {
            console.error('Error fetching menu detail:', error);
        });
}

document.addEventListener("DOMContentLoaded", getList);
