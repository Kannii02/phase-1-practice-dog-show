document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("table-body");
    const dogForm = document.getElementById("dog-form");

    function fetchDogs() {
        fetch("http://localhost:3000/dogs")
            .then(response => response.json())
            .then(dogs => {
                tableBody.innerHTML = "";
                dogs.forEach(dog => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class='padding center'>${dog.name}</td>
                        <td class='padding center'>${dog.breed}</td>
                        <td class='padding center'>${dog.sex}</td>
                        <td class='padding center'>
                            <button class="edit-btn" data-id="${dog.id}">Edit</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            });
    }

    fetchDogs();

    tableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const dogId = event.target.dataset.id;

            fetch(`http://localhost:3000/dogs/${dogId}`)
                .then(response => response.json())
                .then(dog => {
                    dogForm.name.value = dog.name;
                    dogForm.breed.value = dog.breed;
                    dogForm.sex.value = dog.sex;
                    dogForm.dataset.id = dog.id; 
                });
        }
    });

    dogForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const dogId = dogForm.dataset.id;
        const updatedDog = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        };

        fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedDog)
        })
        .then(response => response.json())
        .then(() => {
            fetchDogs(); 
            dogForm.reset(); 
        });
    });
});
