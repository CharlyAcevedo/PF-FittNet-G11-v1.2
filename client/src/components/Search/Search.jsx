import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Sarch () {
    const [ search, setSearch ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);   
    const [focus, setFocus] = useState(false);  
    
    // Me copio el estado de estado global (name y _id)
    let gyms = useSelector((state) => state.gymsToShow);

    // Acoto la info para tener solo lo que necesito
    gyms = gyms.length > 0 ? gyms.map((g) => {
        return { name: g.name, id: g._id, rating: g.raiting}
    }) : [] ;

    // Inicio el estado con los ids y nombres de los gyms
    // gyms.length > 0 && setSearchResult(gyms);
    
    
    // console.log(gyms, ' A ver si están los gyms')
    
    // Me creo un función para setear el estado local según lo que busco

    function searchLocalGyms (gymName) {
        // Llega el valor de la búsqueda por argumento
        let filterByName;

        if (gymName === "") {
            filterByName = []
        }

        if (gymName !== "") {
            filterByName = searchResult.length ? [...searchResult] : [...gyms];
            filterByName = filterByName.filter(n => n.name.toLowerCase().includes(gymName.toLowerCase()))            
            if (filterByName.length > 10) {
                filterByName = filterByName.slice(0, 10)
            }            
        }
        return setSearchResult(filterByName);        

    }
    
    function onInputChange (e) {
        setSearch(e.target.value)
        
        // Ejecuto una acción en el local pasandole el valor de la búsqueda
        searchLocalGyms(search);

    }

    
    function focusSearch() { // Solamente un switch on/off
        setTimeout(function(){           
            if (focus === false) {
                setFocus(true)                
            }
            if (focus === true) {
                setFocus(false)
            }           
        }, 500);        
    }

    
    return (
        <div id = "main-box-search-nano">
            <div id = "div-search-nano">               
                <form onFocus={()=>focusSearch()} onBlur={()=>focusSearch()} id = "search-nano-nano">
                    <input id='input-search-nano' type="text" onChange={(e) => onInputChange(e)} 
                    value= {search} autoComplete='off' spellCheck="false" role="combobox"
                    placeholder='Escriba aquí para buscar'
                    />                   
                </form> 
                   
            </div>

            <div id = "div-list-nano" >
                <ul id = 'list-search-nano'>
                { focus && searchResult ? searchResult.map ((g) => {
                    return (
                        <Link to = {`/detail/gym/${g.id}`} key={g.id} >                           
                            <li style={{color: "#fff", paddingBottom:"5px", paddingTop: "5px"}} >{g.name}</li>
                        </Link>    
                    )
                }) : <div id='id-nano'></div>}
                </ul>
            </div>
        </div>
    )

}

// /detail/gym/6292dae93fc1e9d735aea34c
{/* <div class="combo-wrap">
<input type="text" id="jokes" role="combobox" 
aria-controls="joketypes" aria-autocomplete="list" 
aria-expanded="false" data-active-option="item1" 
aria-activedescendant="" onChange={(e)=> onInputChange(e)}
/>
<span aria-hidden="true" data-trigger="multiselect"></span>
<ul id="joketypes" role="listbox" aria-label="Jokes"
style={{color: "#fff"}}>
  <li class="active" role="option" id="item1">Puns</li>
  <li class="option" role="option" id="item2">Riddles</li>
  <li class="option" role="option" id="item3">Observations</li>
  <li class="option" role="option" id="item4">Knock-knock</li>
  <li class="option" role="option" id="item5">One liners</li>
</ul>
</div> */}
