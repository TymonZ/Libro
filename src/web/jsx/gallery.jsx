require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});

ReactDOM.render(
    <h1 id="message" class="msg">
        Hello World
    </h1>,
    document.getElementById('#gallery')
);