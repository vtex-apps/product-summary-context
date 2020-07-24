import React, { useReducer } from 'react'
import { createContext, useContext } from 'react'
import querystring from 'query-string'
import { Product, SKU } from './typings/product'

const ProductSummaryContext = createContext<State | undefined>(undefined)
const ProductDispatchContext = createContext<Dispatch | undefined>(undefined)

interface State {
  product: Product
  isHovering: boolean
  isLoading: boolean
  selectedItem: SKU,
  selectedQuantity: number,
  productQuery?: string,
}

type Dispatch = (action: Action) => void

type SetProductAction = {
  type: 'SET_PRODUCT',
  args: {
    product: Product
    selectedItem: SKU
  }
}

type SetProductQueryAction = {
  type: 'SET_PRODUCT_QUERY',
  args: {
    query: string
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

type SetProductQuantity = {
  type: 'SET_QUANTITY'
  args: {
    quantity: number
  }
}

type Action = SetProductAction | SetHoverAction | SetLoadingAction | SetProductQuantity | SetProductQueryAction

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_PRODUCT': {
      const product = action.args.product
      return {
        ...state,
        product: product,
        //TODO: STOP USING PRODUCT.SKU https://app.clubhouse.io/vtex/story/18547/productsummarycontext-refactor
        selectedItem: action.args.selectedItem ?? product.sku
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
    case 'SET_QUANTITY': {
      return {
        ...state,
        selectedQuantity: action.args.quantity,
      }
    }
    case 'SET_PRODUCT_QUERY':
      return {
        ...state,
        query: action.args.query,
      }
    default:
      return state
  }
}

const buildProductQuery = ((product: Product) => {
  const selectedProperties = product?.selectedProperties

  if (!selectedProperties || selectedProperties.length === 0) {
    return
  }

  const query = selectedProperties.reduce(
    (query, property, idx) => {
      const { key, value } = property
      query.propertyName += `${idx > 0 ? "," : ""}${key}`
      query.propertyValue += `${idx > 0 ? "," : ""}${value}`

      return query
    },
    { propertyName: "", propertyValue: "" }
  )

  return querystring.stringify(query)
})

function ProductSummaryProvider({ product, selectedItem, children }) {
  const initialState = {
    product,
    isHovering: false,
    isLoading: false,
    selectedItem: selectedItem ?? null,
    selectedQuantity: 1,
    query: buildProductQuery(product)
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