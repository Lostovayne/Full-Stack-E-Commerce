"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface BasketPageProps {
  // Prop types here
}

const BasketPage: FC<BasketPageProps> = () => {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return <Loader />;
  }

  console.log("groupedItems", groupedItems);

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6">Your basket is empty</h1>
        <p className="text-gray-600 text-lg">Start adding some products to your basket</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
              >
                <div className="size-20 sm:size-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name || "Product Image"}
                      className="size-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold sm:text-xl truncate">{item.product.name}</h2>
                  <p className="text-sm sm:text-base">${((item.product.price ?? 0) * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center ml-5 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div>
            <p>
              <span></span>
              <span></span>
            </p>
            <p>
              <span></span>
              <span></span>
            </p>
          </div>
        </div>
        <div className="h-64 lg:h-0" />
      </div>
    </div>
  );
};

export default BasketPage;
