'use client'

import { useAppSelector } from "@/src/store/store";
import Link from "next/link";

const CabinetLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const user = useAppSelector(state => state.user.data)
    return (
        <div className="flex flex-col w-2/3">
          {user.id &&
          <> 
            <div className="w-full border-b-2 border-element p-2 justify-center items-center flex divide-x divide-element">
            <Link href={'/cabinet'} className="px-4"> Profile</Link>
            <Link href={'/cabinet/payment'} className="px-4">Donate</Link>
            <Link href={'/cabinet/opportunities'} className="px-4">Opportunities</Link>
          </div>
            {children}
          </>
          }
        </div>
    );
  }

  export default CabinetLayout