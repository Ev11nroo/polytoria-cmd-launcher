# polytoria-cmd-launcher

launch polytoria from a command (who even needs this)

> [!IMPORTANT]
> wont actually work because cloudflare will block the request
>
> ***treat this as a proof of concept***

## usage

install nodejs then:

1. copy `example.config.json` and paste as `config.json`

2. get cookie from browser session

3. enter a place id from url

4. run `node index.js`

## how its done

a POST request to `https://polytoria.com/api/places/join` is made with your cookie + the following body:

```json
{
    "placeID": id
}
```

the json response is like this:

```json
{
    "success": true,
    "token": "string"
}
```

the uri is the following: `polytoria://client/token` where `token` is from the response

## browser console snippet

paste in `cookie` from a request to polytoria (example: cdn.polytoria.com)

```js
let cookie = '';
let placeId = 1075;

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

    console.log(`URI: ${uri}`);
    return 0;
})();

```