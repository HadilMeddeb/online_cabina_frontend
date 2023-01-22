export function stringToObject(time:string) :any
{
    let tab=time.split(":")
    return {hour:Number(tab[0]),minutes:Number(tab[1])}
}

export function stringDateToObject(time:string) :any
{
    let tab=time.split("-")
    return {year:Number(tab[0]),month:Number(tab[1]),day:Number(tab[2])}
}