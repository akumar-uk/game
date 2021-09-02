import React, { useEffect, useState } from 'react';
import './app.css'
export default function App() {

  const [allGames, setAllGames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [gameList, setGameList] = useState([])

  const loadGames = async () => {

    try {
      const response = await fetch("https://www.mocky.io/v2/5da99f9f31000036004e0a4e")
      const data = await response.json()
      setAllGames(data)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    loadGames()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchTerm);

    const newList = allGames.filter(game => {
      return game.gameName.toLowerCase().includes(searchTerm)
    })
    setGameList(newList)
    setSearchTerm("")
  }
  console.log(gameList);

  return (

    <div className="container">

      <div className="topBar">
        {/* Title */}
        <h1>Search Games</h1>

        {/* Input Box */}
        <form onSubmit={handleSearch}>
          <input type="text"
            placeholder="Type Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>

      {/* Display Cards */}
      <div className="listContainer">
        {
          gameList.length < 1 ? null :

            gameList.map((game, i) =>
              <div key={i}
                className="list"
                onClick={() => window.open(`${game.gamePreviewUrl}`, "_blank")}
              >
                <div className="pic">
                  <img src={`https://${game.gameThumbnail}`} alt="" />
                </div>
                <div className="name">
                  <h2>{game.gameName}</h2>
                </div>
              </div>
            )
        }
      </div>
    </div>
  )
}
