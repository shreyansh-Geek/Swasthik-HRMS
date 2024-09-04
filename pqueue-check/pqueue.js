document.getElementById('checkButton').addEventListener('click', function () {
    const tokenID = document.getElementById('tokenIDInput').value.trim();

    if (tokenID === "") {
        document.getElementById('errorMessage').textContent = "Please enter a valid Token ID.";
        document.getElementById('resultContainer').style.display = "none";
        return;
    }

    // Simulate fetching data from a backend
    fetch(`https://example.com/api/check-queue?tokenID=${tokenID}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('queueNumber').textContent = data.queueNumber;
                document.getElementById('waitTime').textContent = data.waitTime;
                document.getElementById('resultContainer').style.display = "block";
                document.getElementById('errorMessage').textContent = "";
            } else {
                document.getElementById('errorMessage').textContent = "Token ID not found or invalid.";
                document.getElementById('resultContainer').style.display = "none";
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').textContent = "An error occurred while fetching data.";
            document.getElementById('resultContainer').style.display = "none";
        });
});