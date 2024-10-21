import axios from "./axios.js";

export const topHeadlines = async (req, res) => {
    try {
        const response = await axios.get("/top-headlines", { params: req.query });
        return res.json(response.data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error"
        })
    }
}

export const everything = async (req, res) => {
    try {
        const response = await axios.get("/everything", { params: req.query });
        return res.json(response.data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error"
        })
    }
}