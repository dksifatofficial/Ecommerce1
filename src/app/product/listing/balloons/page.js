import CommonListing from "@/components/CommonListing";
import { productByTags } from "@/services/product";

export default async function MenAllProducts() {
  const getAllProducts = await productByTags("balloons");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}