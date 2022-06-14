

export default function CalcDist(lat1, lon1, lat2, lon2){

let RadioTierra = 6400;//6371;

const toRad = (num) => {
    return num * Math.PI /180
}

// let DiferenciaLatitud
// let DiferenciaLongitud
// let a
// let b
var x1 = lat2-lat1;
var dLat = toRad(x1);  
var x2 = lon2-lon1;
var dLon = toRad(x2);  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = RadioTierra * c; 
// let constante = Math.Pi / 100
// DiferenciaLatitud = LatitudInicio - LatitudFin
// DiferenciaLongitud = LongitudInicio - LongitudFin

// a = Math.sin(DiferenciaLatitud * constante / 2) ^ 2 + Math.cos(LatitudInicio * constante) * Math.cos(LatitudFin * constante) * Math.sin(DiferenciaLongitud * constante / 2) ^ 2
// a = 2 * Math.acos(Math.sqrt(a))

// let DistanciaGeografica = a * RadioTierra * 1000

console.log(d)
return d

}