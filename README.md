[![Project Status](https://img.shields.io/badge/project_status-under_development-orange.svg)](https://shields.io)
# Stock Management 

## Description:
This project is being developed for the completion of the React course, taught by OneBitCode.

## The Project
Create a stock management SPA using React, React Router, and Vite The application should meet the following requirements:
- It should have a dashboard homepage.
- It should have page that lists all items in the stock in a table. This table show summarized information of the item and 3 buttons.
- It should have a screen to create new items. It should have at least the fields: 
  - Name
  - Quantity
  - Price
  - Category
  - Description  
- It should have a screen to update an item's data.
- All navigation in the application should be done without refreshing the page.
- All data should be persisted in the browser's local storage to be preserved after refreshing the page or closing the app window.
- 

## Tools
- React 
- React Router
- Vite
- Prop-types

## Some code snippets
#### Context
```Context
import { createContext, useState } from "react";
import PropTypes from "propTypes";

export const StockContext = createContext({});

StockContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function StockContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('obc-react-stock')
    if (!storedItems) return [],
    items.forEach(item => {
      item.createdAt = new Date(item.createdAt)
      item.updatedAt = new Date(item.updatedAt)
    })
    return items
  })

  const addItem = (item) => {
    setItems(current => {
      const updatedItems = [...current, item]
      localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const getItem = (id) => {
    return items.find(item => item.id === +id)
  }

    const updateItem = (id, newAttributes) => {
      setItems(current => {
        const itemIndex = current.findIndex(item => item.id === id);
        const updatedItems = [...current];
        Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() });
        localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems));
        return updatedItems;
      });
    }

  const deleteItem = (id) => {
    setItems(current => {
      const updatedItems = current.filter(item => item.id!== id)
      localStorage.setItem('obc-react-stock', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const stock = {
    items,
    addItem, 
    getItem,
    updateItem,
    deleteItem
  }

  return (
    <StockContext.Provider value={stock}>
      {children}
    </StockContext.Provider>
  )
}
```
#### Routes
```
const router = createBrowserRouter([{
  path: "/",
  element: <RootView />,
  children: [
    {index: true, element: <Home />},
    {
      path: "items",
      element: <ViewItems />,
      children: [
        {index: true, element: <ListItems />},
        {path: 'new', element: <CreateItem />},
        {path: ':id', element: <DetailsItem />},
        {path: ':id/update', element: <UpdateItem />}
      ]
    }
  ]
}])

export default router;
```


