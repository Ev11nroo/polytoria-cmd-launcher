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