const { cookie, command, placeId } = require("./config.json");

async function getLaunchToken() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `${cookie}`
        },
        body: JSON.stringify({
            placeID: placeId
        })
    };

    const response = await fetch("https://polytoria.com/api/places/join", options);
    const data = (await response).json();

    if (data.success !== true) {
        console.log(`endpoint failed (${(await response).status})`);
        return 1;
    }

    return data.token;
}
