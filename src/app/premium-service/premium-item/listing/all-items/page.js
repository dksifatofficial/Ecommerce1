import PremiumListing from "@/components/PremiumListing";
import { productByCategory } from "@/services/product";

export default async function PremiumAllProducts() {
  const getAllProducts = await productByCategory("premium");

  return <PremiumListing data={getAllProducts && getAllProducts.data} />;
}
