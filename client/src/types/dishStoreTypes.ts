export type Dish = {
	name: string,
	quantity: number,
}

export type AddDish = {
	title: string,
	price: number,
}

export type IRequest = {
	endpoint: string,
	method: string,
	data: Record<string, any>
}