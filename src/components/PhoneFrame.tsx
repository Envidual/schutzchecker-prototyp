import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex justify-center items-start sm:items-center bg-[#dbe6ef] sm:py-8">
      <div className="relative w-full max-w-[430px] h-[100dvh] sm:h-[932px] bg-white sm:rounded-[44px] sm:shadow-2xl overflow-hidden sm:ring-8 sm:ring-black/5">
        <div className="phone-scroll h-full overflow-y-auto overflow-x-hidden bg-page">{children}</div>
      </div>
    </div>
  );
}
