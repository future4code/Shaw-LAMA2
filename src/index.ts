import { app } from "./app";
import BandController from "./controller/BandController";
import { ShowController } from "./controller/ShowController";
import { UserController } from "./controller/UserController";


const userController = new UserController()
const bandController = new BandController()
const showController = new ShowController()

app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.post("/bands", bandController.addBand)
app.post("/show", showController.insert)
app.get("/bands", bandController.getDetails)
app.get("/show/:day", showController.getShowsByData)