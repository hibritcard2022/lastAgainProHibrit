import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { List, arrayMove } from "react-movable";
import ProfilePageButton from "../../components/profile-page-button";
import { useRouter } from "next/router";
import GlobalControllerLayout from "../../layouts/global-controller-layout";





import {
  getProfilePanelAsync,
  postBankInfoAsync,
  updateBankInfoAsync,
  postContactInfoAsync,
  updateContactInfoAsync,
  postDocumentInfoAsync,
  updateDocumentInfoAsync,
  fileUploadAsync,
  fileUploadChangeAsync,
  updatBankStatusModeAsync,
  updatContactStatusModeAsync,
  updateDocumentToViewStatusModeAsync,
  updateFileUploadedStatusModeAsync,
  updateOrderOdBankIdAsync,
  updateOrderOfContactIdAsync,
  updateOrderOfDocumentToViewIdAsync,
  updateOrderOfFileUploadedIdAsync,
  deleteBankPanelAsync,
  deleteContactPanelAsync,
  deleteProfileUrlPanelAsync,
  deleteDocumentPanelAsync,
  deleteFileUploadedPanelAsync,
  updatePanelTitleContactdAsync,
  updatePanelTitleBankdAsync,
  updatePanelTitleDocumentdAsync,
  updatePanelTitleFileUploadAsync,
  firstTimeUploadFileAsync,
  postProfileUrlInfoAsync,
  updateOrderOfProfilePanelIdAsync,
  updateOnlyPhoneInputContactInfoAsync,
  updateOnlyEmailInputContactInfoAsync,
  updateProfileUrlInfoAsync,
  updatePanelTitleProfileUrlLinkAsync,
  updatProfileUrlStatusModeAsync,
} from "../../stores/userSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//code countries here
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; //country css

//import countries and cities
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { toastify } from "../../util/toastify";
import TextField from "@mui/material/TextField"; //react mui
import { border } from "@mui/system";
import IBAN from "../../buttonInput/ibanFormat"




//Iban Input Changs
const IbanInput = (props) => (
  <IBAN
    {...props}

    render={({ onChange, value, iban, ...rest }) => (
      <React.Fragment>
        <input {...rest} onChange={onChange} value={value} />{" "}
        {Boolean(iban) && (
          <React.Fragment>
            {/* <p>
              <strong> IBAN(unformated) </strong>: <br /> {iban}{" "}
            </p>{" "}
            <p>
              <strong> IBAN(formatted) </strong>: <br /> {value}{" "}
            </p>{" "} */}

            {/* <div>
            <strong> IBAN(formatted) </strong>: <br /> {value}{" "}
            </div> */}

            
          </React.Fragment>
        )}{" "}
      </React.Fragment>
    )}
  />
);

function Panel() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const profilePanel = useSelector((state) => state.userSlice.profilePanel); //profile Panel
  const profilePanelStatus = useSelector((state) => state.userSlice.status);

  const contactPoststatus = useSelector(
    (state) => state.userSlice.postContactStatus
  ); //conatct post status
  const bankPoststatus = useSelector((state) => state.userSlice.postbanStatus); //bank post status
  const documentPoststatus = useSelector(
    (state) => state.userSlice.documentstatus
  ); //document post status
  const uploadPoststatus = useSelector(
    (state) => state.userSlice.uploadFilestatusFirst
  ); //upload Profile post status
  const profileUrlPoststatus = useSelector(
    (state) => state.userSlice.postPanelProfilUrlStatus
  ); //upload Profile post status

  //order status Mode  dispaly

  const contactorderStatus = useSelector(
    (state) => state.userSlice.orderContactStatus
  ); //conatct post status
  const bankorderstatus = useSelector(
    (state) => state.userSlice.orderBankStatus
  ); //bank post status
  const documentorderstatus = useSelector(
    (state) => state.userSlice.orderDocumentStatus
  ); //document post status
  const uploadorderstatus = useSelector(
    (state) => state.userSlice.orderUploadUploadStatus
  ); //upload Profile post status
  const profileUrlOrderstatus = useSelector(
    (state) => state.userSlice.orderProfileUrStatus
  ); //upload Profile post status


  useEffect(() => {
    
    if (contactorderStatus == "success") {
      getAllPanelFromChangepanelList();
      console.log("brada girdi sta::", contactorderStatus)
    }
  }, [contactorderStatus])

  useEffect(() => {
    
    if (bankorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [bankorderstatus])


  useEffect(() => {
    if (documentorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [documentorderstatus])

  useEffect(() => {
    if (uploadorderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [uploadorderstatus])

  useEffect(() => {
    if (profileUrlOrderstatus == "success") {
      getAllPanelFromChangepanelList();
    }
  }, [profileUrlOrderstatus])





  useEffect(() => {
    console.log("contact Status:", contactPoststatus);
    if (contactPoststatus == "success") {
      getAllPanelFromHere();
    }
  }, [contactPoststatus]);

  useEffect(() => {
    console.log("bank Status:", bankPoststatus);
    if (bankPoststatus == "success"){
      getAllPanelFromHere();
    }
  }, [bankPoststatus]);

  useEffect(() => {
    console.log("contact Status:", documentPoststatus);
    if (documentPoststatus == "success") {
      getAllPanelFromHere();
    }
  }, [documentPoststatus]);

  useEffect(() => {
    console.log("contact Status:", uploadPoststatus);
    if (uploadPoststatus == "success") {
      getAllPanelFromHere();
    }
  }, [uploadPoststatus]);

  useEffect(() => {
    console.log("contact Status:", profileUrlPoststatus);
    if (profileUrlPoststatus == "success") {
      getAllPanelFromHere();
    }
  }, [profileUrlPoststatus]);

  const deletePanelstatus = useSelector(
    (state) => state.userSlice.deletesatatus
  );
  const profile = useSelector((state) => state.userSlice.profiles);

  const selectedProfilData = profile.find(
    (s) => s.profileId == selectedProfileId
  );

  //here will be the usestate
  //const [profileId, setprofileId] = useState(selectedProfileId);
  const [accountOwner, setaccountOwner] = useState();
  const [bankName, setbankName] = useState("");
  const [bankStation, setbankStation] = useState("");
  const [bankIban, setbankIban] = useState("");
  const [BankDataId, setBankDataId] = useState();
  const [bankstatueMode, setbankstatueMode] = useState(true);
  const [bankType, setBankType] = useState("");
  const [orderIdOfBank, setorderIdOfBank] = useState(0);

  const [bankdataDeleteId, setbankdataDeleteId] = useState();
  const [contactdeleteId, setcontactdeleteId] = useState();
  const [documentdeleteId, setdocumentdeleteId] = useState();
  const [fileUploaddeleteId, setfileUploaddeleteId] = useState();
  const [profileUrlDeleteId, setprofileUrlDeleteId] = useState();

  //panel Title from here
  const [bankdataEditId, setbankdataEditId] = useState();
  const [contactdataEditId, setcontactdataEditId] = useState();
  const [profileUrldataEditId, setprofileUrldataEditId] = useState();
  const [documentdataEditId, setdocumentdataEditId] = useState();
  const [fileUploadEditId, setfileUploadEditId] = useState();
  const [panelTitleText, setpanelTitleText] = useState("Değiştir"); //panel Title

  const [valueKontrolafterEdit, setvalueKontrolafterEdit] = useState(false);

  // post contact usestate
  const [publicName, setpublicName] = useState("");
  const [publicsurname, setpublicsurname] = useState("");
  const [publicOrganization, setpublicOrganization] = useState("");
  const [profilePosition, setprofilePosition] = useState("");

  const [takenPhoneNumberState, settakenPhoneNumberState] = useState("");
  const [takenEmailEpostaState, settakenEmailEpostaState] = useState("");

  const [streetAdress, setstreetAdress] = useState("");
  const [profileCountry, setprofileCountry] = useState("");
  const [profileCity, setprofileCity] = useState("");
  const [profileNot, setprofileNot] = useState("");
  const [contactDataId, setcontactDataId] = useState();
  const [contactstatueMode, setcontactstatueMode] = useState(true);
  const [orderIdOfContact, setorderIdOfContact] = useState(0);

  //post Profile URL pANEL
  const [profileUrlPanel, setprofileUrlPanel] = useState("");
  const [profileUrlDataId, setprofileUrlDataId] = useState();
  const [profileUrlstatueMode, setprofileUrlstatueMode] = useState(true);
  const [orderIdOfProfileUrl, setorderIdOfProfileUrl] = useState(0);

  const [editUrlProfile, setEditUrlProfile] = useState(false);

  // post Document form heree
  const [statusNameSurname, setstatusNameSurname] = useState(false);
  const [statusEmail, setstatusEmail] = useState(false);
  const [statusTelefon, setstatusTelefon] = useState(false);
  const [statusMessage, setstatusMessage] = useState(false);
  const [emailToSend, setemailToSend] = useState("");
  const [publicstreetAdress, setpublicstreetAdress] = useState("");
  const [publicDropNot, setpublicDropNot] = useState("");
  const [documentDataFormId, setdocumentDataFormId] = useState();
  const [documentstatueMode, setdocumentstatueMode] = useState(true);
  const [orderIdOfDocument, setorderIdOfDocument] = useState(0);

  //upload file
  const [uploadFilestatueMode, setuploadFilestatueMode] = useState(); //kullanıldı
  const [belgeDocument, setbelgeDocument] = useState("");
  const [belgeDocumentId, setbelgeDocumentId] = useState();
  const [uploadFileStatueModeSecond, setuploadFileStatueModeSecond] =
    useState(true);
  const [orderIdOfFileUpload, setorderIdOfFileUpload] = useState(0);

  //******************************* Usetae of Panel Cout */
  const [countContactPanel, setcountContactPanel] = useState(0);
  const [countDocumentPanel, setcountDocumentPanel] = useState(0);
  const [countUploadfilePanel, setcountUploadfilePanel] = useState(0);
  const [countBankaPanel, setcountBankaPanel] = useState(0);
  const [countProfileUrlPanel, setcountProfileUrlPanel] = useState(0);

  /// Incraese fuction contact
  function IncreaseAddContactPanel() {
    setcountContactPanel(countContactPanel + 1),
      console.log("data Send :", countContactPanel);
  }

  //Decrease function contact
  function DecreaseDeleteContactPanel() {
    setcountContactPanel(countContactPanel - 1);
  }

  /// Incraese fuction banka
  function IncreaseAddBankaPanel() {
    setcountBankaPanel(countBankaPanel + 1);
  }

  //Decrease function banka
  function DecreaseDeleteBankaPanel() {
    setcountBankaPanel(countBankaPanel - 1);
  }

  /// Incraese fuction Dcument
  function IncreaseAddDocumentPanel() {
    setcountDocumentPanel(countDocumentPanel + 1);
  }

  //Decrease function banka
  function DecreaseDeleteDocumnentPanel() {
    setcountDocumentPanel(countDocumentPanel - 1);
  }

  /// Incraese fuction Profile URL
  function IncreaseAddProfilePanel() {
    setcountProfileUrlPanel(countProfileUrlPanel + 1);
  }

  //Decrease function Profile URL
  function DecreaseDeleteProfileUrlPanel() {
    setcountProfileUrlPanel(countProfileUrlPanel - 1);
  }

  /// Incraese fuction Upload File
  function IncreaseAddUploadFilePanel() {
    setcountUploadfilePanel(countUploadfilePanel + 1);
  }

  //Decrease function Upload File
  function DecreaseDeleteUploadFilePanel() {
    setcountUploadfilePanel(countUploadfilePanel - 1);
  }

  //console.log("ülkeler", Country.getAllCountries()[0].isoCode);
  // console.log("stateler", State.getAllStates());
  // console.log("Şehirler", City.getAllCities());
  //console.log("Şehirler", City.getCitiesOfCountry("AF"));

  //all countries
  function rollCallCountries(countries, index) {
    //console.log(`The first ${index + 1} country is ${countries.name}.`);
    //<option value={countries.name}>Ankara</option>;
    //console.log("countries:",countries.name)
  }

  //call all countries
  Country.getAllCountries().forEach((name, index) =>
    rollCallCountries(name, index)
  );

  useEffect(() => {
    setProfileData(selectedProfilData);
  }, [selectedProfilData]);

  const selectedProfileId = useSelector(
    (state) => state.userSlice.selectProfileId
  ); //profileId

  const [profileData, setProfileData] = useState(selectedProfilData);
  const [countryCode, setcountryCode] = useState("AF");

  useEffect(() => {
    //console.log("veri again:", countryCode);
  }, [countryCode]);

  const [coutryCity,setcoutryCity]=useState("")

  //change every 
  useEffect(() => {
    console.log("country here::", profileCountry)
    console.log("allcountry::", Country.getAllCountries())
     Country.getAllCountries().map((v,i)=>{
      if(v.name == profileCountry){
        setcoutryCity(v.isoCode)
      }

      console.log("Isocodebur::", coutryCity)

    })
  }, [profileCountry]);

  const data = { profileId: selectedProfileId };


  const profilePanelBank = useSelector(
    (state) => state.userSlice.profilePanelBank
  );

  //useEffect to bring the profile  panel
  useEffect(() => {
    selectedProfileId != ""
      ? dispatch(getProfilePanelAsync(selectedProfileId))
      : dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );

    console.log("hee Geldi yinee::");
  }, [dispatch]);

  //deneme buarada dispatch

  //credentials to send
  const uploadDataDetails12 = {
    profileId: selectedProfileId,
    belgeDocument: uploadFilestatueMode,
    belgeDocumentId: belgeDocumentId,
    OrderId: orderIdOfFileUpload,
  };

  const updateDatasatusModeBank12 = {
    profileId: selectedProfileId,
    statueMode: bankstatueMode,
    bankDataId: BankDataId,
  };

  const updateStatueModeProfileUrl = {
    profileId: selectedProfileId,
    statueMode: profileUrlstatueMode,
    panelProfileUrlDataId: profileUrlDataId,
  };

  const updateContactStatuMode13 = {
    profileId: selectedProfileId,
    statueMode: contactstatueMode,
    contactDataId: contactDataId,
  };

  const updateDocumentToViewStatuMode14 = {
    profileId: selectedProfileId,
    statueMode: documentstatueMode,
    documentDataFormId: documentDataFormId,
  };

  const updateFileUpoadedStatuMode15 = {
    profileId: selectedProfileId,
    statueMode: uploadFileStatueModeSecond,
    belgeDocumentId: belgeDocumentId,
  };

  useEffect(() => {
    console.log("uplad File:", uploadDataDetails12);
  }, [uploadDataDetails12]);

  //useEffect of BANKsTATUmode
  useEffect(() => {
    // console.log("Bank StatusMode:", updateDatasatusModeBank12);
    if (updateDatasatusModeBank12.bankDataId != undefined) {
      // console.log("gitti değişiklik banka");
      dispatch(updatBankStatusModeAsync(updateDatasatusModeBank12));
    }
  }, [updateDatasatusModeBank12]);

  useEffect(() => {
    if (updateStatueModeProfileUrl.panelProfileUrlDataId != undefined) {
      dispatch(updatProfileUrlStatusModeAsync(updateStatueModeProfileUrl));
    }
  }, [updateStatueModeProfileUrl]);

  //useEffect of StatuMode of Contact MOde
  useEffect(() => {
    //console.log("contact StatusMode:", updateContactStatuMode13);
    if (updateContactStatuMode13.contactDataId != undefined) {
      //console.log("gitti değişiklik contact");
      dispatch(updatContactStatusModeAsync(updateContactStatuMode13));
    }
  }, [updateDatasatusModeBank12]);

  //update Document to View Status
  useEffect(() => {
    console.log("Document Toview StatusMode:", updateDocumentToViewStatuMode14);
    if (updateDocumentToViewStatuMode14.documentDataFormId != undefined) {
      console.log("gitti değişiklik Document");
      dispatch(
        updateDocumentToViewStatusModeAsync(updateDocumentToViewStatuMode14)
      );
    }
  }, [updateDocumentToViewStatuMode14]);

  //update StatuMODE OF fİLE uPLOADED
  useEffect(() => {
    //console.log("fİLE  uOPLOADED StatusMode:", updateFileUpoadedStatuMode15);
    if (updateFileUpoadedStatuMode15.belgeDocumentId != undefined) {
      // console.log("gitti değişiklik fİLE Uploaded");
      dispatch(updateFileUploadedStatusModeAsync(updateFileUpoadedStatuMode15));
    }
  }, [updateFileUpoadedStatuMode15]);

  //to see on console from here
  useEffect(() => {
    // console.log("Bank Data Id:", BankDataId);
  }, [BankDataId]);

  //status Mode from here
  useEffect(() => {
    // console.log("status Mode From:", bankstatueMode);
  }, [bankstatueMode]);

  //upload File HERR
  function handleUploadFile(event, numberSend) {
    event.preventDefault();

    //   let OrderIdContactPost = profilePanelBank.length==0  ?  0 : (profilePanelBank.length - 1) +1 ;
    //   for(let index = 0; index < numberSend; index++) {
    //     console.log("Burasi index:", index)
    //     setorderIdOfContact(index);
    //     console.log("bEFORE send:", OrderIdContactPost)
    //       dispatch(fileUploadAsync({
    //         profileId: localStorage.getItem("selectedProfileId"),
    //         belgeDocument: uploadFilestatueMode,
    //           OrderId: OrderIdContactPost
    //       }))
    //     OrderIdContactPost++
    // }
  }

  function getAllPanelFromChangepanelList(){

    panelListSort.map((v, i) => {
      if (v.OrderId && v.type == "bankform" && v.OrderId != i && v.BankDataId != undefined) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
        console.log("buradavar::")
      } else if (
        v.OrderId &&
        v.type == "conatctAddForm" &&
        v.OrderId != i
        && v.conatctDataId != undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "documentForm" &&
        v.OrderId != i
        && v.documentDataFormId !=undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "uploadFileDocument" &&
        v.OrderId != i
        && v.belgeDocumentId !=undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId &&
        v.type == "urlLinkPanel" &&
        v.OrderId != i
        && v.profileUrlDataId !=undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))

        );
      }
    });

  }

  function getAllPanelFromHere() {

    panelListSort.map((v, i) => {

      if (v.OrderId || v.id && v.type == "bankform" && v.BankDataId == undefined) {

        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );

        console.log("olmadıbur")


      } else if (
        v.OrderId  || v.id &&
        v.type == "conatctAddForm" &&
        v.contactDataId == undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId || v.id &&
        v.type == "documentForm" &&
        v.documentDataFormId == undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId || v.id &&
        v.type == "uploadFileDocument" &&
        v.belgeDocumentId == undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      } else if (
        v.OrderId  || v.id &&
        v.type == "urlLinkPanel" &&
        v.panelProfileUrlDataId == undefined
      ) {
        dispatch(
          getProfilePanelAsync(localStorage.getItem("selectedProfileId"))
        );
      }
    });
  }

  // firstTimeUploadFileAsync //burada first Timöe upload function form here

  function handleUploadFileFirstTimeFile(event, numberSend, arr) {
    event.preventDefault();
    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "uploadFileDocument") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);
    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      console.log("Burasi index:", index);
      setorderIdOfContact(index);
      dispatch(
        firstTimeUploadFileAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          belgeDocument: uploadFilestatueMode,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //uploadChange(event)
  function uploadChangeFiles() {
    dispatch(fileUploadChangeAsync(uploadDataDetails12));
  }

  //update BnakStatusMode

  //new panel
  const [newPanel, setNewPanel] = useState(false);

  //console.log("Panel data:", profilePanel);

  //credentials to send
  const bankDataDetails1 = {
    BankDataId: BankDataId,
    profileId: selectedProfileId,
    accountOwner: accountOwner,
    bankName: bankName,
    bankStation: bankStation,
    bankIban: bankIban,
    bankstatueMode: bankstatueMode,
    bankType: bankType,
    OrderId: orderIdOfBank,
  };

  const profileUrlData = {
    panelProfileUrlDataId: profileUrlDataId,
    panelUrlLink: profileUrlPanel,
  };

  //credentials to send contact
  const bankDataDetails2 = {
    contactDataId: contactDataId,
    publicName: publicName,
    profileId: selectedProfileId,
    publicsurname: publicsurname,
    publicOrganization: publicOrganization,
    profilePosition: profilePosition,
    takenPhoneNumber: takenPhoneNumberState,
    takenEmailEposta: takenEmailEpostaState,
    streetAdress: streetAdress,
    profileCountry: profileCountry,
    profileCity: profileCity,
    profileNot: profileNot,
    OrderId: orderIdOfContact,
  };

  //documentDataDetails3
  const documentDataDetails3 = {
    documentDataFormId: documentDataFormId,
    profileId: selectedProfileId,
    statusNameSurname: statusNameSurname,
    statusEmail: statusEmail,
    statusTelefon: statusTelefon,
    statusMessage: statusMessage,
    emailToSend: emailToSend,
    publicstreetAdress: publicstreetAdress,
    publicDropNot: publicDropNot,
    OrderId: orderIdOfDocument,
  };

  const [sendData, sesendData] = useState(bankDataDetails1);
  const [sendDataconatct, setsendDataconatct] = useState(bankDataDetails2);
  const [sendDataDocument, setsendDataDocument] =
    useState(documentDataDetails3);

  useEffect(() => {
    //console.log("veri again bank details:", bankDataDetails1);
  }, [bankDataDetails1]);

  useEffect(() => {
    console.log("veri kontrol contact yu:", bankDataDetails2);
  }, [bankDataDetails2]);

  useEffect(() => {
    //console.log("veri again:", documentDataDetails3);
  }, [documentDataDetails3]);

  // post bank Info send
  function postBankData(event, numberSend, arr) {
    event.preventDefault();
    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "bankform") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    console.log("zuun::", indexesOfIndex);

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);
      dispatch(
        postBankInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          accountOwner: accountOwner,
          bankName: bankName,
          bankStation: bankStation,
          bankIban: bankIban,
          bankstatueMode: bankstatueMode,
          bankType: bankType,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //update bank data
  function updateBankData(event) {
    event.preventDefault();
    dispatch(updateBankInfoAsync(bankDataDetails1));
    // console.log("updated veri:", bankDataDetails1);
  }

  useEffect(() => {
    console.log("urlveri", profileUrlData);
  }, [profileUrlData]);
  //UPDATE PROFİLE URL LİNK
  function updateProfileUrlLinkData(event) {
    event.preventDefault();
    dispatch(updateProfileUrlInfoAsync(profileUrlData));
    // console.log("updated veri:", bankDataDetails1);
  }

  //update contact data

  function updateContactData(event) {
    event.preventDefault();
    dispatch(updateContactInfoAsync(bankDataDetails2))
      .then(() => {
        telefonInputServ.map((v, i) => {
          for (let index = 0; index <= telefonInputServ.length; index++) {
            dispatch(
              updateOnlyPhoneInputContactInfoAsync({
                conatctDataId: contactDataId,
                newEnterPhoneInput: v.phoneNumber,
                arrayLentghToChange: i,
              })
            );
          }

          console.log("numara bak:", v.phoneNumber);
        });
      })
      .then(() => {
        emailInputServ.map((v, i) => {
          for (let index = 0; index <= emailInputServ.length; index++) {
            dispatch(
              updateOnlyEmailInputContactInfoAsync({
                conatctDataId: contactDataId,
                newEmailPosta: v.emailPosta,
                arrayLentghToChange: i,
              })
            );
          }
        });
      })
      .catch(() => {
        console.log("update olmadı::");
      });

    //console.log("updated veri:", bankDataDetails2);
  }

  //*****post Contact  */
  //let OrderIdContactPost= profilePanelBank !="" ?  profilePanelBank == null ? 0 : profilePanelBank.length + 1 : "";
  //let OrderIdContactPost= profilePanelBank !="" ?  console.log("ProfileBnak hee::",profilePanelBank ) : "";

  //post contact
  function postContactData(event, numberSend, arr) {
    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "conatctAddForm") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);
      dispatch(
        postContactInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          publicName: publicName,
          publicsurname: publicsurname,
          publicOrganization: publicOrganization,
          profilePosition: profilePosition,
          takenPhoneNumber: takenPhoneNumberState,
          takenEmailEposta: takenEmailEpostaState,
          streetAdress: streetAdress,
          profileCountry: profileCountry,
          profileCity: profileCity,
          profileNot: profileNot,
          OrderId: indexes[indexesOfIndex],
        })
      );

      indexesOfIndex--;
    }
  }

  //post PRofile url panel   postProfileUrlInfoAsync
  function postprofileUrlPanelData(event, numberSend, arr) {
    event.preventDefault();
    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "urlLinkPanel") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      console.log("Burasi index:", index);
      setorderIdOfContact(index);
      dispatch(
        postProfileUrlInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          panelUrlLink: profileUrlPanel,
          OrderId: indexes[indexesOfIndex],
        })
      );

      indexesOfIndex--;
    }
  }

  //postDocument
  function postDocument(event, numberSend, arr) {
    event.preventDefault();

    let newArray = [...arr];

    const indexes = newArray
      .map((element, index) => {
        if (element.type === "documentForm") {
          return index;
        }
      })
      .filter((element) => element >= 0);

    console.log("sonuda::", indexes);

    const indexesOfIndex = indexes.length - 1;

    for (let index = 0; index < numberSend; index++) {
      setorderIdOfContact(index);

      dispatch(
        postDocumentInfoAsync({
          profileId: localStorage.getItem("selectedProfileId"),
          statusNameSurname: statusNameSurname,
          statusEmail: statusEmail,
          statusTelefon: statusTelefon,
          statusMessage: statusMessage,
          emailToSend: emailToSend,
          publicstreetAdress: publicstreetAdress,
          publicDropNot: publicDropNot,
          OrderId: indexes[indexesOfIndex],
        })
      );
      indexesOfIndex--;
    }
  }

  //update document form heer
  function updateDoumentData(event) {
    event.preventDefault();
    dispatch(updateDocumentInfoAsync(documentDataDetails3));
    // console.log("updated veri:", documentDataDetails3);
  }

  const deleteBank = {
    bankDataId: bankdataDeleteId,
  };
  const deleteContact = {
    contactDataId: contactdeleteId,
  };

  const deleteProfileUrl={
    panelProfileUrlDataId: profileUrlDeleteId
  }

  const deleteDocument = {
    documentDataFormId: documentdeleteId,
  };

  const deleteFileUpload = {
    belgeDocumentId: fileUploaddeleteId,
  };

  useEffect(() => {
    console.log("en son veri deleteBank:", deleteBank);
  }, [deleteBank]);

  //delete bank
  function delteBankData() {
    if (deleteBank.bankDataId != undefined) {
      dispatch(deleteBankPanelAsync(deleteBank));
    }
  }

  // delete contact
  function delteContactData() {

    if (deleteContact.contactDataId != undefined) {
      dispatch(deleteContactPanelAsync(deleteContact));
    }

  }


  //delete panel Url PROFİLE FROM HEER
  function delteProfileUrlData() {
    if (deleteProfileUrl.panelProfileUrlDataId != undefined) {
      dispatch(deleteProfileUrlPanelAsync(deleteProfileUrl));
    }

  }

  //delete Document
  function delteDocumentData() {
    if (deleteDocument.documentDataFormId != undefined) {
      dispatch(deleteDocumentPanelAsync(deleteDocument));
    }
  }

  // delete FileUpload
  function delteFileUploadData() {
    if (deleteFileUpload.belgeDocumentId != undefined) {
      dispatch(deleteFileUploadedPanelAsync(deleteFileUpload));
    }
  }

  const contactEditPanel = {
    contactDataId: contactdataEditId,
    panelTitle: panelTitleText,
    bankDataId: bankdataEditId,
    documentDataFormId: documentdataEditId,
    belgeDocumentId: fileUploadEditId,
    panelProfileUrlDataId: profileUrldataEditId,
  };

  useEffect(() => {
    console.log("here you are with me:", contactEditPanel);
  }, [contactEditPanel]);

  //*********** panel Ttitle Edit */
  //Conatct Panel Title
  function contactEditTitlePanel() {
    if (
      contactEditPanel.contactDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleContactdAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //profile Url panel Title
  function profileUrlEditTitlePanel() {
    if (
      contactEditPanel.panelProfileUrlDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleProfileUrlLinkAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //Bank panel edit Title
  function bankEditTitlePanel() {
    if (
      contactEditPanel.bankDataId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleBankdAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //Document panel Title
  function documentEditTitlePanel() {
    if (
      contactEditPanel.documentDataFormId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleDocumentdAsync(contactEditPanel));
    }
  }

  //file Upload panel Title
  function FileUploadEditTitlePanel() {
    if (
      contactEditPanel.belgeDocumentId != undefined &&
      contactEditPanel.panelTitle != undefined
    ) {
      dispatch(updatePanelTitleFileUploadAsync(contactEditPanel));
      console.log("her you are send");
    }
    console.log("inside function");
  }

  //useEffect again
  useEffect(() => {
    // console.log(profilePanelStatus);
    // console.log("profilPanel: ", profilePanel);
  }, [profilePanelStatus]);

  useEffect(() => {
    // console.log("delete panel status:", deletePanelstatus);
    // if (deletePanelstatus === "success") {
    //   toastify({ type: "success", message: "Başarıyla Silindi." });
    // }
  }, [deletePanelstatus]);

  //foreach get all thye data
  // const [panels, setPanels] = useState(profilePanelBank);

  const [panels, setPanels] = useState([]);

  useEffect(() => {
    profilePanelBank !== null ? setPanels(profilePanelBank) : setPanels([]);

    console.log("velooo");
  }, [profilePanelBank]);

  // ******************* sıaralama here*************

  // panelList order heer
  const [panelListSort, setpanelListSort] = useState(
    [...panels].sort((a, b) => a.OrderId - b.OrderId)
  );

  useEffect(() => {
    setpanelListSort([...panels].sort((a, b) => a.OrderId - b.OrderId));
  }, [panels]);

  //function order panel List
  function panelOrderIdChangeUpdate(oldIndex, newIndex) {
    setpanelListSort(arrayMove(panelListSort, oldIndex, newIndex));
    setorderIdOfBank(newIndex);
    // console.log("yeni sıralama panel:", panelListSort);
  }

  //const bank order Update
  const bankdataOrderUpdate = {
    bankDataId: BankDataId,
    OrderId: orderIdOfBank,
  };

  //update and changes every time order and bring new PANEL LİST
  useEffect(() => {
    console.log("panel List orderId yeni:", panelListSort);
    console.log("panel List orderId old:", panels);

    panelListSort.map((v, i) => {
      if (
        v.type == "urlLinkPanel" &&
        v.panelUrlLink != undefined &&
        profileUrlPanel == ""
      ) {
        setprofileUrlPanel(v.panelUrlLink);
      }

      // if (v.OrderId != i) {
      //   setpanelListSort((v) =>
      //     panelListSort.map((s, i) =>
      //       s.OrderId == i && s.isOpen != true
      //         ? { ...s, OrderId: i }
      //         : { ...s, OrderId: i }
      //     )
      //   );
      // }

      if (v.BankDataId != undefined) {
        dispatch(
          updateOrderOdBankIdAsync({ bankDataId: v.BankDataId, OrderId: i })
        );
      } else if (v.contactDataId != undefined) {
        dispatch(
          updateOrderOfContactIdAsync({
            contactDataId: v.contactDataId,
            OrderId: i,
          })
        );
      } else if (v.documentDataFormId != undefined) {
        dispatch(
          updateOrderOfDocumentToViewIdAsync({
            documentDataFormId: v.documentDataFormId,
            OrderId: i,
          })
        );
      } else if (v.belgeDocumentId != undefined) {
        dispatch(
          updateOrderOfFileUploadedIdAsync({
            belgeDocumentId: v.belgeDocumentId,
            OrderId: i,
          })
        );
      } else if (v.panelProfileUrlDataId != undefined) {
        dispatch(
          updateOrderOfProfilePanelIdAsync({
            panelProfileUrlDataId: v.panelProfileUrlDataId,
            OrderId: i,
          })
        );
      }
      //dispatch(getProfilePanelAsync(localStorage.getItem("selectedProfileId")))
    });

    
  }, [panelListSort]);

  // ************************sıralama bitti here***************

  useEffect(() => {}, [bankstatueMode]);

  //open StatusMode From here
  async function OpenStatus(
    id,
    newOrderId,
    statueMode,
    BankDataId,
    contactDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId
  ) {
    //console.log("orderId :", id);
    setbankstatueMode(statueMode);
    setprofileUrlstatueMode(statueMode);
    setBankDataId(BankDataId);
    setprofileUrlDataId(panelProfileUrlDataId);
    setcontactstatueMode(statueMode);
    setcontactDataId(contactDataId);
    setdocumentDataFormId(documentDataFormId);
    setdocumentstatueMode(statueMode);

    setuploadFileStatueModeSecond(statueMode);
    setbelgeDocumentId(belgeDocumentId);

    // { ...s, statueMode: false }

    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.statueMode != true
            ? { ...s, statueMode: true }
            : s.OrderId == id && s.statueMode == true
            ? { ...s, statueMode: false }
            : { ...s }
          : i == newOrderId && s.statueMode != true
          ? { ...s, statueMode: true }
          : s.OrderId == id && s.statueMode == true
          ? { ...s, statueMode: false }
          : { ...s }
      )
    );
  }

  //open PANEL FROM HERE
  async function PanelOpen(
    id,
    accountOwner,
    bankIban,
    bankName,
    bankStation,
    BankDataId,
    type,
    newOrderId,
    profileCity,
    profileCountry,
    profileNot,
    profilePosition,
    takenPhoneNumberState,
    takenEmailEpostaState,
    publicName,
    publicOrganization,
    publicsurname,
    streetAdress,
    contactDataId,

    statusNameSurname,
    statusEmail,
    statusTelefon,
    statusMessage,
    emailToSend,
    publicstreetAdress,
    publicDropNot,
    documentDataFormId,

    belgeDocument,
    belgeDocumentId,

    panelUrlLink,
    panelProfileUrlDataId
  ) {
    console.log("contactId here::", contactDataId);
    console.log("ayya::", takenPhoneNumberState);
    setaccountOwner(accountOwner);
    setbankIban(bankIban);
    setbankName(bankName);
    setbankStation(bankStation);
    setBankDataId(BankDataId);
    setBankType(type);
    setorderIdOfBank(newOrderId);
    setorderIdOfContact(newOrderId);
    setorderIdOfDocument(newOrderId);
    setorderIdOfFileUpload(newOrderId);

    setprofileCity(profileCity);
    setprofileCountry(profileCountry);
    setprofileNot(profileNot);
    setprofilePosition(profilePosition);

    // settakenPhoneNumberState(takenPhoneNumberState)
    // settakenEmailEpostaState(takenEmailEpostaState)
    settelefonInputServ(takenPhoneNumberState ? takenPhoneNumberState : []);
    setemailInputServ(takenEmailEpostaState ? takenEmailEpostaState : []);

    setpublicName(publicName);
    setpublicOrganization(publicOrganization);
    setpublicsurname(publicsurname);
    setstreetAdress(streetAdress);
    setcontactDataId(contactDataId);

    setstatusNameSurname(statusNameSurname);
    setstatusEmail(statusEmail);
    setstatusTelefon(statusTelefon);
    setstatusMessage(statusMessage);
    setemailToSend(emailToSend);
    setpublicstreetAdress(publicstreetAdress);
    setpublicDropNot(publicDropNot);
    setdocumentDataFormId(documentDataFormId);

    setbelgeDocumentId(belgeDocumentId);
    setbelgeDocument(belgeDocument);

    setprofileUrlPanel(panelUrlLink);
    setprofileUrlDataId(panelProfileUrlDataId);

    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isOpen != true
            ? { ...s, isOpen: true, isDeleteOpen: false }
            : { ...s, isOpen: false, isDeleteOpen: false }
          : i == newOrderId && s.isOpen != true
          ? { ...s, isOpen: true, isDeleteOpen: false }
          : { ...s, isOpen: false, isDeleteOpen: false }
      )
    );
  }

  //open EDİT PART FROM HERE
  async function openEditPart(
    id,
    newOrderId,
    contactDataId,
    bankDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    panelTitle
  ) {
    setcontactdataEditId(contactDataId);
    setbankdataEditId(bankDataId);
    setdocumentdataEditId(documentDataFormId);
    setfileUploadEditId(belgeDocumentId);
    setprofileUrldataEditId(panelProfileUrlDataId);

    setpanelTitleText(panelTitle); //set panel Title

    await setPanels((v) =>
      panels.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isEditTitle != true
            ? { ...s, isEditTitle: true }
            : { ...s, isEditTitle: false }
          : i == newOrderId && s.isEditTitle != true
          ? { ...s, isEditTitle: true }
          : { ...s, isEditTitle: false }
      )
    );
  }

  //DELETE PANEL FROM HERE
  async function DeletePanelOpen(
    id,
    newOrderId,
    BankDataId,
    contactDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId
  ) {
    console.log("silecek..");
    setbankdataDeleteId(BankDataId);
    setcontactdeleteId(contactDataId);
    setdocumentdeleteId(documentDataFormId);
    setfileUploaddeleteId(belgeDocumentId);
    setprofileUrlDeleteId(panelProfileUrlDataId);


    await setPanels((v) =>
      panelListSort.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.isDeleteOpen != true
            ? { ...s, isOpen: false, isDeleteOpen: true }
            : s.OrderId == id && s.isDeleteOpen == true
            ? { ...s, isOpen: false, isDeleteOpen: false }
            : { ...s }
          : i == newOrderId && s.isDeleteOpen != true
          ? { ...s, isOpen: false, isDeleteOpen: true }
          : s.OrderId == id && s.isDeleteOpen == true
          ? { ...s, isOpen: false, isDeleteOpen: false }
          : { ...s }
      )
    );
  }

  //  async function deletePanelContactPart(id){

  //   await setPanels((v) =>
  //       panels.map((s, i) =>

  //           s.OrderId == id && s.type== "conatctAddForm"
  //             ? { ...s, isOpen: false, isDeleteOpen: true }
  //             : s.OrderId == id && s.isDeleteOpen == true
  //             ? { ...s, isOpen: false, isDeleteOpen: false }
  //             : { ...s }
  //       )
  //     );
  //  }

  // add new Panel from here
  async function NewPanelAdd() {
    await setPanels((v) => [
      ...v,
      { id: v[v.length - 1].id + 1, isOpen: false },
    ]);
    setNewPanel(false);
  }

  // add contact from here
  async function NewPanelAddConatct() {
    console.log("uzunluk bak:", panels.length);
    // setorderIdOfContact(panels.length + 1);
    // id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
    await setPanels((v) => [
      ...v,
      {
        OrderId: v.length == 0 ? 0 : panels.length + 1,
        isOpen: false,
        statueMode: true,
        isEditTitle: false,
        type: "conatctAddForm",
        panelTitle: "Baslık",
      },
    ]);
    //setNewPanel(false);
  }

  // remove contact from frontend here
  async function RemovePanelRemoveConatct(arr) {
    let newArray = [...arr];
    console.log(
      "Index buul:",
      newArray.map((s) => s.type == "conatctAddForm")
    );
    //let secondItemTodelete=newArray.map((s)=>s.type == "conatctAddForm")
    const index = newArray.findIndex(
      (element) => element.type == "conatctAddForm"
    );


    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);

      // let newPanel = [...arr];
      // newPanel.splice(arr.type=="conatctAddForm", 1);
      // console.log("sondurum panel here: ",newPanel )
      // return setPanels(newPanel);
    }


  }

  function OnchangeIbanInput(bankIban){
    setbankIban(bankIban)
  }


  console.log("setbankIbanBu::",bankIban )


  // onChange = ({ value, iban }) => {
    
  //   this.setState({ value, iban })

  // }


  // const removeItem = (arr, item) => {
  //   let newArray = [... arr]
  //   const index = newArray.findIndex((element) => element item)
  //   if (index !== -1) {
  //   newArray.splice(index, 1)
  //   return newArray
  //   }
  //   }

  //banka Remove Frontend From here
  async function RemovePanelRemoveBanka(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex((element) => element.type == "bankform");
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }
    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="bankform", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //async Document Fromtend Here Remove
  async function RemovePanelRemoveDocumentForm(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "documentForm"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="documentForm", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //File Upload Fromheer Remove
  async function RemovePanelRemoveFileUploadPdf(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "uploadFileDocument"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="uploadFileDocument", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }

  //Profile Remove From panel bekle
  async function RemovePanelRemoveProfileUrl(arr) {
    let newArray = [...arr];
    const index = newArray.findIndex(
      (element) => element.type == "urlLinkPanel"
    );
    if (index !== -1) {
      newArray.splice(index, 1);
      return setPanels(newArray);
    }

    // let newPanel = [...arr];
    // newPanel.splice(arr.type=="urlLinkPanel", 1);
    // console.log("sondurum panel here: ",newPanel )
    // return setPanels(newPanel);
  }


  //upload PDF FİLE FOM HER

  function handleImageChange(event) {
    const image = event.target.files[0];

    if (image.size < 2000000) {
      const formData = new FormData();
      // console.log("formDTA  hErer:", image);
      formData.append("image", image, image.name);
      console.log("file upoaded From here:", formData);
      setuploadFilestatueMode(formData);

      dispatch(
        fileUploadChangeAsync({
          belgeDocument: formData,
          belgeDocumentId: belgeDocumentId,
        })
      );
    } else {
      console.log("Dosya Büyük");
    }

    // const formData=new FormData();
    // formData.append("image",image,image.name);
    // this.props.uploadImage(formData)
  }

  function handleEditPicture(e) {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  // function handleFileUploadChange(event) {
  //   const image = event.target.files[0];
  //   //console.log("File Upload all", image);
  //   // console.log("file oploaded Size:", image.size);

  //   if (image.size < 2000000) {
  //     const formData = new FormData();
  //     // console.log("formDTA  hErer:", image);
  //     formData.append("image", image, image.name);
  //     console.log("file upoaded From here:", formData);
  //     setuploadFilestatueMode(formData);
  //   } else {
  //     console.log("Dosya Büyük");
  //   }

  //   //this.props.uploadImage(formData)
  // }

  function deleteData(name, value) {
    panels.find((e) => e === OrderId);
    if (target) {
      target.values = target.values.filter((e) => e !== value);
    }
  }

  //add Bank from here
  async function NewPanelAddBank() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        statueMode: true,
        isEditTitle: false,
        type: "bankform",
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  // add document from here
  async function NewPanelAddDocument() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "documentForm",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  // add new Url Link from here
  async function NewPanelURLink() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "urlLinkPanel",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  // upload file from here
  async function NewPanelAdduploadFile() {
    await setPanels((v) => [
      ...v,
      {
        id: v.length == 0 ? 0 : v[v.length - 1].OrderId + 1,
        isOpen: false,
        type: "uploadFileDocument",
        isEditTitle: false,
        statueMode: true,
        panelTitle: "Başlık",
      },
    ]);
    //setNewPanel(false);
  }

  async function ChangeTitleText(
    id,
    newOrderId,
    contactDataId,
    bankDataId,
    documentDataFormId,
    belgeDocumentId,
    panelProfileUrlDataId,
    panelTitle
  ) {
    setcontactdataEditId(contactDataId);
    setbankdataEditId(bankDataId);
    setdocumentdataEditId(documentDataFormId);
    setfileUploadEditId(belgeDocumentId);
    setprofileUrldataEditId(panelProfileUrlDataId);

    //setpanelTitleText(panelTitle);//set panel Title

    await setPanels((v) =>
      panels.map((s, i) =>
        s.OrderId
          ? s.OrderId == id && s.panelTitle != ""
            ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
            : s.OrderId == id && s.panelTitle == ""
            ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
            : { ...s }
          : i == newOrderId && s.panelTitle != ""
          ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
          : s.OrderId == id && s.panelTitle == ""
          ? { ...s, panelTitle: panelTitleText, isEditTitle: false }
          : { ...s }
      )
    );

    // await setPanels((v) =>
    //   panels.map((s, i) =>
    //     s.OrderId
    //       ? s.OrderId == id && s.isEditTitle != true
    //         ? { ...s, isEditTitle: true }
    //         : { ...s, isEditTitle: false }
    //       : i == newOrderId && s.isEditTitle != true
    //       ? { ...s, isEditTitle: true }
    //       : { ...s, isEditTitle: false }
    //   )
    // );
  }

  const divDecreaseStatuPanel = countContactPanel == 0 ? "none" : "";
  const divDecreaseStatuBankPanel = countBankaPanel == 0 ? "none" : "";
  const divDecreaseStatuDocumentPanel = countDocumentPanel == 0 ? "none" : "";
  const divDecreaseStatueUploadFilePanel =
    countUploadfilePanel == 0 ? "none" : "";
  const divDecreaseStatueProfileUrlPanel =
    countProfileUrlPanel == 0 ? "none" : "";

  //Multiply Input of Phone
  const [telefonInputServ, settelefonInputServ] = useState([]);

  useEffect(() => {
    console.log("telsevHere::", telefonInputServ);
  }, [telefonInputServ]);

  //add phoneNumber Input
  function addPhoneInputHandle() {
    settelefonInputServ([...telefonInputServ, { phoneNumber: "" }]);
  }

  function removeInputPhoneHandle(index) {
    const list = [...telefonInputServ];
    list.splice(index, 1);

    settelefonInputServ(list);
  }

  //multiply Input Of Email
  const [emailInputServ, setemailInputServ] = useState([]);

  useEffect(() => {
    console.log("EmailSev::", emailInputServ);
  }, [emailInputServ]);

  //add Email Input from here
  function addEmailInputHandle() {
    setemailInputServ([...emailInputServ, { emailPosta: "" }]);
  }

  function removeInputEmailHandle(index) {
    const list = [...emailInputServ];
    list.splice(index, 1);

    setemailInputServ(list);
  }

  //handle phone Input Changes
  function handlePhoneList(e, index) {
    //const { name,value}=e
    let list = [...telefonInputServ];

    var o = Object.create(list[index]);

    Object.defineProperty(o, "phoneNumber", {
      value: e,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    list[index] = o;
    //  console.log("ooo", o)
    //  console.log("Listlar",)

    settelefonInputServ(list);
  }

  //Email handle Changes from heer
  function handleEmailList(e, index) {
    const { name, value } = e.target;
    const list = [...emailInputServ];

    var o = Object.create(list[index]);

    Object.defineProperty(o, [name], {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    //console.log("emailpart::",list[index][name] )
    list[index] = o;

    setemailInputServ(list);
  }

  console.log("phoneHere::", telefonInputServ);
  console.log("Email List::", emailInputServ);

 function  onChange ({ value, iban }) {

    setbankIban(value, iban)

  }

  console.log("banakaoo::", bankIban)

  return (
    <>
      <GlobalControllerLayout>
        {" "}
        {newPanel ? (
          <div className="popup-global">
            <div onClick={() => setNewPanel(false)} className="popup-top">
              {" "}
            </div>{" "}
            <div className="popup">
              {countBankaPanel != 0 ||
              countContactPanel != 0 ||
              countDocumentPanel != 0 ||
              countUploadfilePanel != 0 ||
              countProfileUrlPanel != 0 ? (
                <div
                  className="close-button"
                  onClick={(e) => {
                    setNewPanel(false);
                    countContactPanel != 0
                      ? postContactData(e, countContactPanel, panelListSort)
                      : "";
                    countProfileUrlPanel != 0
                      ? postprofileUrlPanelData(
                          e,
                          countProfileUrlPanel,
                          panelListSort
                        )
                      : "";
                    countDocumentPanel != 0
                      ? postDocument(e, countDocumentPanel, panelListSort)
                      : "";
                    countBankaPanel != 0
                      ? postBankData(e, countBankaPanel, panelListSort)
                      : "";
                    countUploadfilePanel != 0
                      ? handleUploadFileFirstTimeFile(
                          e,
                          countUploadfilePanel,
                          panelListSort
                        )
                      : "";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.6585 6.24742C20.0741 6.6111 20.1162 7.24287 19.7526 7.6585L11.0026 17.6585C10.6402 18.0726 10.0114 18.1162 9.59543 17.756L4.34543 13.2106C3.92789 12.8491 3.88247 12.2175 4.24397 11.8C4.60547 11.3825 5.23701 11.337 5.65454 11.6985L10.1525 15.5928L18.2474 6.34149C18.6111 5.92586 19.2429 5.88374 19.6585 6.24742Z"
                      fill="#8B8DFF"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  onClick={() => setNewPanel(false)}
                  className="close-button"
                >
                  <i className="fa-solid fa-xmark"> </i>{" "}
                </div>
              )}
              <div className="header-text"> Yeni Panel Ekle </div>{" "}
              <div className="description-text">Aşağıdan Bilgi Ekle</div>{" "}
              <div className="panel-types">
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-phone"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9684 15.2155C18.3866 14.4089 20.8302 15.9237 21.509 18.3761C21.9715 20.0473 21.5335 21.7996 20.4654 22.9995C20.6841 23.2828 20.9232 23.5552 21.1827 23.8149C21.4409 24.0733 21.7117 24.3115 21.9932 24.5295C23.1927 23.453 24.9503 23.01 26.6263 23.4745C29.0782 24.1542 30.5902 26.5997 29.7848 29.0178C29.2565 30.6044 28.2712 31.5684 26.9571 31.8857C25.7361 32.1805 24.4197 31.8671 23.2585 31.3844C20.92 30.4123 18.6108 28.4974 17.5562 27.442C16.4767 26.3617 14.5701 24.0492 13.6068 21.715C13.1284 20.5559 12.8204 19.2443 13.1159 18.0289C13.4338 16.7213 14.3929 15.741 15.9684 15.2155ZM19.5815 18.9096C19.1688 17.4185 17.7976 16.7137 16.6012 17.1128C15.5496 17.4635 15.1849 17.9849 15.0593 18.5014C14.9113 19.1102 15.04 19.9452 15.4555 20.952C16.28 22.9497 17.9899 25.0465 18.9709 26.0283C19.9283 26.9863 22.0228 28.7048 24.0263 29.5376C25.0361 29.9574 25.8752 30.0894 26.4877 29.9415C27.0071 29.8161 27.5332 29.4492 27.8873 28.3859C28.2867 27.1867 27.5807 25.8145 26.0921 25.4019C24.9842 25.0948 23.8451 25.4506 23.1672 26.1766C22.7295 26.6454 21.8951 26.9127 21.1851 26.4171C20.6856 26.0684 20.2112 25.6722 19.7679 25.2286C19.324 24.7843 18.9276 24.3088 18.5788 23.8081C18.0864 23.1012 18.3492 22.27 18.8146 21.8312C19.5352 21.1519 19.8875 20.0153 19.5815 18.9096Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                    {/* <img src="" alt="" /> */}
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    İletişim bilgileri
                    {/* İletişim bilgileriniz(telefon, mail vb.) ekleyebilirsiniz.{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteContactPanel(e);
                        RemovePanelRemoveConatct(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuPanel,
                      }}
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countContactPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddContactPanel();
                        NewPanelAddConatct(e);
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                </div>
                {/* form documnent fil */}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-file-lines"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 27C19 26.4477 19.4477 26 20 26H26C26.5523 26 27 26.4477 27 27C27 27.5523 26.5523 28 26 28H20C19.4477 28 19 27.5523 19 27Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 23C19 22.4477 19.4477 22 20 22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H20C19.4477 24 19 23.5523 19 23Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 19C19 18.4477 19.4477 18 20 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H20C19.4477 20 19 19.5523 19 19Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19 14C17.8954 14 17 14.8954 17 16V28C17 29.1046 17.8954 30 19 30H27C28.1046 30 29 29.1046 29 28V18.8284C29 18.5632 28.8946 18.3089 28.7071 18.1213L24.8787 14.2929C24.6911 14.1054 24.4368 14 24.1716 14H19ZM15 16C15 13.7909 16.7909 12 19 12H24.1716C24.9672 12 25.7303 12.3161 26.2929 12.8787L30.1213 16.7071C30.6839 17.2697 31 18.0328 31 18.8284V28C31 30.2091 29.2091 32 27 32H19C16.7909 32 15 30.2091 15 28V16Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M25 13V15C25 16.6569 26.3431 18 28 18H30V20H28C25.2386 20 23 17.7614 23 15V13H25Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    İletişim formu
                    {/* İletişim formu sayesinde kişisel bilgilerinzi vermeden
                    kişilerle iletişime geçebilirsiniz..{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteDocumnentPanel(e);
                        RemovePanelRemoveDocumentForm(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuDocumentPanel,
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countDocumentPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddDocumentPanel(e);
                        NewPanelAddDocument(e);
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                </div>{" "}
                {/* Bank Add fil */}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-wallet"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 17C13 14.2386 15.2386 12 18 12H28C30.7614 12 33 14.2386 33 17V27C33 29.7614 30.7614 32 28 32H18C15.2386 32 13 29.7614 13 27V17ZM18 14C16.3431 14 15 15.3431 15 17V27C15 28.6569 16.3431 30 18 30H28C29.6569 30 31 28.6569 31 27V17C31 15.3431 29.6569 14 28 14H18Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M22 22C22 19.7909 23.7909 18 26 18H31C32.1046 18 33 18.8954 33 20V24C33 25.1046 32.1046 26 31 26H26C23.7909 26 22 24.2091 22 22ZM26 20C24.8954 20 24 20.8954 24 22C24 23.1046 24.8954 24 26 24H31V20H26Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M25 22C25 21.4477 25.4477 21 26 21L26.1 21C26.6523 21 27.1 21.4477 27.1 22C27.1 22.5523 26.6523 23 26.1 23L26 23C25.4477 23 25 22.5523 25 22Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text w-full">
                    {" "}
                    Banka hesap bilgileri
                    {/* Banka hesap bilgilerinizi ekleyebilirsiniz.{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteBankaPanel(e);
                        RemovePanelRemoveBanka(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatuBankPanel,
                      }}
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input type="number" id="number" value={countBankaPanel} />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddBankaPanel(e);
                        NewPanelAddBank(e);
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                  {/* <div
                    className="type-add"
                    onClick={(e) => {
                      NewPanelAddBank(e);
                      postBankData(e);
                    }}
                  >
                    {" "}
                    Ekle{" "}
                  </div>{" "} */}
                </div>{" "}
                {/* istediğiniz Url ekleyin burada */}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23 14C18.5817 14 15 17.5817 15 22C15 26.4183 18.5817 30 23 30C27.4183 30 31 26.4183 31 22C31 17.5817 27.4183 14 23 14ZM13 22C13 16.4772 17.4772 12 23 12C28.5228 12 33 16.4772 33 22C33 27.5228 28.5228 32 23 32C17.4772 32 13 27.5228 13 22Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.0854 16.0422C20.4305 17.5156 20 19.6211 20 22C20 24.3789 20.4305 26.4844 21.0854 27.9578C21.4134 28.6958 21.778 29.2311 22.1324 29.5683C22.4816 29.9007 22.7731 30 23 30C23.2269 30 23.5184 29.9007 23.8676 29.5683C24.222 29.2311 24.5866 28.6958 24.9146 27.9578C25.5695 26.4844 26 24.3789 26 22C26 19.6211 25.5695 17.5156 24.9146 16.0422C24.5866 15.3042 24.222 14.7689 23.8676 14.4317C23.5184 14.0993 23.2269 14 23 14C22.7731 14 22.4816 14.0993 22.1324 14.4317C21.778 14.7689 21.4134 15.3042 21.0854 16.0422ZM20.7536 12.9829C21.3615 12.4044 22.1223 12 23 12C23.8777 12 24.6385 12.4044 25.2464 12.9829C25.8491 13.5565 26.3464 14.3392 26.7422 15.2299C27.5351 17.0139 28 19.4083 28 22C28 24.5917 27.5351 26.9861 26.7422 28.7701C26.3464 29.6608 25.8491 30.4435 25.2464 31.0171C24.6385 31.5956 23.8777 32 23 32C22.1223 32 21.3615 31.5956 20.7536 31.0171C20.1509 30.4435 19.6536 29.6608 19.2578 28.7701C18.4649 26.9861 18 24.5917 18 22C18 19.4083 18.4649 17.0139 19.2578 15.2299C19.6536 14.3392 20.1509 13.5565 20.7536 12.9829Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.1584 26C19.8707 26 17.0954 26.7732 15.5664 27.8241L14.4336 26.1759C16.4125 24.8158 19.6355 24 23.1584 24C26.4844 24 29.5304 24.7265 31.521 25.9415L30.4791 27.6486C28.8986 26.684 26.2489 26 23.1584 26Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.0641 20C19.5786 20 16.3884 19.1834 14.4291 17.821L15.5709 16.179C17.0788 17.2275 19.8177 18 23.0641 18C26.2286 18 28.9165 17.2656 30.4485 16.2527L31.5515 17.921C29.5847 19.2214 26.4682 20 23.0641 20Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Url Linki
                    {/* İstediğiniz url adresini profilinizde sergileyebilirsiniz. */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteProfileUrlPanel(e);
                        RemovePanelRemoveProfileUrl(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatueProfileUrlPanel,
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countProfileUrlPanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddProfilePanel(e);
                        NewPanelURLink(e);
                      }}
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                  {/* <div className="type-add" onClick={NewPanelURLink}>
                    {" "}
                    Ekle{" "}
                  </div>{" "} */}
                </div>{" "}
                {/* belge sergilemek documnent fil ***************/}{" "}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17 14C15.8954 14 15 14.8954 15 16V28C15 29.1046 15.8954 30 17 30H29C30.1046 30 31 29.1046 31 28V18.25C31 17.1454 30.1046 16.25 29 16.25H23.8284C23.0328 16.25 22.2697 15.9339 21.7071 15.3713L20.6287 14.2929C20.4411 14.1054 20.1868 14 19.9216 14H17ZM13 16C13 13.7909 14.7909 12 17 12H19.9216C20.7172 12 21.4803 12.3161 22.0429 12.8787L23.1213 13.9571C23.3089 14.1446 23.5632 14.25 23.8284 14.25H29C31.2091 14.25 33 16.0409 33 18.25V28C33 30.2091 31.2091 32 29 32H17C14.7909 32 13 30.2091 13 28V16Z"
                        fill="#ABCAFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23 19C23.5523 19 24 19.4477 24 20V22H26C26.5523 22 27 22.4477 27 23C27 23.5523 26.5523 24 26 24H24V26C24 26.5523 23.5523 27 23 27C22.4477 27 22 26.5523 22 26L22 24H20C19.4477 24 19 23.5523 19 23C19 22.4477 19.4477 22 20 22H22V20C22 19.4477 22.4477 19 23 19Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Belge Yükle
                    {/* Sergilemek istediğiniz belgeleri ekleyebilirsiniz.{" "} */}
                  </div>{" "}
                  <div className="type-add" style={{ display: "flex" }}>
                    <div
                      class="value-button"
                      id="decrease"
                      onClick={(e) => {
                        DecreaseDeleteUploadFilePanel(e);
                        RemovePanelRemoveFileUploadPdf(panels);
                      }}
                      style={{
                        pointerEvents: divDecreaseStatueUploadFilePanel,
                      }}
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input
                      type="number"
                      id="number"
                      value={countUploadfilePanel}
                    />
                    <div
                      class="value-button"
                      id="increase"
                      onClick={(e) => {
                        IncreaseAddUploadFilePanel(e);
                        NewPanelAdduploadFile(e);
                      }}
                    >

<div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                </div>
                {/* //yeni özellikler geliyor */}
                <div className="panel-type-item w-full">
                  <div className="type-icon">
                    {" "}
                    {/* <i className="fa-solid fa-folder-plus"> </i>{" "} */}
                    <svg
                      width="45"
                      height="45"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="45" height="45" rx="10" fill="#ECF3FF" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2864 13.9082C22.0637 12.6165 23.9363 12.6165 24.7137 13.9082L26.6008 17.044L30.1664 17.8698C31.635 18.2099 32.2137 19.9909 31.2254 21.1293L28.8263 23.8931L29.1427 27.5394C29.273 29.0412 27.7581 30.1419 26.37 29.5538L23 28.1261L19.6301 29.5538C18.242 30.1419 16.7271 29.0412 16.8574 27.5394L17.1738 23.8931L14.7746 21.1293C13.7864 19.9909 14.3651 18.2099 15.8337 17.8698L19.3992 17.044L21.2864 13.9082ZM23 14.9395L21.1129 18.0753C20.8336 18.5393 20.3781 18.8703 19.8505 18.9925L16.285 19.8182L18.6842 22.5821C19.0392 22.9911 19.2132 23.5265 19.1663 24.0661L18.8499 27.7123L22.2199 26.2846C22.7185 26.0733 23.2816 26.0733 23.7802 26.2846L27.1502 27.7123L26.8337 24.0661C26.7869 23.5265 26.9609 22.9911 27.3159 22.5821L29.7151 19.8182L26.1496 18.9925C25.622 18.8703 25.1665 18.5393 24.8872 18.0753L23 14.9395Z"
                        fill="#ABCAFF"
                      />
                    </svg>
                  </div>{" "}
                  <div className="type-text">
                    {" "}
                    Yeni özellikler yakında Hibrit Card’da...
                  </div>{" "}
                  <div
                    className="type-add"
                    style={{ display: "flex", visibility: "hidden" }}
                  >
                    <div
                      class="value-button"
                      id="decrease"
                      value="Decrease Value"
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
-
                      </div>
                      
                    </div>
                    <input type="number" id="number" value="0" />
                    <div
                      class="value-button"
                      id="increase"
                      value="Increase Value"
                    >
                      <div style={{
                        marginTop:"10px"
                      }}>
+
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}{" "}
        <div className="main-content ">
          <hr />
          <div className="panel-area">
            <div className="panel-button">
              <div
                onClick={() => {
                  setNewPanel(true);
                  setcountBankaPanel(0);
                  setcountContactPanel(0);
                  setcountDocumentPanel(0);
                  setcountUploadfilePanel(0);
                  setcountProfileUrlPanel(0);
                }}
                className="global-button new-panel-button"
                style={{ display: "flex", margin: "auto", width: "230px" }}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div style={{ margin: "auto" }}>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "16px",
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    {" "}
                    Yeni Panel Ekle{" "}
                  </span>{" "}
                </div>
              </div>{" "}
            </div>{" "}
            {/* first one panel to drop */}{" "}
            <div className="panel-content">
              <List
                values={panelListSort}
                onChange={({ oldIndex, newIndex }) => {
                  panelOrderIdChangeUpdate(oldIndex, newIndex);
                }}
                renderList={({ children, props }) => (
                  <div {...props}> {children} </div>
                )}
                renderItem={({ value, props }) => (
                  <div {...props}>
                    {" "}
                    {
                      <div key={props.key} className="panel-item">
                        <div className="panel-up">
                          <div className="scroll-button">
                            <img src="/icons/scroll-button.svg" />
                          </div>{" "}
                          <button className="item-content">
                            <div className="content-header">
                              <div className="header-left">
                                {value.isEditTitle ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <div style={{ maxWidth: "100px" }}>
                                      <TextField
                                        id="standard-basic"
                                        label={
                                          value.panelTitle == ""
                                            ? panelTitleText
                                            : value.panelTitle
                                        }
                                        variant="standard"
                                        value={panelTitleText}
                                        onChange={(e) =>
                                          setpanelTitleText(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div
                                      onClick={(e) => {
                                        //openEditPart(value.OrderId, props.key, value.contactDataId,  value.BankDataId , value.documentDataFormId, value.belgeDocumentId);
                                        value.type == "conatctAddForm"
                                          ? contactEditTitlePanel()
                                          : value.type == "bankform"
                                          ? bankEditTitlePanel()
                                          : value.type == "documentForm"
                                          ? documentEditTitlePanel()
                                          : value.type == "uploadFileDocument"
                                          ? FileUploadEditTitlePanel()
                                          : value.type == "urlLinkPanel"
                                          ? profileUrlEditTitlePanel()
                                          : "";

                                        ChangeTitleText(
                                          value.OrderId,
                                          props.key,
                                          value.contactDataId,
                                          value.BankDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId,
                                          value.panelTitle
                                        );
                                      }}
                                      style={{
                                        justifyContent: "center",
                                        textAlign: "center",
                                        margin: "auto",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9C20 7.89543 19.1046 7 18 7H13C12.0557 7 11.1666 6.55542 10.6 5.8L9.55 4.4C9.36115 4.14819 9.06476 4 8.75 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.75C9.69427 2 10.5834 2.44458 11.15 3.2L12.2 4.6C12.3889 4.85181 12.6852 5 13 5H18C20.2091 5 22 6.79086 22 9V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                                          fill="#8B8DFF"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M15.6839 11.2705C16.0868 11.6482 16.1072 12.281 15.7295 12.6839L11.9795 16.6839C11.6213 17.0661 11.0289 17.107 10.6215 16.7778L8.37145 14.9596C7.94189 14.6125 7.87506 13.9829 8.22218 13.5533C8.5693 13.1237 9.19893 13.0569 9.62849 13.404L11.1559 14.6383L14.2704 11.3161C14.6482 10.9131 15.281 10.8927 15.6839 11.2705Z"
                                          fill="#8B8DFF"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                ) : (
                                  <div style={{ display: "flex" }}>
                                    <div className="header-text">
                                      {value.panelTitle == ""
                                        ? "Başlık"
                                        : value.panelTitle}
                                      {/* {props.key} */}
                                    </div>

                                    <div
                                      style={{
                                        justifyContent: "center",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        openEditPart(
                                          value.OrderId,
                                          props.key,
                                          value.contactDataId,
                                          value.BankDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId,
                                          value.panelTitle
                                        );
                                        console.log(
                                          "getid:",
                                          value.documentDataFormId
                                        );
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        background="rgba(0, 0, 0, 0.5)"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12.0118 3.33333C11.8381 3.33333 11.6715 3.40233 11.5487 3.52516L4.28338 10.7904C4.02706 11.0468 3.84522 11.3679 3.7573 11.7196L3.58293 12.4171L4.28044 12.2427C4.6321 12.1548 4.95326 11.973 5.20958 11.7166L12.4749 4.45136C12.5357 4.39055 12.5839 4.31835 12.6168 4.23889C12.6497 4.15943 12.6667 4.07427 12.6667 3.98826C12.6667 3.90225 12.6497 3.81709 12.6168 3.73763C12.5839 3.65817 12.5357 3.58597 12.4749 3.52516C12.414 3.46434 12.3418 3.4161 12.2624 3.38319C12.1829 3.35027 12.0978 3.33333 12.0118 3.33333ZM10.6058 2.58235C10.9787 2.20948 11.4844 2 12.0118 2C12.2729 2 12.5314 2.05143 12.7726 2.15135C13.0139 2.25127 13.233 2.39772 13.4177 2.58235C13.6023 2.76697 13.7487 2.98616 13.8487 3.22739C13.9486 3.46861 14 3.72716 14 3.98826C14 4.24936 13.9486 4.50791 13.8487 4.74913C13.7487 4.99036 13.6023 5.20954 13.4177 5.39417L6.15239 12.6594C5.72519 13.0866 5.18993 13.3897 4.60382 13.5362L2.82837 13.9801C2.60119 14.0369 2.36086 13.9703 2.19528 13.8047C2.02969 13.6392 1.96312 13.3988 2.01992 13.1716L2.46378 11.3962C2.61031 10.8101 2.91337 10.2748 3.34057 9.84762L10.6058 2.58235Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M10.8618 7.13806L8.86182 5.13806L9.80463 4.19525L11.8046 6.19525L10.8618 7.13806Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M8 13.3334C8 12.9652 8.29848 12.6667 8.66667 12.6667L13.3333 12.6667C13.7015 12.6667 14 12.9652 14 13.3334C14 13.7015 13.7015 14 13.3333 14L8.66667 14C8.29848 14 8 13.7015 8 13.3334Z"
                                          fill="black"
                                          fill-opacity="0.5"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                                {/* <img src="/icons/Edit-888888.svg" />{" "} */}
                                <div
                                  className="header-url"
                                  onClick={() =>
                                    PanelOpen(
                                      value.OrderId,
                                      value.accountOwner,
                                      value.bankIban,
                                      value.bankName,
                                      value.bankStation,
                                      value.BankDataId,
                                      value.type,
                                      props.key,

                                      value.profileCity,
                                      value.profileCountry,
                                      value.profileNot,
                                      value.profilePosition,
                                      value.panelPhoneNumbers,
                                      value.panelEmailPostas,

                                      value.publicName,
                                      value.publicOrganization,
                                      value.publicsurname,
                                      value.streetAdress,
                                      value.contactDataId,

                                      value.statusNameSurname,
                                      value.statusEmail,
                                      value.statusTelefon,
                                      value.statusMessage,
                                      value.emailToSend,
                                      value.publicstreetAdress,
                                      value.publicDropNot,
                                      value.documentDataFormId,

                                      value.belgeDocument,
                                      value.belgeDocumentId,
                                      value.panelUrlLink,
                                      value.panelProfileUrlDataId
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {value.type == "conatctAddForm" ? (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8ZM8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11.9998 17C9.44261 17 7.2567 18.6001 6.39342 20.8572L4.52539 20.1428C5.67496 17.1371 8.58655 15 11.9998 15C15.413 15 18.3246 17.1371 19.4742 20.1428L17.6061 20.8572C16.7429 18.6001 14.5569 17 11.9998 17Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>
                                  ) : value.type == "bankform" ? (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M11 12C11 9.79086 12.7909 8 15 8H20C21.1046 8 22 8.89543 22 10V14C22 15.1046 21.1046 16 20 16H15C12.7909 16 11 14.2091 11 12ZM15 10C13.8954 10 13 10.8954 13 12C13 13.1046 13.8954 14 15 14H20V10H15Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M14 12C14 11.4477 14.4477 11 15 11L15.1 11C15.6523 11 16.1 11.4477 16.1 12C16.1 12.5523 15.6523 13 15.1 13L15 13C14.4477 13 14 12.5523 14 12Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>
                                  ) : value.type == "documentForm" ? (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 9C8 8.44772 8.44772 8 9 8H10C10.5523 8 11 8.44772 11 9C11 9.55228 10.5523 10 10 10H9C8.44772 10 8 9.55228 8 9Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8 4C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V8.82843C18 8.56321 17.8946 8.30886 17.7071 8.12132L13.8787 4.29289C13.6911 4.10536 13.4368 4 13.1716 4H8ZM4 6C4 3.79086 5.79086 2 8 2H13.1716C13.9672 2 14.7303 2.31607 15.2929 2.87868L19.1213 6.70711C19.6839 7.26972 20 8.03278 20 8.82843V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V6Z"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M14 3V5C14 6.65685 15.3431 8 17 8H19V10H17C14.2386 10 12 7.76142 12 5V3H14Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>
                                  ) : value.type == "uploadFileDocument" ? (
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9.375C20 8.27043 19.1046 7.375 18 7.375H13.0704C12.0673 7.375 11.1306 6.8737 10.5742 6.0391L9.51168 4.4453C9.32622 4.1671 9.01399 4 8.67963 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.67963C9.68269 2 10.6194 2.5013 11.1758 3.3359L12.2383 4.9297C12.4238 5.2079 12.736 5.375 13.0704 5.375H18C20.2091 5.375 22 7.16586 22 9.375V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                                        fill="#8B8DFF"
                                      />
                                    </svg>
                                  ) : editUrlProfile ? (
                                    <div style={{ display: "flex" }}>
                                      <div>
                                        <TextField
                                          id="standard-basic"
                                          variant="standard"
                                          label="URL Linki"
                                          value={profileUrlPanel}
                                          onChange={(e) =>
                                            setprofileUrlPanel(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          justifyContent: "center",
                                          marginLeft: "10px",
                                          cursor: "pointer",
                                          marginTop: "auto",
                                        }}
                                        onClick={(e) => {
                                          updateProfileUrlLinkData(e);
                                          setEditUrlProfile(false);
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V9C20 7.89543 19.1046 7 18 7H13C12.0557 7 11.1666 6.55542 10.6 5.8L9.55 4.4C9.36115 4.14819 9.06476 4 8.75 4H6ZM2 6C2 3.79086 3.79086 2 6 2H8.75C9.69427 2 10.5834 2.44458 11.15 3.2L12.2 4.6C12.3889 4.85181 12.6852 5 13 5H18C20.2091 5 22 6.79086 22 9V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6Z"
                                            fill="#8B8DFF"
                                          />
                                          <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M15.6839 11.2705C16.0868 11.6482 16.1072 12.281 15.7295 12.6839L11.9795 16.6839C11.6213 17.0661 11.0289 17.107 10.6215 16.7778L8.37145 14.9596C7.94189 14.6125 7.87506 13.9829 8.22218 13.5533C8.5693 13.1237 9.19893 13.0569 9.62849 13.404L11.1559 14.6383L14.2704 11.3161C14.6482 10.9131 15.281 10.8927 15.6839 11.2705Z"
                                            fill="#8B8DFF"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={() => {
                                        setEditUrlProfile(true);
                                        setprofileUrlDataId(
                                          value.panelProfileUrlDataId
                                        );
                                      }}
                                    >
                                      <svg
                                        width="27"
                                        height="27"
                                        viewBox="0 0 27 27"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M13.5554 4.55547C8.64625 4.55547 4.66656 8.53517 4.66656 13.4444C4.66656 18.3536 8.64625 22.3333 13.5554 22.3333C18.4646 22.3333 22.4443 18.3536 22.4443 13.4444C22.4443 8.53517 18.4646 4.55547 13.5554 4.55547ZM2.44434 13.4444C2.44434 7.30787 7.41895 2.33325 13.5554 2.33325C19.6919 2.33325 24.6666 7.30787 24.6666 13.4444C24.6666 19.5809 19.6919 24.5555 13.5554 24.5555C7.41895 24.5555 2.44434 19.5809 2.44434 13.4444Z"
                                          fill="#ABCAFF"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M11.4282 6.82456C10.7006 8.46167 10.2222 10.8012 10.2222 13.4444C10.2222 16.0875 10.7006 18.4271 11.4282 20.0642C11.7926 20.8841 12.1978 21.4789 12.5916 21.8536C12.9796 22.2229 13.3034 22.3333 13.5556 22.3333C13.8077 22.3333 14.1315 22.2229 14.5196 21.8536C14.9133 21.4789 15.3185 20.8841 15.6829 20.0642C16.4105 18.4271 16.8889 16.0875 16.8889 13.4444C16.8889 10.8012 16.4105 8.46167 15.6829 6.82456C15.3185 6.0046 14.9133 5.40984 14.5196 5.0351C14.1315 4.66581 13.8077 4.55547 13.5556 4.55547C13.3034 4.55547 12.9796 4.66581 12.5916 5.0351C12.1978 5.40984 11.7926 6.0046 11.4282 6.82456ZM11.0596 3.42533C11.735 2.78256 12.5804 2.33325 13.5556 2.33325C14.5307 2.33325 15.3761 2.78256 16.0515 3.42533C16.7212 4.06265 17.2737 4.93234 17.7136 5.92203C18.5946 7.90421 19.1111 10.5647 19.1111 13.4444C19.1111 16.324 18.5946 18.9845 17.7136 20.9667C17.2737 21.9564 16.7212 22.8261 16.0515 23.4634C15.3761 24.1062 14.5307 24.5555 13.5556 24.5555C12.5804 24.5555 11.735 24.1062 11.0596 23.4634C10.3899 22.8261 9.83737 21.9564 9.39751 20.9667C8.51654 18.9845 8 16.324 8 13.4444C8 10.5647 8.51654 7.90421 9.39751 5.92203C9.83737 4.93234 10.3899 4.06265 11.0596 3.42533Z"
                                          fill="#ABCAFF"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M13.7315 17.8888C10.0786 17.8888 6.99492 18.748 5.29608 19.9156L4.03735 18.0843C6.2361 16.573 9.81726 15.6666 13.7315 15.6666C17.4271 15.6666 20.8116 16.4739 23.0233 17.8238L21.8656 19.7206C20.1095 18.6488 17.1654 17.8888 13.7315 17.8888Z"
                                          fill="#ABCAFF"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M13.6266 11.2221C9.75397 11.2221 6.20929 10.3149 4.03223 8.80105L5.30089 6.97656C6.97638 8.14162 10.0195 8.99992 13.6266 8.99992C17.1428 8.99992 20.1293 8.18396 21.8315 7.0585L23.0571 8.91219C20.8719 10.357 17.409 11.2221 13.6266 11.2221Z"
                                          fill="#ABCAFF"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              </div>{" "}
                              <div className="header-right">
                                <div className="header-switch">
                                  <div className="switch-button ">
                                    <label
                                      className="switch"
                                      value={
                                        value.type == "bankform"
                                          ? bankstatueMode
                                          : value.type == "conatctAddForm"
                                          ? contactstatueMode
                                          : value.type == "documentForm"
                                          ? documentstatueMode
                                          : value.type == "uploadFileDocument"
                                          ? uploadFileStatueModeSecond
                                          : ""
                                      }
                                      onChange={(e) =>
                                        OpenStatus(
                                          value.OrderId,
                                          props.key,
                                          !value.statueMode,
                                          value.BankDataId,
                                          value.contactDataId,
                                          value.documentDataFormId,
                                          value.belgeDocumentId,
                                          value.panelProfileUrlDataId
                                        )
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={value.statueMode}
                                      />{" "}
                                      <span className="slider round"> </span>{" "}
                                    </label>{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                            <div className="footer">
                              <div className="footer-left">
                                <div className="icon">
                                  {" "}
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V7C20 5.34315 18.6569 4 17 4H7Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8 13C8.55228 13 9 13.4477 9 14V16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16L7 14C7 13.4477 7.44772 13 8 13Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M16 7C16.5523 7 17 7.44772 17 8L17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16L15 8C15 7.44772 15.4477 7 16 7Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12 10C12.5523 10 13 10.4477 13 11L13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16L11 11C11 10.4477 11.4477 10 12 10Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                </div>{" "}
                                <div className="text">
                                  {" "}
                                  0 (Tıklanma Sayısı){" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="footer-right">
                                <div
                                  onClick={() =>
                                    DeletePanelOpen(
                                      value.OrderId,
                                      props.key,

                                      value.BankDataId,
                                      value.contactDataId,
                                      value.documentDataFormId,
                                      value.belgeDocumentId,
                                      value.panelProfileUrlDataId
                                    )
                                  }
                                  className="trash"
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                      fill="black"
                                      fill-opacity="0.5"
                                    />
                                  </svg>
                                </div>{" "}
                              </div>{" "}
                            </div>{" "}
                          </button>{" "}
                        </div>{" "}
                        {value.type == "conatctAddForm" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> İletişim Bilgileri </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">
                                  Ziyaretçilerinizin ileteceği mesajların
                                  içeriğini ne olacağını düzenleyebilirsiniz.{" "}
                                  <div className="two-input-area">
                                    <input
                                      className=""
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="İsim"
                                      value={publicName}
                                      onChange={(e) =>
                                        setpublicName(e.target.value)
                                      }
                                    />{" "}
                                    <div className="input-space"> </div>{" "}
                                    <input
                                      id="grid-last-name"
                                      type="text"
                                      placeholder="Soyisim"
                                      value={publicsurname}
                                      onChange={(e) =>
                                        setpublicsurname(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="panel-input">
                                    <input
                                      id="grid-password"
                                      type="text"
                                      placeholder="Organizasyon"
                                      value={publicOrganization}
                                      onChange={(e) =>
                                        setpublicOrganization(e.target.value)
                                      }
                                    />{" "}
                                  </div>
                                  <div className="panel-input">
                                    <input
                                      id="grid-password"
                                      type="text"
                                      placeholder="Pozisyon"
                                      value={profilePosition}
                                      onChange={(e) =>
                                        setprofilePosition(e.target.value)
                                      }
                                    />{" "}
                                  </div>
                                  {telefonInputServ.map(
                                    (singleTelefonInput, index) => (
                                      <div
                                        className="select-input-area"
                                        key={index}
                                      >
                                        <PhoneInput
                                          id="grid-zip"
                                          name="phoneNumber"
                                          className="phoneInputu"
                                          type="text"
                                          country={"tr"}
                                          value={singleTelefonInput.phoneNumber}
                                          onChange={(e) =>
                                            handlePhoneList(e, index)
                                          }
                                          fullWidth
                                        />

                                        <div
                                          className="input-space"
                                          style={{ width: "5px" }}
                                        >
                                          {" "}
                                        </div>

                                        {telefonInputServ.length - 1 ===
                                          index && (
                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={addPhoneInputHandle}
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove "
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#FFFF",
                                                border: "none",
                                              }}
                                            >
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                                                  fill="#8B8DFF"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
                                                  fill="#8B8DFF"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        )}

                                        {telefonInputServ.length - 1 !==
                                          index && (
                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={() =>
                                              removeInputPhoneHandle(index)
                                            }
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove"
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#ffff",
                                                border: "none",
                                              }}
                                            >
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                  {emailInputServ.map(
                                    (singleEmailInput, index) => (
                                      <div
                                        className="select-input-area"
                                        key={index}
                                      >
                                        <input
                                          id="grid-zip"
                                          name="emailPosta"
                                          type="email"
                                          placeholder="Email"
                                          value={singleEmailInput.emailPosta}
                                          onChange={(e) =>
                                            handleEmailList(e, index)
                                          }
                                        />

                                        <div
                                          className="input-space"
                                          style={{ width: "5px" }}
                                        >
                                          {" "}
                                        </div>

                                        {emailInputServ.length - 1 ===
                                          index && (
                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={addEmailInputHandle}
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove "
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#FFFF",
                                                border: "none",
                                              }}
                                            >
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12Z"
                                                  fill="#8B8DFF"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M12 3C12.5523 3 13 3.44772 13 4L13 20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20L11 4C11 3.44772 11.4477 3 12 3Z"
                                                  fill="#8B8DFF"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        )}

                                        {emailInputServ.length - 1 !==
                                          index && (
                                          <div
                                            className="panel-input"
                                            style={{ margin: "auto" }}
                                            onClick={() =>
                                              removeInputEmailHandle(index)
                                            }
                                          >
                                            <button
                                              className="global-button content-buttons-item primary-buttonaddRemove"
                                              style={{
                                                margin: "auto",
                                                padding: "7px",
                                                background: "#ffff",
                                                border: "none",
                                              }}
                                            >
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6H5C4.44772 6 4 5.55228 4 5Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M8.77778 3.33334C8.77778 2.59695 9.37473 2 10.1111 2L13.8889 2C14.6253 2 15.2222 2.59696 15.2222 3.33334C15.2222 3.70153 15.5207 4 15.8889 4H16V6H15.8889C14.6463 6 13.6023 5.15015 13.3062 4L10.6938 4C10.3977 5.15015 9.35367 6 8.11111 6H8V4L8.11111 4C8.4793 4 8.77778 3.70153 8.77778 3.33334Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                                <path
                                                  fill-rule="evenodd"
                                                  clip-rule="evenodd"
                                                  d="M5.91701 8.00345C6.46739 7.95759 6.95074 8.36658 6.9966 8.91695L7.76736 18.1661C7.85374 19.2027 8.72028 20 9.76045 20H14.2397C15.2798 20 16.1464 19.2027 16.2327 18.1661L17.0035 8.91695C17.0494 8.36658 17.5327 7.95759 18.0831 8.00345C18.6335 8.04932 19.0425 8.53267 18.9966 9.08305L18.2258 18.3322C18.0531 20.4054 16.32 22 14.2397 22H9.76045C7.6801 22 5.94704 20.4054 5.77427 18.3322L5.00351 9.08305C4.95765 8.53267 5.36663 8.04932 5.91701 8.00345Z"
                                                  fill="black"
                                                  fill-opacity="0.5"
                                                />
                                              </svg>
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                  {/* text area from here */}{" "}
                                  <div className="panel-input">
                                    <textarea
                                      value={streetAdress}
                                      onChange={(e) =>
                                        setstreetAdress(e.target.value)
                                      }
                                      placeholder="Sokak Adresi"
                                    ></textarea>{" "}
                                  </div>
                                  <div className="two-input-area">
                                    <select
                                      id="grid-state"
                                      value={profileCountry}
                                      onChange={(e) =>
                                        setprofileCountry(e.target.value)
                                      }
                                    >
                                      {Country.getAllCountries().map(
                                        (name, index) => {
                                          return (
                                            <option key={index}>
                                              {" "}
                                              {name.name}{" "}
                                            </option>
                                          );
                                        }
                                      )}

                                    </select>{" "}
                                    <div className="input-space"> </div>{" "}
                                    <select
                                      id="grid-state"
                                      value={profileCity}
                                      onChange={(e) => {
                                        setprofileCity(e.target.value);
                                      }}
                                    >
                                      {City.getCitiesOfCountry(coutryCity).map(
                                        (name, index) => {
                                          return (
                                            <option key={index}>
                                              {" "}
                                              {name.name}{" "}
                                            </option>
                                          );
                                        }
                                      )}{" "}
                                    </select>{" "}
                                  </div>
                                  <div className="panel-input">
                                    <textarea
                                      value={profileNot}
                                      onChange={(e) =>
                                        setprofileNot(e.target.value)
                                      }
                                      placeholder="Not Ekle"
                                    ></textarea>{" "}
                                  </div>
                                  <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      onClick={
                                        contactDataId != undefined
                                          ? updateContactData
                                          : postContactData
                                      }
                                    >
                                      {contactDataId != undefined
                                        ? "Güncelle"
                                        : "kaydet"}{" "}
                                    </button>{" "}
                                  </div>
                                </div>{" "}
                              </div>{" "}
                            </button>
                            {/* delete page heer */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    //onClick={delteContactData}
                                    onClick={() => {
                                      RemovePanelRemoveConatct(
                                        panels,
                                        props.key
                                      );
                                      delteContactData();
                                     
                                    }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>
                          </div>
                        ) : value.type == "bankform" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text">
                                  {" "}
                                  Banka Hesap Bilgileri{" "}
                                </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">
                                  Banka hesap bilgilerinizi bu alandaki uygun
                                  yerleri doldurarak ziyaretçilerinize
                                  sergileyebilirsiniz.{" "}
                                  <div className="panel-input">
                                    <input
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="Heasp sahibinin Adı Soyadı"
                                      value={accountOwner}
                                      onChange={(e) =>
                                        setaccountOwner(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="two-input-area">
                                    <input
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="Banka"
                                      value={bankName}
                                      onChange={(e) =>
                                        setbankName(e.target.value)
                                      }
                                    />{" "}
                                    <div className="input-space"> </div>{" "}
                                    <input
                                      id="grid-last-name"
                                      type="text"
                                      placeholder="Şube"
                                      value={bankStation}
                                      onChange={(e) =>
                                        setbankStation(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="panel-input">
                                    {/* <input
                                      id="grid-first-name"
                                      type="text"
                                      placeholder="Iban"
                                      value={bankIban}
                                      onChange={(e) =>
                                        setbankIban(e.target.value)
                                      }
                                    /> */}

                                    <IbanInput  onChange={onChange} value={bankIban}/>

  
                                  </div>
                                  <div> </div>
                                  <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      onClick={
                                        BankDataId != undefined
                                          ? updateBankData
                                          : postBankData
                                      }
                                    >
                                      {BankDataId != undefined
                                        ? "Gücelle"
                                        : "Kaydet"}{" "}
                                    </button>{" "}
                                  </div>
                                </div>{" "}
                              </div>{" "}
                            </button>
                            {/* //delete bank */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")

                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteBankData();
                                      RemovePanelRemoveBanka( panels,
                                        props.key);
                                       
                                    }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>{" "}
                          </div>
                        ) : value.type == "documentForm" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> İletişim Formu </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">
                                  <div style={{
                                    color: "#808080",
                                    padding: "10px 0",
                                    fontSize: "16px",
                                    textAlign: "left",
                                    fontWeight: "bold"
                                  }}>

Direkt mesaj Alanı
                                  {/* Ziyaretçilerinizin ileteceği mesajların
                                  içeriğini ne olacağını düzenleyebilirsiniz. */}

                                  </div>
                                  
                                  <div className="panel-switch-area">
                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        İsim soyİsim{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusNameSurname}
                                          onChange={(e) => {
                                            setstatusNameSurname(
                                              !statusNameSurname
                                            );
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusNameSurname}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* email adres */}

                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        Email{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusEmail}
                                          onChange={(e) => {
                                            setstatusEmail(!statusEmail);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusEmail}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* Telefon  */}

                                    <div className="panel-switch-item">
                                      <div className="switch-header">
                                        Telefon{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusTelefon}
                                          onChange={(e) => {
                                            setstatusTelefon(!statusTelefon);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusTelefon}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>

                                    {/* mesaj send */}

                                    <div className="panel-switch-item" style={{
                                      marginBottom:"20px"
                                    }}>
                                      <div className="switch-header">
                                        Mesaj Alanı{" "}
                                      </div>
                                      <div className="switch-button">
                                        <label
                                          className="switch"
                                          value={statusMessage}
                                          onChange={(e) => {
                                            setstatusMessage(!statusMessage);
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={statusMessage}
                                          />{" "}
                                          <span className="slider round"></span>{" "}
                                        </label>{" "}
                                      </div>{" "}
                                    </div>
                                  </div>
                                  <div className="panel-inner-content-header">
                                    Mesaj Nereye İletilsin ?
                                  </div>{" "}
                                  <div className="panel-inner-content-subtext">
                                    Lütfen ziyaretçilerinizin göndereceği
                                    mesajların iletileceği mail adresini
                                    yazınız.
                                  </div>
                                  <div>
                                    <form className="w-full max-w-lg m-auto">
                                      <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="panel-input">
                                          <input
                                            id="grid-first-name"
                                            type="email"
                                            placeholder="E-Posta"
                                            value={emailToSend}
                                            onChange={(e) =>
                                              setemailToSend(e.target.value)
                                            }
                                          />{" "}
                                        </div>{" "}
                                      </div>
                                      {/* text area from here */}
                                      <div className="panel-inner-content-subtext">
                                        Ziyaretçilerin için bu bölüme açıklama
                                        ve teşekkür mesajı ekleyebilirsin.
                                      </div>{" "}
                                      <div className="panel-input">
                                        <textarea
                                          value={publicstreetAdress}
                                          onChange={(e) =>
                                            setpublicstreetAdress(
                                              e.target.value
                                            )
                                          }
                                          placeholder="Açıklama "
                                        ></textarea>
                                      </div>
                                      <div className="panel-input">
                                        <br />
                                        <textarea
                                          value={publicDropNot}
                                          onChange={(e) =>
                                            setpublicDropNot(e.target.value)
                                          }
                                          placeholder="Teşekkür Mesajı"
                                        ></textarea>{" "}
                                      </div>
                                      <div className="panel-input">
                                        <button
                                          className="global-button content-buttons-item primary-button"
                                          onClick={
                                            documentDataFormId != undefined
                                              ? updateDoumentData
                                              : postDocument
                                          }
                                        >
                                          {documentDataFormId != undefined
                                            ? "Güncelle"
                                            : "Kaydet"}{" "}
                                        </button>{" "}
                                      </div>
                                    </form>{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>
                            {/* delet button */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteDocumentData();
                                      RemovePanelRemoveDocumentForm(
                                        panels,
                                        props.key
                                      );
                                     
                                    }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>{" "}
                          </div>
                        ) : value.type == "uploadFileDocument" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isOpen == true ? "p-open" : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Belge Yükle </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() => PanelOpen(value.OrderId)}
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div className="panel-inner-content-info">
                                  Sergilemek istediğiniz belgeleri buradan
                                  yükleyebilirsiniz.{" "}
                                  {/* <div className="panel-input">
                                    <input
                                      id="grid-first-name"
                                      type="file"
                                      placeholder="Belge Yükle"
                                      onChange={handleFileUploadChange}
                                    />
                                  </div> */}
                                  <div
                                    className="panel-input"
                                    style={{
                                      justifyContent: "center",
                                      marginTop: "10px",
                                      cursor: "pointer",
                                    }}
                                    // onClick={
                                    //   belgeDocumentId != undefined
                                    //     ? uploadChangeFiles
                                    //     : handleUploadFile
                                    // }
                                    onClick={(e) => handleEditPicture(e)}
                                  >
                                    <svg
                                      width="288"
                                      height="45"
                                      viewBox="0 0 288 45"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <rect
                                        width="288"
                                        height="45"
                                        rx="10"
                                        fill="#8B8DFF"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M44 23C44 17.4772 48.4772 13 54 13C59.5228 13 64 17.4772 64 23C64 28.5228 59.5228 33 54 33C48.4772 33 44 28.5228 44 23ZM54 15C49.5817 15 46 18.5817 46 23C46 27.4183 49.5817 31 54 31C58.4183 31 62 27.4183 62 23C62 18.5817 58.4183 15 54 15Z"
                                        fill="white"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M54 18C54.5523 18 55 18.4477 55 19V22H58C58.5523 22 59 22.4477 59 23C59 23.5523 58.5523 24 58 24H55V27C55 27.5523 54.5523 28 54 28C53.4477 28 53 27.5523 53 27V24H50C49.4477 24 49 23.5523 49 23C49 22.4477 49.4477 22 50 22H53V19C53 18.4477 53.4477 18 54 18Z"
                                        fill="white"
                                      />
                                      <path
                                        d="M83.761 23.268C84.281 23.4327 84.6883 23.71 84.983 24.1C85.2777 24.4813 85.425 24.9537 85.425 25.517C85.425 26.3143 85.113 26.9297 84.489 27.363C83.8737 27.7877 82.9723 28 81.785 28H77.079V18.9H81.525C82.6343 18.9 83.4837 19.1123 84.073 19.537C84.671 19.9617 84.97 20.538 84.97 21.266C84.97 21.708 84.8617 22.1023 84.645 22.449C84.437 22.7957 84.1423 23.0687 83.761 23.268ZM79.172 20.486V22.631H81.265C81.785 22.631 82.1793 22.54 82.448 22.358C82.7167 22.176 82.851 21.9073 82.851 21.552C82.851 21.1967 82.7167 20.9323 82.448 20.759C82.1793 20.577 81.785 20.486 81.265 20.486H79.172ZM81.629 26.414C82.1837 26.414 82.5997 26.323 82.877 26.141C83.163 25.959 83.306 25.6773 83.306 25.296C83.306 24.542 82.747 24.165 81.629 24.165H79.172V26.414H81.629ZM93.7274 24.529C93.7274 24.555 93.7144 24.737 93.6884 25.075H88.3974C88.4928 25.5083 88.7181 25.8507 89.0734 26.102C89.4288 26.3533 89.8708 26.479 90.3994 26.479C90.7634 26.479 91.0841 26.427 91.3614 26.323C91.6474 26.2103 91.9118 26.037 92.1544 25.803L93.2334 26.973C92.5748 27.727 91.6128 28.104 90.3474 28.104C89.5588 28.104 88.8611 27.9523 88.2544 27.649C87.6478 27.337 87.1798 26.908 86.8504 26.362C86.5211 25.816 86.3564 25.1963 86.3564 24.503C86.3564 23.8183 86.5168 23.203 86.8374 22.657C87.1668 22.1023 87.6131 21.6733 88.1764 21.37C88.7484 21.058 89.3854 20.902 90.0874 20.902C90.7721 20.902 91.3918 21.0493 91.9464 21.344C92.5011 21.6387 92.9344 22.0633 93.2464 22.618C93.5671 23.164 93.7274 23.801 93.7274 24.529ZM90.1004 22.436C89.6411 22.436 89.2554 22.566 88.9434 22.826C88.6314 23.086 88.4408 23.4413 88.3714 23.892H91.8164C91.7471 23.45 91.5564 23.099 91.2444 22.839C90.9324 22.5703 90.5511 22.436 90.1004 22.436ZM95.0776 18.354H97.1056V28H95.0776V18.354ZM106.203 21.006V26.83C106.203 28.1127 105.869 29.066 105.202 29.69C104.534 30.314 103.559 30.626 102.277 30.626C101.601 30.626 100.959 30.5437 100.353 30.379C99.7461 30.2143 99.2434 29.976 98.8448 29.664L99.6508 28.208C99.9454 28.4507 100.318 28.6413 100.769 28.78C101.219 28.9273 101.67 29.001 102.121 29.001C102.823 29.001 103.338 28.8407 103.668 28.52C104.006 28.208 104.175 27.7313 104.175 27.09V26.791C103.646 27.3717 102.909 27.662 101.965 27.662C101.323 27.662 100.734 27.5233 100.197 27.246C99.6681 26.96 99.2478 26.5613 98.9358 26.05C98.6238 25.5387 98.4678 24.9493 98.4678 24.282C98.4678 23.6147 98.6238 23.0253 98.9358 22.514C99.2478 22.0027 99.6681 21.6083 100.197 21.331C100.734 21.045 101.323 20.902 101.965 20.902C102.979 20.902 103.75 21.2357 104.279 21.903V21.006H106.203ZM102.368 25.998C102.905 25.998 103.343 25.842 103.681 25.53C104.027 25.2093 104.201 24.7933 104.201 24.282C104.201 23.7707 104.027 23.359 103.681 23.047C103.343 22.7263 102.905 22.566 102.368 22.566C101.83 22.566 101.388 22.7263 101.042 23.047C100.695 23.359 100.522 23.7707 100.522 24.282C100.522 24.7933 100.695 25.2093 101.042 25.53C101.388 25.842 101.83 25.998 102.368 25.998ZM114.941 24.529C114.941 24.555 114.928 24.737 114.902 25.075H109.611C109.707 25.5083 109.932 25.8507 110.287 26.102C110.643 26.3533 111.085 26.479 111.613 26.479C111.977 26.479 112.298 26.427 112.575 26.323C112.861 26.2103 113.126 26.037 113.368 25.803L114.447 26.973C113.789 27.727 112.827 28.104 111.561 28.104C110.773 28.104 110.075 27.9523 109.468 27.649C108.862 27.337 108.394 26.908 108.064 26.362C107.735 25.816 107.57 25.1963 107.57 24.503C107.57 23.8183 107.731 23.203 108.051 22.657C108.381 22.1023 108.827 21.6733 109.39 21.37C109.962 21.058 110.599 20.902 111.301 20.902C111.986 20.902 112.606 21.0493 113.16 21.344C113.715 21.6387 114.148 22.0633 114.46 22.618C114.781 23.164 114.941 23.801 114.941 24.529ZM111.314 22.436C110.855 22.436 110.469 22.566 110.157 22.826C109.845 23.086 109.655 23.4413 109.585 23.892H113.03C112.961 23.45 112.77 23.099 112.458 22.839C112.146 22.5703 111.765 22.436 111.314 22.436ZM126.915 21.006L123.756 28.429C123.435 29.235 123.037 29.8027 122.56 30.132C122.092 30.4613 121.524 30.626 120.857 30.626C120.493 30.626 120.133 30.5697 119.778 30.457C119.423 30.3443 119.132 30.1883 118.907 29.989L119.648 28.546C119.804 28.6847 119.982 28.793 120.181 28.871C120.389 28.949 120.593 28.988 120.792 28.988C121.069 28.988 121.295 28.9187 121.468 28.78C121.641 28.65 121.797 28.429 121.936 28.117L121.962 28.052L118.933 21.006H121.026L122.989 25.751L124.965 21.006H126.915ZM134.789 21.006V28H132.865V27.168C132.596 27.4713 132.275 27.7053 131.903 27.87C131.53 28.026 131.127 28.104 130.694 28.104C129.775 28.104 129.047 27.8397 128.51 27.311C127.972 26.7823 127.704 25.998 127.704 24.958V21.006H129.732V24.659C129.732 25.7857 130.204 26.349 131.149 26.349C131.634 26.349 132.024 26.193 132.319 25.881C132.613 25.5603 132.761 25.088 132.761 24.464V21.006H134.789ZM129.927 20.044C129.667 20.044 129.45 19.9617 129.277 19.797C129.103 19.6237 129.017 19.407 129.017 19.147C129.017 18.887 129.103 18.6747 129.277 18.51C129.45 18.3367 129.667 18.25 129.927 18.25C130.187 18.25 130.399 18.3367 130.564 18.51C130.737 18.6747 130.824 18.887 130.824 19.147C130.824 19.407 130.737 19.6237 130.564 19.797C130.399 19.9617 130.187 20.044 129.927 20.044ZM132.553 20.044C132.293 20.044 132.076 19.9617 131.903 19.797C131.738 19.6237 131.656 19.407 131.656 19.147C131.656 18.887 131.738 18.6747 131.903 18.51C132.076 18.3367 132.293 18.25 132.553 18.25C132.813 18.25 133.029 18.3367 133.203 18.51C133.376 18.6747 133.463 18.887 133.463 19.147C133.463 19.407 133.376 19.6237 133.203 19.797C133.029 19.9617 132.813 20.044 132.553 20.044ZM139.67 25.257L138.695 26.219V28H136.667V18.354H138.695V23.814L141.659 21.006H144.077L141.165 23.97L144.337 28H141.88L139.67 25.257ZM145.249 18.354H147.277V28H145.249V18.354ZM156.011 24.529C156.011 24.555 155.998 24.737 155.972 25.075H150.681C150.776 25.5083 151.001 25.8507 151.357 26.102C151.712 26.3533 152.154 26.479 152.683 26.479C153.047 26.479 153.367 26.427 153.645 26.323C153.931 26.2103 154.195 26.037 154.438 25.803L155.517 26.973C154.858 27.727 153.896 28.104 152.631 28.104C151.842 28.104 151.144 27.9523 150.538 27.649C149.931 27.337 149.463 26.908 149.134 26.362C148.804 25.816 148.64 25.1963 148.64 24.503C148.64 23.8183 148.8 23.203 149.121 22.657C149.45 22.1023 149.896 21.6733 150.46 21.37C151.032 21.058 151.669 20.902 152.371 20.902C153.055 20.902 153.675 21.0493 154.23 21.344C154.784 21.6387 155.218 22.0633 155.53 22.618C155.85 23.164 156.011 23.801 156.011 24.529ZM152.384 22.436C151.924 22.436 151.539 22.566 151.227 22.826C150.915 23.086 150.724 23.4413 150.655 23.892H154.1C154.03 23.45 153.84 23.099 153.528 22.839C153.216 22.5703 152.834 22.436 152.384 22.436ZM162.68 30.522C162.16 29.7333 161.757 28.819 161.471 27.779C161.194 26.739 161.055 25.6253 161.055 24.438C161.055 23.2507 161.194 22.137 161.471 21.097C161.757 20.0483 162.16 19.134 162.68 18.354H164.617C164.071 19.316 163.673 20.2953 163.421 21.292C163.17 22.28 163.044 23.3287 163.044 24.438C163.044 25.5473 163.17 26.6003 163.421 27.597C163.673 28.585 164.071 29.56 164.617 30.522H162.68ZM174.646 20.902C175.521 20.902 176.215 21.162 176.726 21.682C177.246 22.1933 177.506 22.9647 177.506 23.996V28H175.478V24.308C175.478 23.7533 175.361 23.3417 175.127 23.073C174.902 22.7957 174.577 22.657 174.152 22.657C173.675 22.657 173.298 22.813 173.021 23.125C172.744 23.4283 172.605 23.8833 172.605 24.49V28H170.577V24.308C170.577 23.2073 170.135 22.657 169.251 22.657C168.783 22.657 168.41 22.813 168.133 23.125C167.856 23.4283 167.717 23.8833 167.717 24.49V28H165.689V21.006H167.626V21.812C167.886 21.5173 168.202 21.292 168.575 21.136C168.956 20.98 169.372 20.902 169.823 20.902C170.317 20.902 170.763 21.0017 171.162 21.201C171.561 21.3917 171.881 21.6733 172.124 22.046C172.41 21.682 172.77 21.4003 173.203 21.201C173.645 21.0017 174.126 20.902 174.646 20.902ZM182.145 20.902C183.228 20.902 184.06 21.162 184.641 21.682C185.221 22.1933 185.512 22.969 185.512 24.009V28H183.614V27.129C183.232 27.779 182.522 28.104 181.482 28.104C180.944 28.104 180.476 28.013 180.078 27.831C179.688 27.649 179.389 27.3977 179.181 27.077C178.973 26.7563 178.869 26.3923 178.869 25.985C178.869 25.335 179.111 24.8237 179.597 24.451C180.091 24.0783 180.849 23.892 181.872 23.892H183.484C183.484 23.45 183.349 23.112 183.081 22.878C182.812 22.6353 182.409 22.514 181.872 22.514C181.499 22.514 181.131 22.5747 180.767 22.696C180.411 22.8087 180.108 22.9647 179.857 23.164L179.129 21.747C179.51 21.4783 179.965 21.2703 180.494 21.123C181.031 20.9757 181.581 20.902 182.145 20.902ZM181.989 26.739C182.335 26.739 182.643 26.661 182.912 26.505C183.18 26.3403 183.371 26.102 183.484 25.79V25.075H182.093C181.261 25.075 180.845 25.348 180.845 25.894C180.845 26.154 180.944 26.362 181.144 26.518C181.352 26.6653 181.633 26.739 181.989 26.739ZM190.35 25.257L189.375 26.219V28H187.347V18.354H189.375V23.814L192.339 21.006H194.757L191.845 23.97L195.017 28H192.56L190.35 25.257ZM198.054 28.104C197.473 28.104 196.905 28.0347 196.351 27.896C195.796 27.7487 195.354 27.5667 195.025 27.35L195.701 25.894C196.013 26.0933 196.39 26.258 196.832 26.388C197.274 26.5093 197.707 26.57 198.132 26.57C198.99 26.57 199.419 26.3577 199.419 25.933C199.419 25.7337 199.302 25.5907 199.068 25.504C198.834 25.4173 198.474 25.3437 197.989 25.283C197.417 25.1963 196.944 25.0967 196.572 24.984C196.199 24.8713 195.874 24.672 195.597 24.386C195.328 24.1 195.194 23.6927 195.194 23.164C195.194 22.722 195.319 22.332 195.571 21.994C195.831 21.6473 196.203 21.3787 196.689 21.188C197.183 20.9973 197.763 20.902 198.431 20.902C198.925 20.902 199.414 20.9583 199.9 21.071C200.394 21.175 200.801 21.3223 201.122 21.513L200.446 22.956C199.83 22.6093 199.159 22.436 198.431 22.436C197.997 22.436 197.672 22.4967 197.456 22.618C197.239 22.7393 197.131 22.8953 197.131 23.086C197.131 23.3027 197.248 23.4543 197.482 23.541C197.716 23.6277 198.088 23.71 198.6 23.788C199.172 23.8833 199.64 23.9873 200.004 24.1C200.368 24.204 200.684 24.399 200.953 24.685C201.221 24.971 201.356 25.3697 201.356 25.881C201.356 26.3143 201.226 26.7 200.966 27.038C200.706 27.376 200.324 27.6403 199.822 27.831C199.328 28.013 198.738 28.104 198.054 28.104ZM203.374 28.104C203.019 28.104 202.72 27.9827 202.477 27.74C202.234 27.4973 202.113 27.194 202.113 26.83C202.113 26.4573 202.234 26.1583 202.477 25.933C202.72 25.699 203.019 25.582 203.374 25.582C203.729 25.582 204.028 25.699 204.271 25.933C204.514 26.1583 204.635 26.4573 204.635 26.83C204.635 27.194 204.514 27.4973 204.271 27.74C204.028 27.9827 203.729 28.104 203.374 28.104ZM212.382 22.319C213.665 22.319 214.609 22.5747 215.216 23.086C215.831 23.5973 216.139 24.282 216.139 25.14C216.139 25.6947 216 26.2017 215.723 26.661C215.446 27.1117 215.021 27.4757 214.449 27.753C213.886 28.0217 213.188 28.156 212.356 28.156C211.715 28.156 211.082 28.0737 210.458 27.909C209.843 27.7357 209.318 27.493 208.885 27.181L209.717 25.569C210.064 25.829 210.462 26.0327 210.913 26.18C211.364 26.3187 211.827 26.388 212.304 26.388C212.833 26.388 213.249 26.284 213.552 26.076C213.855 25.868 214.007 25.5777 214.007 25.205C214.007 24.815 213.847 24.5203 213.526 24.321C213.214 24.1217 212.668 24.022 211.888 24.022H209.561L210.029 18.9H215.58V20.59H211.784L211.641 22.319H212.382ZM225.846 28L225.833 22.54L223.155 27.038H222.206L219.541 22.657V28H217.565V18.9H219.307L222.713 24.555L226.067 18.9H227.796L227.822 28H225.846ZM236.663 23.268C237.183 23.4327 237.591 23.71 237.885 24.1C238.18 24.4813 238.327 24.9537 238.327 25.517C238.327 26.3143 238.015 26.9297 237.391 27.363C236.776 27.7877 235.875 28 234.687 28H229.981V18.9H234.427C235.537 18.9 236.386 19.1123 236.975 19.537C237.573 19.9617 237.872 20.538 237.872 21.266C237.872 21.708 237.764 22.1023 237.547 22.449C237.339 22.7957 237.045 23.0687 236.663 23.268ZM232.074 20.486V22.631H234.167C234.687 22.631 235.082 22.54 235.35 22.358C235.619 22.176 235.753 21.9073 235.753 21.552C235.753 21.1967 235.619 20.9323 235.35 20.759C235.082 20.577 234.687 20.486 234.167 20.486H232.074ZM234.531 26.414C235.086 26.414 235.502 26.323 235.779 26.141C236.065 25.959 236.208 25.6773 236.208 25.296C236.208 24.542 235.649 24.165 234.531 24.165H232.074V26.414H234.531ZM238.973 30.522C239.519 29.56 239.917 28.585 240.169 27.597C240.429 26.6003 240.559 25.5473 240.559 24.438C240.559 23.3287 240.429 22.28 240.169 21.292C239.917 20.2953 239.519 19.316 238.973 18.354H240.91C241.438 19.1253 241.841 20.0353 242.119 21.084C242.405 22.124 242.548 23.242 242.548 24.438C242.548 25.634 242.409 26.752 242.132 27.792C241.854 28.8233 241.447 29.7333 240.91 30.522H238.973Z"
                                        fill="white"
                                      />
                                    </svg>

                                   
                                  </div>

                                  <div style={{display:"none"}}>
                                  <input
                                      type="file"
                                      id="imageInput"
                                      hidden="hidden"
                                      onChange={(e) => handleImageChange(e)}
                                    />
                                  </div>
                                  {/* <div className="panel-input">
                                    <button
                                      className="global-button content-buttons-item primary-button"
                                      
                                    >
                                      {belgeDocumentId != undefined
                                        ? "Güncelle"
                                        : "Kaydet"}{" "}
                                    </button>{" "}
                                  </div> */}
                                </div>{" "}
                              </div>{" "}
                            </button>
                            {/* delete form uploaded */}{" "}
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    onClick={() => {
                                      delteFileUploadData();
                                      RemovePanelRemoveFileUploadPdf(
                                        panels,
                                        props.key
                                      );
                                      
                                    }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>{" "}
                          </div>
                        ) : value.type == "urlLinkPanel" ? (
                          <div>
                            <button
                              className={
                                "panel-inner " +
                                (value.isDeleteOpen == true
                                  ? "p-open"
                                  : "p-close")
                              }
                            >
                              <div className="panel-inner-header">
                                <div className="text"> Sil </div>{" "}
                                <div
                                  className="close-icon"
                                  onClick={() =>
                                    DeletePanelOpen(value.OrderId, props.key)
                                  }
                                >
                                  {" "}
                                  <i className="fa-solid fa-xmark"> </i>{" "}
                                </div>{" "}
                              </div>{" "}
                              <div className="panel-inner-content">
                                <div
                                  className="panel-inner-content-info"
                                  style={{ textAlign: "center" }}
                                >
                                  Silmek istediğinizden emin misiniz ?
                                </div>{" "}
                                <div className="yes-no-buttons">
                                  <div
                                    className="global-button no-button"
                                    onClick={() =>
                                      DeletePanelOpen(value.OrderId, props.key)
                                    }
                                  >
                                    Hayır{" "}
                                  </div>{" "}
                                  <div className="yes-no-space "> </div>{" "}
                                  <div
                                    className="global-button yes-button"
                                    //onClick={delteContactData}
                                    onClick={() => {
                                      RemovePanelRemoveProfileUrl(
                                        panels,
                                        props.key
                                      );
                                      delteProfileUrlData();
                                      
                                    }}
                                  >
                                    Evet{" "}
                                  </div>{" "}
                                </div>{" "}
                              </div>{" "}
                            </button>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    }{" "}
                  </div>
                )}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <ProfilePageButton />
      </GlobalControllerLayout>{" "}
    </>
  );
}

export default Panel;
