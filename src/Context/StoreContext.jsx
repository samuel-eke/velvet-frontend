import { createContext, useEffect, useState, useCallback } from "react";
import { menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

/* eslint-disable-next-line react/prop-types */
const StoreContextProvider = ({ children }) => {
	const url = "https://velvet-loops-backend.onrender.com";
	const [food_list, setFoodList] = useState([]);
	const [cartItems, setCartItems] = useState(() => {
		try {
			const raw = sessionStorage.getItem("customerCartItems");
			return raw ? JSON.parse(raw) : {};
		} catch (e) {
			return {};
		}
	});
	const [token, setToken] = useState("");
	const currency = "CAD";
	const deliveryCharge = 5;

	const persistCart = (cart) => {
		try {
			sessionStorage.setItem("customerCartItems", JSON.stringify(cart));
		} catch (e) {
			console.warn("Failed to persist cart to sessionStorage", e);
		}
	};

	const addToCart = async (itemId) => {
		setCartItems((prev) => {
			const newQty = (prev[itemId] || 0) + 1;
			const newCart = { ...prev, [itemId]: newQty };
			persistCart(newCart);
			return newCart;
		});

		if (token) {
			try {
				await axios.post(
					url + "/api/cart/add",
					{ itemId },
					{ headers: { token } }
				);
			} catch (e) {
				console.warn("Failed to sync addToCart with server", e);
			}
		}
	};

	const removeFromCart = async (itemId) => {
		setCartItems((prev) => {
			const current = prev[itemId] || 0;
			const newQty = current - 1;
			const newCart = { ...prev };
			if (newQty > 0) newCart[itemId] = newQty;
			else delete newCart[itemId];
			persistCart(newCart);
			return newCart;
		});

		if (token) {
			try {
				await axios.post(
					url + "/api/cart/remove",
					{ itemId },
					{ headers: { token } }
				);
			} catch (e) {
				console.warn("Failed to sync removeFromCart with server", e);
			}
		}
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			try {
				if (cartItems[item] > 0) {
					let itemInfo = food_list.find((product) => product._id === item);
					totalAmount += itemInfo.price * cartItems[item];
				}
			} catch (error) {
				console.log(error);
			}
		}
		return totalAmount;
	};

	const fetchFoodList = useCallback(async () => {
		try {
			const response = await axios.get(url + "/api/food/list");
			setFoodList(response.data.data || []);
			console.log(response.data);
		} catch (e) {
			console.warn("Failed to fetch food list", e);
		}
	}, []);

	const loadCartData = useCallback(async (headers) => {
		try {
			const response = await axios.post(url + "/api/cart/get", {}, { headers });
			const serverCart = response.data.cartData || {};
			setCartItems(serverCart);
			persistCart(serverCart);
		} catch (e) {
			console.warn("Failed to load cart from server", e);
		}
	}, []);

	useEffect(() => {
		async function loadData() {
			await fetchFoodList();
			const storedToken = localStorage.getItem("token");
			if (storedToken) {
				setToken(storedToken);
				await loadCartData({ token: storedToken });
			} else {
				// ensure cartItems state matches sessionStorage if present
				try {
					const raw = sessionStorage.getItem("customerCartItems");
					if (raw) setCartItems(JSON.parse(raw));
				} catch (e) {
					/* ignore parse errors */
				}
			}
		}
		loadData();
	}, [fetchFoodList, loadCartData]);

	const contextValue = {
		url,
		food_list,
		menu_list,
		cartItems,
		addToCart,
		removeFromCart,
		getTotalCartAmount,
		token,
		setToken,
		loadCartData,
		setCartItems,
		currency,
		deliveryCharge,
	};

	return (
		<StoreContext.Provider value={contextValue}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
