import { Link, Outlet } from "react-router-dom";
import logo from "../assets/IMG_0318.png";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";

const Layout = () => {
  const { t } = useTranslation();

  return (
    <div>
      <header className="flex sticky top-0 z-50 backdrop-blur-xl justify-between items-center shadow-md px-16">
        <div className="max-w-[1500px] w-full flex justify-between items-center m-auto">

        
        <div className="flex justify-between items-center w-[50%]">
          <Link to={"/"}>
        <img className="w-[100px]" src={logo} alt="" />
          </Link>
        <Link to={"/"}>
          <Button color="primary" variant="text">
            <span className="font-[500] text-black text-[16px] my-2">
            {t("navbar.home")}
            </span>
          </Button>
        </Link>

        <Link to={"/courses"}>
          <Button color="primary" variant="text">
            <span className="font-[500] text-black text-[16px] my-2">
            {t("navbar.courses")}
            </span>
          </Button>
        </Link>

        <Link to={"/news"}>
          <Button color="primary" variant="text">
            <span className="font-[500] text-black text-[16px] my-2">
            {t("navbar.news")}
            </span>
          </Button>
        </Link>
        
        <Link to={"/about"}>
          <Button color="primary" variant="text">
            <span className="font-[500] text-black text-[16px] my-2">
            {t("navbar.aboutUs")}
            </span>
          </Button>
        </Link>
        </div>
<div className="flex justify-between items-center w-[20%]">
        <LanguageSelect />
        <Button color="primary" variant="solid"> {t("banners.SignCourses")} </Button>
</div>
</div>
      </header>

      <Outlet />
      <footer>fs</footer>
    </div>
  );
};

export default Layout;
