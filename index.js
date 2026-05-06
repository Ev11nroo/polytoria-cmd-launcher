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
    const headers = (await response).headers.getSetCookie()

    console.log((await headers))
    const data = (await response).json();

    if ((await data).success !== true) {
        console.error(`endpoint failed (${(await response).status})`);
        return 1;
    }

    return (await data).token;
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

/*
var { cookie, placeId } = {
    "command": "xdg-open %URI",
    "placeId": 62778
}
var command = null;

function cookiesToTable() {
    const object = {};

    const cookies = document.cookie;
    const individualCookies = cookies.split("; ");

    for (const cookieKeyPlusValue of individualCookies) {
        const keyValueArray = cookieKeyPlusValue.split("=");
        const key = keyValueArray[0];
        const value = keyValueArray[1];

        object[key] = value;
    }

    return object;
}

async function getLaunchToken() {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
			"X-Xsrf-Token": cookiesToTable()["XSRF-TOKEN"],
            //Cookie: `${cookie}`
        },
        body: JSON.stringify({
            placeID: placeId
        })
    };

    const response = await fetch("https://polytoria.com/api/places/join", options);
    const headers = (await response).headers.getSetCookie()

    console.log((await headers))
    const data = (await response).json();

    if ((await data).success !== true) {
        console.error(`endpoint failed (${(await response).status})`);
        return 1;
    }

    return (await data).token;
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
        //execSync(command);

        return 0;
    }

    console.log(`running ${command} "${uri}"`);
    //execSync(`${command} "${uri}"`);
    return 0;
})();
*/
