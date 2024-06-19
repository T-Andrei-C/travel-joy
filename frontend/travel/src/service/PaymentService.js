export const totalDays = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);
}

export const calculateDiscountPrice = (checkIn, checkOut, discount, price) => {
    const originalPrice = totalDays(checkIn, checkOut) * price
    return originalPrice - originalPrice * (discount / 100);
}