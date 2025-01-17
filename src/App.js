import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Recipe from "./Recipe";
import Navbar from './components/Navbar';

function App() {

 



  const [visible, setVisible] = useState(3);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  const APP_ID = "d7811cd0";
  const APP_KEY = "3baec572c48af715772e8deac52d7572";

  const getRecipes = () => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipes(data.hits);
        //console.log(data);
      });
  };

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("bread");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const [mode, setMode] = useState("light");
  const [myStyle, setStyle] = useState({
    color: "black"
  });
  const [cardStyle, setCard] = useState({
    display: "inline-block",
    width: 300,
    marginLeft: 100,
    marginTop: 5,
    marginRight: 5


  })
  /*const[imageStyle,setImage]=useState({
    height:200
    

    
  })*/
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.querySelector(".App").style.backgroundImage = "radial-gradient(black,black,black)";

      setStyle({
        color: "white"
      })
      setCard({
        display: "inline-block",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
        width: 300,
        marginLeft: 100,
        marginTop: 5,
        marginRight: 5,
        backgroundColor: "black"


      })


    }
    else {
      setMode("light");
      document.querySelector(".App").style.backgroundImage = "linear-gradient(rgb(243	229	247),rgb(212	245	239),white)";


      setStyle(
        {
          color: "black"
        }
      )
      setCard({
        display: "inline-block",
        /* borderWidth:2,
         borderStyle:"solid",
         borderColor:"black",*/
        width: 300,
        marginLeft: 100,
        marginTop: 5,
        marginRight: 5


      })


    }
  }


  return (
    <div className="App">
      <Navbar/>



      <h1 className="heading" style={myStyle}>Tasty Tips</h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={handleSearch}
        ></input>
        <button className="search-btn" type="submit">
          Search
        </button>
        <div class="form-check form-switch">
          <input class="form-check-input ms-5" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleMode}></input>
        </div>
      </form>
      <div className="container">
        {recipes.slice(0, visible).map((r) => (
          <Recipe
            key={r.recipe.url}
            title={r.recipe.label}
            calories={r.recipe.calories}
            img={r.recipe.image}
            url={r.recipe.url}
            ingredients={r.recipe.ingredients}
            myStyle={myStyle}
            cardStyle={cardStyle}

          />
        ))}
      </div>
      <div className="button-container">
        <button className="loadMoreButton" onClick={showMoreItems}>
          Load More Recipes
        </button>
      </div>
    </div>
  );
}

export default App;
