// server.js
import app from './app.js';
import connectDB from "./utils/db.js";
import 'dotenv/config';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on PORT ${PORT}`);
});
