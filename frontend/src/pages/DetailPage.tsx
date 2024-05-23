import { useGetRestaurant } from "@/api/RestaurantApi"
import MenuItem from "@/components/MenuItem"
import { OrderSummary } from "@/components/Ordersummary"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { MenuItem as MenuItemType } from "../types"
import CheckOutButton from "@/components/CheckOutButton"

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}


const DetailPage = () => {
    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetRestaurant(restaurantId)

    const [cartItems, setCartItems] = useState<CartItem[]>(()=> {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)

            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    }
                ]
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

            return updatedCartItems;
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id)

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

            return updatedCartItems;
        })
    }

    if (isLoading || !restaurant) {
        return "Loading..."
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img alt="img restaurant" src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-vol gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem addToCart={() => addToCart(menuItem)} menuItem={menuItem} />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary
                            removeFromCart={removeFromCart}
                            restaurant={restaurant}
                            cartItems={cartItems} />
                    </Card>
                    <CardFooter>
                        <CheckOutButton />
                    </CardFooter>
                </div>
            </div>
        </div>
    )
}

export default DetailPage