import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
})

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.post("/proxy", async (req, res) => {    
  try {
    const response = await fetch(process.env.LANGFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LANGFLOW_BEARER_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    
    res
    .status(response.status)
    .json(data);

  } catch (error) {
    console.log("ERROR :: FETCH RESPONSE FROM LANGFLOW::", error);
    res
    .status(500)
    .json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Proxy running on http://localhost:3000"));
