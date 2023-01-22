export function dateToObject(date:string) :any
{
    let n_date=new Date(date)
    return {year:n_date.getFullYear(),
            month:n_date.getMonth()+1,
            day:n_date.getDate()}
}