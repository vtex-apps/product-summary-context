export interface State {
  product: Product
  isHovering: boolean
  isLoading: boolean
  isPriceLoading: boolean
  selectedItem: SingleSKU,
  selectedQuantity: number,
  inView: boolean
  productQuery?: string
  listName?: string
  query?: string
  position?: number
  sponsoredBadge?: SponsoredBadgeOptions

}

export interface Product {
  advertisement: Advertisement;
  brand: string;
  brandId: number;
  categoryId: string;
  categoryTree: Category[];
  description: string;
  items: SKU[];
  linkText: string;
  metaTagDescription: string;
  priceRange: PriceRangeOptions;
  productName: string;
  productId: string;
  productReference?: string;
  productClusters: Array<{name: string;}>;
  selectedProperties: SelectedProperty[];
  skuSpecifications: SkuSpecification[];
  sku: SingleSKU;
  titleTag: string;
}

interface Advertisement {
  adId: string;
  campaignId: string;
  adRequestId: string;
  adResponseId: string;
  actionCost: number;
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
  sellerDefault: boolean
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

export type SponsoredBadgeOptions = {
  label?: string;
  position?: SponsoredBadgePosition
}

export type SponsoredBadgePosition = "titleTop" | "containerTopLeft" | "none";
