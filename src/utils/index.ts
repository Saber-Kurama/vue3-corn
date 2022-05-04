export const getCronEveryText = ({cronEvery,
    incrementStart,
    incrementIncrement,
    rangeStart,
    rangeEnd,
    specificSpecific} : any ) => {
      if(cronEvery === '*'){
        return '*'
      }
      if(cronEvery === '1'){
        return `${incrementStart}/${incrementIncrement}`;
      }
      if(cronEvery === '2'){
        return `${rangeStart}-${rangeEnd}`;
      }
      if(cronEvery === '3'){
        return specificSpecific?.join(',') 
      }
      return '*'
  }