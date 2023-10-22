import Head from "next/head";
import { FC, ReactElement } from "react";

type LayoutProps = {
  children: ReactElement;
};

//페이지 공통 레이아웃
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-x-hidden text-md">
        {/* Warning 발생해서 Layout에 head 위치 */}
        <Head>
          <title>pokedex</title>
        </Head>
        <main className="w-full h-full flex flex-1 flex-col">{children}</main>
      </div>
    </>
  );
};

export default Layout;
