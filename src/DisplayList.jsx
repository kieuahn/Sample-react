import React, { useState , useEffect } from 'react'

export default function DisplayList() {
    const [parkList, setParkList] = useState([]) 
    const [parkAvailable, setParkAvailable] = useState([]) 
    let fetching =[]
    let parkIdAvailable =[], parkVarAvailable =[]
    const [currentTime, setCurrentTime] = useState(0)
    const endpoint='https://api.data.gov.hk/v1/carpark-info-vacancy'
    const loading =() => {
        let TempporaryList =[]
        fetch(endpoint + '?data=vacancy')
        .then(response => response.json())
        .then(AfterFetch => {
            fetching = AfterFetch.results;
            fetching.map((parking => {
                let TypeVar =[]
///let is block scoped. What that means is that a variable created with the let keyword is available inside the “block” that it was created in as well as any nested blocks. When I say “block”, I mean anything surrounded by a curly brace {} like in a for loop or an if statement. 
///bỏ let ở ngoài fetch 
                if (parking.privateCar !== undefined && parking.privateCar[0].vacancy >0 ) {
                    TypeVar.push('Private Car, ')
                }
                if (parking.LGV !== undefined && parking.LGV[0].vacancy >0 ) {
                    TypeVar.push('Light Good Vehicles, ')
                }
                if (parking.HGV !== undefined && parking.HGV[0].vacancy >0 ) {
                    TypeVar.push('Heavy Good Vehicles, ')
                }
                if (parking.CV !== undefined && parking.CV[0].vacancy > 0) {
                    TypeVar.push("Container Vehicle, ")
                }
                if (parking.coach !== undefined && parking.coach[0].vacancy >0 ) {
                    TypeVar.push('Coach, ') 
                }
                if (parking.motorCycle !== undefined && parking.motorCycle[0].vacancy >0 ) {
                    TypeVar.push('Motor Cycle, ') 
                }
                if (TypeVar.length>0) {
                    parkIdAvailable.push(parking.park_Id); parkVarAvailable.push(TypeVar)
                }
                console.log(parkVarAvailable)
            }))},
                
                fetch(endpoint)
                .then(response =>response.json())
                .then(AfterFetch => {
                AfterFetch.results.filter((parking)=> {
                        parkIdAvailable.includes(parking.park_Id) && TempporaryList.push(parking)
                
                    })
                setParkAvailable(parkVarAvailable) 
                setParkList(TempporaryList) 
                console.log(parkList)
            }   )
                  
    )}

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(currentTime => currentTime + 1), 30000)
        return () => clearInterval(interval)} , [])
    useEffect(() => {
        loading()
    }, [currentTime])
    
    const style = 
    {
    border: '1px solid black',

    };
                return (
            //         <React.Fragment>
            //       <Table>
            //         <thead>
            //         <tr>
            //             <th>Id</th>
            //             <th>User</th>
            //             <th>Place</th>
            //             <th>Monthly Charges</th>
            //             <th>Hourly Charges</th>
            //             <th>Day-Night Charges</th>
            //             <th>Available for </th>
            //         </tr>
                      
            //         </thead>
            //         <tbody>
            //         {parkList.map(parking => {
            //             <tr key={index}>

            //                     <th>{parking.park_Id}</th>
            //                     <td>{parking.name}</td>
            //                     <td>{parking.displayAddress}</td>
            //                     <tr> {parkingList.map((parking.openingHours !== undefined ? => {parking.map() }))} </tr>
                   
            //           </tr>
            //            })}
            //         </tbody>
            //       </Table>
            // </React.Fragment>
           
          )

        }