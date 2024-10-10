export type AddDishBody = {
	dish: undefined | Dish,
	ingredients: undefined | Ingredients[], 
}


export type Dish = {
	user_id: number,
	title: string,
	price: number,
}

export type Ingredients = {
	name: string,
	quantity: number,
}