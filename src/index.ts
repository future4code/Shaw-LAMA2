import { app } from "./app";
import BandController from "./controller/BandController";
import { UserController } from "./controller/UserController";


const userController = new UserController()
const bandController = new BandController()

app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.post("/bands", bandController.addBand)