import Link from "next/link";

const CabinetLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <div className="flex flex-col">
          <div className="w-full border-b-2 border-element p-2"><Link href={'/cabinet'}> Profile</Link> | <Link href={'/cabinet/payment'}>Donate</Link></div>
            {children}
        </div>
    );
  }

  export default CabinetLayout