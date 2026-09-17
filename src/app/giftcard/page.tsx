import { Metadata } from "next";
import GiftScrolly from "@/components/GiftScrolly";

export const metadata: Metadata = {
  title: "Gift Card | BeautyDreamer",
  description: "Regala un momento di bellezza e relax con le Gift Card di BeautyDreamer. Scegli l'importo o il trattamento preferito.",
};

export default function GiftCardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GiftScrolly />
    </div>
  );
}
