import React, { useState, useEffect } from "react";
import UseDealerLedgerHook from "../../hooks/DealerLedgerHooks/dealer-ledger-hook";
import DealerAccounting from "./DealerAccounting";
import { useDispatch, useSelector } from "react-redux";
import {
  dealerLedgerStore,
  fetchDealerLedger,
} from "../../store/slices/dealer-ledger-slice/dealer-ledger-slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import DealerLedgerTable from "./DealerLedgerTable";
import {
  failmsg,
  hideToast,
} from "../../store/slices/general_slices/toast_notification_slice";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";

const DealerLedger = () => {
  const dispatch = useDispatch();
  const { dealerLedgerSummary }: any = UseDealerLedgerHook();

  const dealerledgerData = useSelector(dealerLedgerStore);

  const TokenFromStore: any = useSelector(get_access_token);
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

  console.log("DealerLedgerSummary in tsx", dealerLedgerSummary);
  console.log("DealerLedgerData in tsx", dealerledgerData);

  let customFromDate: any;
  let customToDate: any;

  const [fieldDisable, setFieldDisable] = useState<boolean>(false);
  const [dlSelectedmonth, setDlSelectedMonth] = useState<any>("");
  const [dlFromDate, setDlFromDate] = useState<any>("");
  const [dlToDate, setDlToDate] = useState<any>("");
  const [showDlData, setDlData] = useState<boolean>(false);

  console.log("showDlData", showDlData);
  const [year, month, day] = dlFromDate.split("-");
  customFromDate = [day, month, year].join("-");
  const [toYear, toMonth, toDay] = dlToDate.split("-");
  customToDate = [toDay, toMonth, toYear].join("-");

  const HandleLedgerData = async () => {
    console.log("onsubmit data", dlSelectedmonth, dlFromDate, dlToDate);
    const getDealerLedgerParams = {
      partyName: dealerLedgerSummary?.party_name,
      month: dlSelectedmonth,
      fromDate: customFromDate,
      toDate: customToDate,
      token: TokenFromStore?.token,
    };

    try {
      const DealerLedgerData = await dispatch(
        fetchDealerLedger(getDealerLedgerParams)
      );

      if (DealerLedgerData?.payload?.data?.message?.msg === "success") {
        setDlData(true);
        setDlSelectedMonth("");
        setDlFromDate("");
        setDlToDate("");
      } else {
        dispatch(failmsg("Please select a month or date range"));
        setTimeout(() => {
          dispatch(hideToast());
        }, 800);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  return (
    <>
      <div className="container">
        <DealerAccounting dealerLedgerSummary={dealerLedgerSummary} />
        {/* 
        <div className="row text-center dealer-ledger-container">
          <div className="col-lg-3">
            <h5>Account Name :</h5>
            <div className="mt-5 fs-2 bold">
              {dealerLedgerSummary?.party_name}
            </div>
          </div>
          <div className="col-lg-2">
            <div className="text-start">
              <input
                type="radio"
                className="form-check-input"
                id="radio1"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(false)}
                defaultChecked
              />
              <label className="form-check-label ms-3" htmlFor="radio1">
                Month
              </label>
            </div>
            <select
           
              className={`${fieldDisable ? "" : "disabled"} form-select mt-5`}
              disabled={fieldDisable}
              onChange={(e) => setDlSelectedMonth(e.target.value)}
            >
              <option>SELECT MONTH</option>
              {dealerLedgerSummary?.months?.map(
                (month: string, index: number) => (
                  <>
                    <option key={index} value={month}>
                      {month}
                    </option>
                  </>
                )
              )}
            </select>
          </div>
​
          <div className="col-lg-4">
            <div className="text-start ms-5">
              <input
                type="radio"
                className="form-check-input"
                id="radio2"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(true)}
              />
              <label
                className="form-check-label ms-3 text-start"
                htmlFor="radio1"
              >
                Date Range
              </label>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6">
                <input
                  type="date"
                  id="FromDate"
                  value={dlFromDate}
                  name="FromDate"
                  onChange={(e) => setDlFromDate(e.target.value)}
                  className={`${fieldDisable ? "" : "disabled"} mt-2`}
                  disabled={!fieldDisable}
                />
              </div>
              <div className="col-lg-4 ml-5">
                <input
                  type="date"
                  id="toDate"
                  value={dlToDate}
                  name="ToDate"
                  onChange={(e) => setDlToDate(e.target.value)}
                  className={`${fieldDisable ? "" : "disabled"} mt-2`}
                  disabled={!fieldDisable}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-2 ">
            <button
              className="btn btn-primary rounded-3 my-3"
              onClick={HandleLedgerData}
            >
              {selectedMultiLangData?.submit}
            </button>
          </div>
        </div> */}

        {/* secondui */}

        <div className="container mx-lg-5 dealer-ledger-container">
          <div className="row m-lg-5">
            <div className="col-lg-2 col-6">
              <div className="fs-3">Account Name :</div>
            </div>
            <div className="col-lg-6 col-6">
              <div className="fs-3 bold">{dealerLedgerSummary?.party_name}</div>
            </div>
          </div>
          <div className="row mx-lg-5">
            <div className="col-lg-2">
              <input
                type="radio"
                className="form-check-input"
                id="radio1"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(false)}
                defaultChecked
              />
              <label className="form-check-label ms-4" htmlFor="radio1">
                Month
              </label>
            </div>
            <div className="col-lg-4">
              <select
                className={`${fieldDisable ? "" : "disabled"} form-select fs-5`}
                disabled={fieldDisable}
                onChange={(e) => setDlSelectedMonth(e.target.value)}
              >
                <option>SELECT MONTH</option>
                {dealerLedgerSummary?.months?.map(
                  (month: string, index: number) => (
                    <>
                      <option key={index} value={month}>
                        {month}
                      </option>
                    </>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="row mx-lg-5 my-5">
            <div className="col-lg-2 mt-lg-2">
              <input
                type="radio"
                className="form-check-input"
                id="radio2"
                name="optradio"
                value="option1"
                onClick={() => setFieldDisable(true)}
              />
              <label
                className="form-check-label ms-4 text-start"
                htmlFor="radio1"
              >
                Date Range
              </label>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-4 col-5">
                  <input
                    type="date"
                    id="FromDate"
                    value={dlFromDate}
                    name="FromDate"
                    onChange={(e) => setDlFromDate(e.target.value)}
                    className={`${fieldDisable ? "" : "disabled"} mt-lg-2 px-1`}
                    disabled={!fieldDisable}
                  />
                </div>
                <div className="col-lg-4 col-5">
                  <input
                    type="date"
                    id="toDate"
                    value={dlToDate}
                    name="ToDate"
                    onChange={(e) => setDlToDate(e.target.value)}
                    className={`${fieldDisable ? "" : "disabled"} mt-lg-2 px-1`}
                    disabled={!fieldDisable}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 text-center mb-3">
              <button
                className="btn btn-outline-primary ledger-submit-button rounded-3 my-3 w-25"
                onClick={HandleLedgerData}
              >
                {selectedMultiLangData?.submit}
              </button>
            </div>
          </div>
        </div>

        {showDlData === true && (
          <DealerLedgerTable dealerLedgerSummary={dealerLedgerSummary} />
        )}
      </div>
    </>
  );
};

export default DealerLedger;