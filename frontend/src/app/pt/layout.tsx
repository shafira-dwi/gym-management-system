import Sidebar from "@/app/layout/sidebar/pt";
import Header from "@/app/layout/header/page";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard">
      <Sidebar role="pt" />

      <div className="main">
        <Header />

        <main>{children}</main>
      </div>
    </div>
  );
}
