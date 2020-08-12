# Asteroids 

This is a WebAssembly port of an [Asteroids game written in C](https://github.com/flightcrank/asteroids)

## How to build 

And compile it to WebAssembly:

```bash
emcc \
    -o app.html asteroids/*.c \
    -Wall -g -lm \
    -s USE_SDL=2
```

## Run the demo

1. Go to the app folder which contains the `app.html`, `app.wasm`, `app.js` files

2. Start the server .  
    If you do not have your own HTTP server, use the simple one as follow

    First, install `npm` >= 5.2


    Then, run
    ```console
    npx http-server
    ```

3. Browse the app .  
Visit your own `http://localhost:{$port}/app.html` .  
Or if you use `npx` server, visit `http://127.0.0.1:8080/app.html`