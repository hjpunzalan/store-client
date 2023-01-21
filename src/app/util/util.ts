export function getCookie(key: string) {
	var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
	return b ? b.pop() : "";
}

export function priceFormat(price: number) {
	return Intl.NumberFormat("en-us", {
		currency: "USD",
		style: "currency",
	}).format(price / 100);
}
