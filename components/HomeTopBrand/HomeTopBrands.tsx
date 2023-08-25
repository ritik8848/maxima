import useHomeTopBrand from "../../hooks/HomePageHooks/HomeTopBrandHook";
import Image from "next/image";
import { CONSTANTS } from "../../services/config/app-config";
import Link from "next/link";
import displayTagList from "../../services/api/home_page_api/home-display-tag-api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
const HomeTopBrands = ({brandListing}:any) => {

  console.log(brandListing, "brandList");

  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  let vals;
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className="container">
      <h3 className="text-center mt-5">
        {selectedMultiLangData?.featured_brands}
      </h3>
      <div className="row text-center brand-container ">
        {brandListing?.length > 0 &&
          brandListing?.map((imgs: any, i: any) => (
            <>
              <div className="col-md-2 mb-4 brand-container-sub" key={i}>
                <Link href={`${imgs?.url}?page=1`}>
                  <Image
                    loader={imageLoader}
                    src={imgs?.image}
                    alt="Brand"
                    width="123"
                    height="133"
                    className="hover_border brand-container-img"
                  />
                </Link>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default HomeTopBrands;
