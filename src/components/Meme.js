import React from "react"
// import memesData from "../memesData"

export default function Meme() {


    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    })




    const [allMemes, setAllMemes] = React.useState([])


    React.useEffect(() => {

        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])


    function getMemeImage() {
        // const memesArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    className="form--inputs"
                    placeholder="Top text"
                    type="text"
                    name="topText"
                    vlaue={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className="form--inputs"
                    placeholder="Bottom text"
                    type="text"
                    name="bottomText"
                    vlaue={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} className="form--button">
                    Get a new meme image  🖼
                </button>
            </div>
            <div className="meme">
                <img className="meme--image" src={meme.randomImage} alt="" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}