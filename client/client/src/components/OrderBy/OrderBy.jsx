import { useDispatch } from 'react-redux';
import { sortByName, sortByScore } from '../../redux/actions';
import { ALPHABET_AZ, ALPHABET_ZA, DESCENDENTE, ASCENDENTE } from './Constants';




export default function OrderBy () {

    const dispatch = useDispatch()

    // function onSelectChange(e) {     
    //     if(e.target.value !== 'AllCategories') {
    //        // dispatch(filterByCategory(e.target.value)) // pasamos la la categoria 
    //     }
    // }
    
    function onSelectChangeOne(e) { 
        console.log('orden alfabético', e.target.value)
        dispatch(sortByName(e.target.value))        
    }

    function onSelectChangeTwo(e) {     
       dispatch(sortByScore(e.target.value))        
    }    


    return (
        <div>
            {/* <select className='select' name="select" onChange={onSelectChange}>
            <option value="FilterBy" >Filtro por…</option>
                <option value="AllCategories">Todas</option>
            </select> */}
            
            <select className='select' name="select" onChange={onSelectChangeOne}>
            <option >Por alfabeto...</option>
            <option value={ALPHABET_AZ}>Asc. A-Z</option>
            <option value={ALPHABET_ZA}>Des. Z-A</option>
            </select>
            
            <select className='select' name="select" onChange={onSelectChangeTwo}>
            <option >Por puntuación...</option>
            <option value={ASCENDENTE}>Asc. 1 - 5</option>
            <option value={DESCENDENTE}>Des. 5 - 1</option>
            </select>
        </div>
    )


}
