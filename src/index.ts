import Server from "./server";

const api = new Server("dev");

api.app.listen(3001, async () => {
    console.log(`listening on port ${3001}`);
});
