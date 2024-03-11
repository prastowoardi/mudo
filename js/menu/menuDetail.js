function displayMenuDetail(menu) {
    const detailContainer = document.querySelector(".detail-menu");

    detailContainer.innerHTML = `
        <table>
            <tr>
                <td id="name" colspan="2"><h2>${menu.name}</h2></td>
            </tr>
            <tr>
                <td colspan="2" class="centered"><img src="${menu.imageUrl}" alt="${menu.name}"></td>
            </tr>
            <tr>
                <th>Description</th>
                <td id="description">${menu.description}</td>
            </tr>
            <tr>
                <th>Type</th>
                <td id="type">${menu.type}</td>
            </tr>
            <tr>
                <th>Price</th>
                <td id="price">${menu.priceFormatted}</td>
            </tr>
        </table>
    `;

    document.title = `${menu.name}`;
}

function fetchMenuDetail(menuId) {
    fetch(`https://api.mudoapi.tech/menu/${menuId}`)
        .then(response => response.json())
        .then(data => {
            const menuDetail = data.data;
            displayMenuDetail(menuDetail);
        })
        .catch(error => {
            console.error('Error fetching menu detail:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const menuId = urlParams.get('id');
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        window.location.href = '../../index.html';
    }

    if (menuId) {
        fetchMenuDetail(menuId);
    }
});

