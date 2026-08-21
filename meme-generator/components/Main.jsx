import { useState, useEffect, useRef } from "react"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = useState([])

    const canvasRef = useRef(null)
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }
    
    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    // Meme Download

    function downloadMeme() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = canvas.width * 0.005
        ctx.font = `${canvas.width * 0.08}px Impact, sans-serif`
        ctx.textTransform = "uppercase"

        const topText = meme.topText.toUpperCase()
        const bottomText = meme.bottomText.toUpperCase()

        ctx.strokeText(topText, canvas.width / 2, canvas.height * 0.12)
        ctx.fillText(topText, canvas.width / 2, canvas.height * 0.12)

        ctx.strokeText(bottomText, canvas.width / 2, canvas.height * 0.95)
        ctx.fillText(bottomText, canvas.width / 2, canvas.height * 0.95)

        const link = document.createElement("a")
        link.download = "meme.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
    }

    img.src = meme.imageUrl
}

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
                <button onClick={downloadMeme} type="button">Download meme 📥</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />

        </main>
    )
}