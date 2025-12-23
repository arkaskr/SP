"use client";
import React, { Suspense, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loading from "@/app/(pages)/checkout/loading";

interface PaymentButtonInterface {
  amount : number;
  courseId : string;
}


const PaymentButton = ({ amount,courseId }: PaymentButtonInterface) => {
  const { data: userData } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const makePayment = async () => {
    setIsLoading(true);

    const data = await fetch("/api/order/create?amount=" + amount);
    const { order } = await data?.json();
    const options: RazorpayOptions = {
      key: process.env.RAZORPAY_KEY_ID || "",
      name: userData?.user?.email,
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
      },
      handler: async function (response: {
        razorpay_payment_id: string | null;
        razorpay_order_id: string | null;
        razorpay_signature: string | null;
      }) {
        const data = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email: userData?.user?.email,
            courseId : courseId,
            amount: amount * 100,
          }),
        });

        const res = await data.json();
        if (res?.error === false) {
          router.push("/checkout/success");

        }
      },
      prefill: {
        email: userData?.user?.email,
        contact: userData?.user?.ph_no?.toString(),
      },
    };

    interface RazorpayOptions {
      key: string;
      name: string | undefined;
      currency: string;
      amount: number;
      order_id: string;
      modal: {
        ondismiss: () => void;
      };
      handler: (response: {
        razorpay_payment_id: string | null;
        razorpay_order_id: string | null;
        razorpay_signature: string | null;
      }) => void;
      prefill: {
        email: string | undefined;
        contact: string | undefined;
      };
    }

    interface Razorpay {
      open: () => void;
      on: (
        event: string,
        callback: (response: { error: boolean; message: string }) => void
      ) => void;
    }

    const paymentObject = new (
      window as unknown as {
        Razorpay: new (options: RazorpayOptions) => Razorpay;
      }
    ).Razorpay(options);
    paymentObject.open();

    paymentObject.on(
      "payment.failed",
      function (response: { error: boolean; message: string }) {
        alert("Payment failed. Please try again.");
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="">
          <Button
            className={cn(buttonVariants({ size: "lg" }))}
            disabled={isLoading}
            onClick={() => {
              makePayment();
            }}
          >
            Pay Now
          </Button>
        </div>
      </Suspense>
    </>
  );
};

export default PaymentButton;
