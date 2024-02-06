export type ProductBenefits = {
  title: string
  description: string
}

export type CarouselImage = {
  file: string
  url: string
}

export type ProductWithSameSlugAndCompanyArgs = {
  companyId: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  catchPhrase: string
  about: string
  price: string
  benefits: ProductBenefits[]
  carouselImages: CarouselImage[]
}

export type ProductCreateInput = Omit<Product, 'carouselImages'>
