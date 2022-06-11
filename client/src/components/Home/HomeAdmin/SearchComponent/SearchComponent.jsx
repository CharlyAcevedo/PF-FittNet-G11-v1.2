import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles/stylesSearch.module.css'


export default function SearchComponent () {
    const [ search, setSearch ] = useState('');
    const [ searchResult, setSearchResult ] = useState([]);   
    const [focus, setFocus] = useState(false);  
    
    // Me copio el estado de estado global (name y _id)
    let partners = useSelector((state) => state.partners);
    let users = useSelector((state) => state.users);

    
    // Acoto la info para tener solo lo que necesito
    partners = partners.length > 0 ? partners.map((p) => {
        return { name: p.name, id: p._id, type: p.type, userName: p.userName}
    }) : [] ;

    users = users.length > 0 ? users.map((u) => {
        return { name: u.name, id: u._id, type: u.type, userName: u.userName}
    }) : [] ;
      
    
    let usersApp = partners.concat(users);
    

    function searchLocalUser (name) {
        // Llega el valor de la búsqueda por argumento
        let filterByName = [];
        let filterByUserName = [];

        if (name === "") {
            filterByName = []
        }

        if (name !== "") {
            filterByName = searchResult.length ? [...searchResult] : [...usersApp];
            filterByName = filterByName.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
            // busco por name (nombre)
            filterByUserName = searchResult.length ? [...searchResult] : [...usersApp];
            filterByUserName = filterByUserName.filter(e => e.userName.toLowerCase().includes(name.toLowerCase()))
            // busco por userName (email)
            filterByName = filterByName.concat(filterByUserName);
            // uno los resultados de las búsquedas
            filterByName = [...new Set (filterByName)];
            // hago que el array tenga solo elementos únicos y no repetidos 

            if (filterByName.length > 10) {
                filterByName = filterByName.slice(0, 10)
            }            
        }
        return setSearchResult(filterByName);        

    }
    
    function onInputChange (e) {
        setSearch(e.target.value)
        
        // Ejecuto una acción en el local pasandole el valor de la búsqueda
        searchLocalUser(search);

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
    //    /profile/:type/:name/:userId
    
    return (
        <div id = "main-box-search-nano">
            <div id = "div-search-nano">               
                <form onFocus={()=>focusSearch()} onBlur={()=>focusSearch()} id = "search-nano-nano">
                    <input id='input-search-nano' type="text" onChange={(e) => onInputChange(e)} 
                    value= {search} autoComplete='off' spellCheck="false"
                    placeholder='Buscar por nombre... ' style={{fontSize: "17px"}}
                    />                   
                </form>                   
            </div>

            <div id = "div-list-nano" className={style.divListNano} >
                <ul id = 'list-search-nano'>
                { focus && searchResult ? searchResult.map ((g) => {
                    return (
                        <Link to = {g.type === "partner" ? `/profile/partner/${g.name}/${g.id}`
                                    : `/profile/user/${g.name}/${g.id}` } key={g.id} >

                            <li style={{color: "#fff", paddingBottom:"7px", paddingTop: "7px",
                            fontSize: "16px" }} >{g.name}, {g.userName}</li>
                        </Link>    
                    )
                }) : <div id='id-nano'></div>}
                </ul>
            </div>
           
        </div>
    )

}

