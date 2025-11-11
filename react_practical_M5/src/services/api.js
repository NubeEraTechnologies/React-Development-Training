import axios from "axios"

export async function searchProducts(q) {
  const res = await axios.get("https://dummyjson.com/products/search", {
    params: { q }
  })
  return res.data.products
}
