import PremiumDetails from "@/components/PremiumDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData, "sifat");

  return <PremiumDetails item={productDetailsData && productDetailsData.data} />;
}
