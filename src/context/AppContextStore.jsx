import React, {useState} from 'react'
import AppContext from './AppContext'
const AppContextStore = ({children}) => {
     const [columns, setColumns] = useState([
          {
            id: 'column-1',
            title: 'To Do',
            cards: [{ id: 'card-1', title: 'Task 1' }, { id: 'card-2', title: 'Task 2' }],
          },
          {
            id: 'column-2',
            title: 'In Progress',
            cards: [{ id: 'card-3', title: 'Task 3' }],
          },
        ]);

  return (
    <AppContext.Provider value={{columns,setColumns}}>{children}</AppContext.Provider>
  )
}

export default AppContextStore
