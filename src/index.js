import './main.css';
import App from "./core/app";

const main = async () => {
    const app = new App();
    app.bind();
    app.start();
};

main().then(() => console.log('Started'));