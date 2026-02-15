import dotenv from "dotenv";
import { dataBase } from "./db";
import app from "./app";

dotenv.config(); 
 dataBase()

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
export default app