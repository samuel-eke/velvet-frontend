import React, { useContext, useRef } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../Context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
	const { menu_list } = useContext(StoreContext);
	const listRef = useRef(null);

	const scrollList = (direction) => {
		if (listRef.current) {
			const scrollAmount = 200;
			listRef.current.scrollBy({
				left: direction === "right" ? scrollAmount : -scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div
			className="explore-menu"
			id="explore-menu">
			<h1>Featured Collection</h1>
			<p className="explore-menu-text">
				Discover handcrafted woolen pieces made with love, tradition and modern
				elegance. Every stitch tells a story — begin yours today.
			</p>
			<div
				style={{ display: "flex", alignItems: "center", position: "relative" }}>
				<button
					className="explore-menu-scroll-btn"
					onClick={() => scrollList("left")}
					aria-label="Scroll left"
					style={{ marginRight: "10px" }}>
					&#8592;
				</button>
				<div
					className="explore-menu-list"
					ref={listRef}>
					{menu_list.map((item, index) => {
						return (
							<div
								onClick={() =>
									setCategory((prev) =>
										prev === item.menu_name ? "All" : item.menu_name
									)
								}
								key={index}
								className="explore-menu-list-item">
								<img
									src={item.menu_image}
									className={category === item.menu_name ? "active" : ""}
									alt=""
								/>
								<p>{item.menu_name}</p>
							</div>
						);
					})}
				</div>
				<button
					className="explore-menu-scroll-btn"
					onClick={() => scrollList("right")}
					aria-label="Scroll right"
					style={{ marginLeft: "10px" }}>
					&#8594;
				</button>
			</div>
			<hr />
		</div>
	);
};

export default ExploreMenu;
