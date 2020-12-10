export interface State {
  product: Product
  isHovering: boolean
  isLoading: boolean
  isPriceLoading: boolean
  selectedItem: SingleSKU,
  selectedQuantity: number,
  inView: boolean
  productQuery?: string
  query?: string
}

export interface Product {
  linkText: string
  description: string
  productName: string
  brand: string
  brandId: number
  categoryId: string
  categoryTree: Category[]
  productId: string
  titleTag: string
  metaTagDescription: string
  items: SKU[]
  skuSpecifications: SkuSpecification[]
  selectedProperties: SelectedProperty[]
  productClusters: Array<{ name: string }>
  priceRange: PriceRangeOptions
  sku: SingleSKU
}

interface Image {
  cacheId: string
  imageId: string
  imageLabel: string
  imageTag: string
  imageText: string
  imageUrl: string
}

export interface SKU {
  name: string
  itemId: string
  ean: string
  referenceId: [{ Value: string }]
  sellers: Seller[]
  images: Image[]
}

export interface SingleSKU extends SKU {
  image: Image
  seller: Seller
}

interface Category {
  id: string
  name: string
}

interface PriceRangeOptions {
  listPrice: PriceRange
  sellingPrice: PriceRange
}

interface PriceRange {
  highPrice: number
  lowPrice: number
}

export interface Seller {
  commertialOffer: CommertialOffer
  sellerId: string
}

interface CommertialOffer {
  AvailableQuantity: number
  Installments: Installment[]
  ListPrice: number
  Price: number
}

interface Installment {
  InterestRate: number
  Name: string
  NumberOfInstallments: number
  PaymentSystemName: string
  Value: number
}

interface SkuSpecification {
  field: SkuSpecificationField
  values: SkuSpecificationValues[]
}

interface SkuSpecificationField {
  name: string
}

interface SkuSpecificationValues {
  name: string
}

interface SelectedProperty {
  key: string;
  value: string
}
