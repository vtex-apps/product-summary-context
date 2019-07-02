import React, { useReducer } from 'react'
import { createContext, useContext } from 'react'

const ProductSummaryContext = createContext<State | undefined>(undefined)
const ProductDispatchContext = createContext<Dispatch | undefined>(undefined)

interface State {
  product: any
  isHovering: boolean
  isLoading: boolean
}

type Dispatch = (action: Action) => void

type SetProductAction = {
  type: 'SET_PRODUCT',
  args: {
    product: any
  }
}

type SetHoverAction = {
  type: 'SET_HOVER'
  args: {
    isHovering: boolean
  }
}

type SetLoadingAction = {
  type: 'SET_LOADING'
  args: {
    isLoading: boolean
  }
}

type Action = SetProductAction | SetHoverAction | SetLoadingAction

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_PRODUCT': {
      return {
        ...state,
        product: action.args.product,
      }
    }
    case 'SET_HOVER': {
      return {
        ...state,
        isHovering: action.args.isHovering
      }
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.args.isLoading
      }
    }
    default:
      return state
  }
}

function ProductSummaryProvider({ product, children }) {
  const initialState = {
    product,
    isHovering: false,
    isLoading: false,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ProductSummaryContext.Provider value={state}>
      <ProductDispatchContext.Provider value={dispatch}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductSummaryContext.Provider>
  )
}

function useProductSummaryDispatch() {
  const context = useContext(ProductDispatchContext)

  if (context === undefined) {
    throw new Error('useProductSummaryDispatch must be used within a ProductSummaryDispatchProvider')
  }

  return context
}

function useProductSummary() {
  const context = useContext(ProductSummaryContext)

  if (context === undefined) {
    throw new Error('useProductSummary must be used within a ProductSummaryProvider')
  }

  return context
}

export default {
  ProductSummaryProvider,
  useProductSummary,
  useProductSummaryDispatch,
}