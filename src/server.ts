import App from "./app";
import UserRoute from "./routes/userRoutes";
import AuthRouth from "./routes/authRoutes";

export const app = new App([
    new AuthRouth(),
    new UserRoute()
]);

app.listen();
