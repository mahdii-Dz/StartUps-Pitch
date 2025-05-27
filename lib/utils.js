
export function FormatDate(date){
  return new Date(date).toLocaleDateString("en-US",{
    month:'long',
    day:'numeric',
    year:'numeric'
  })
}

export function Parse(response){
  const parsed = JSON.parse(JSON.stringify(response));
  return parsed;
}