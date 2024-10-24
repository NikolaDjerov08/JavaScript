
const players = [
    { name: "Lionel Messi", ovr: 88, team: "Inter Miami", league:"MLS" },
    { name: "Cristiano Ronaldo", ovr: 86, team: "Al Nassr", league:"Saudi Pro League" },
    { name: "Kylian Mbappé", ovr: 91, team: "Real Madrid", league:"La Liga" },
    { name: "Kevin De Bruyne", ovr: 90, team: "Manchester City", league:"Premier League" },
    { name: "Erling Haaland", ovr: 91, team: "Manchester City", league:"Premier League" },
    { name: "Robert Lewandowski", ovr: 88, team: "FC Barcelona", league:"La Liga" },
    { name: "Mohamed Salah", ovr: 89, team: "Liverpool", league:"Premier League" },
    { name: "Neymar Jr.", ovr: 87, team: "Al-Hilal", league:"Saudi Pro League" },
    { name: "Virgil van Dijk", ovr: 89, team: "Liverpool", league:"Premier League" },
    { name: "Karim Benzema", ovr: 86, team: "Al-Ittihad", league:"Saudi Pro League" },
    { name: "Vinicius Jr", ovr: 90, team: "Real Madrid", league:"La Liga" },
    { name: "Harry Kane", ovr: 90, team:"Bayern Munchen", league:"Budesliga" },
    { name: "Adama Traore", ovr: 75, team: "Fulham", league:"Premier League"}
];

// Function to select a random player from the list
function getRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
}

// Pack click event listener
document.getElementById("pack").addEventListener("click", openPack);

function openPack() {
    // Hide the pack and show the player card
    let pack = document.getElementById("pack");
    let playerCard = document.getElementById("player-card");

    // Hide the pack
    pack.style.display = "none";

    // Get a random player
    const randomPlayer = getRandomPlayer();

    // Update player card with the random player details
    document.getElementById("player-name").innerText = randomPlayer.name;
    document.getElementById("player-details").innerText = `OVR: ${randomPlayer.ovr} | Team: ${randomPlayer.team} | League:${randomPlayer.league}`;

    // Show the player card
    playerCard.style.display = "block";
}
