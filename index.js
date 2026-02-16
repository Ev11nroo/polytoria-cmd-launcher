const { cookie, placeId } = require("./config.json");
let { command } = require("./config.json");
const { execSync } = require("child_process");

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
        console.error(`endpoint failed (${(await response).status})`);
        return 1;
    }

    return data.token;
}

(async () => {
    const token = await getLaunchToken();
    const uri = `polytoria://client/${token}`;

    if (token == null || token == 1) {
        console.error("failed to launch");
        return 1;
    }

    if (command == null) {
        console.log(`URI: ${uri}`);
        return 0;
    }

    if (command.includes("%URI")) {
        command = command.replace("%URI", uri);
        console.log(`running ${command}`);
        execSync(command);

        return 0;
    }

    console.log(`running ${command} "${uri}"`);
    execSync(`${command} "${uri}"`);
    return 0;
})();
