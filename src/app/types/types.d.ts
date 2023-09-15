interface BeerData {
    abv: number
    name: string
    ingredients: {
        yeast: string
        malt: {
            amount: {}
            name: string
        }[]
        hops: {
            add: string
            amount: {}
            attribute: string
            name: string
        }[]
    }
    method: {
        twist: string | null
    }
    image_url: string
    description: string
    tagline: string
}
