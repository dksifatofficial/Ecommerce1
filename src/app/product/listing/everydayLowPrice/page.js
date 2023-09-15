import CommonListing from "@/components/CommonListing";
import { productByLowPrice } from "@/services/product";

export default async function MenAllProducts() {
  const getAllProducts = await productByLowPrice();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}