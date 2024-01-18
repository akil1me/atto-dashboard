export function genData() {
  const nameList = [
    {
      id: 93,
      name: "agrobank",
      login: "Agrobank",
    },
    {
      id: 94,
      name: "alif",
      login: "Alif",
    },
    {
      id: 95,
      name: "aloqa",
      login: "Aloqa",
    },
    {
      id: 96,
      name: "aloqaColvir",
      login: "Aloqa Colvir",
    },
    {
      id: 119,
      name: "anorbank",
      login: "Anor Bank",
    },
    {
      id: 97,
      name: "apelsin",
      login: "Apelsin",
    },
    {
      id: 98,
      name: "asakabank",
      login: "Asakaban",
    },
    {
      id: 99,
      name: "asiaalliancebank",
      login: "Asia Alliance Bank",
    },
    {
      id: 76,
      name: "click",
      login: "Click",
    },
    {
      id: 100,
      name: "davr2bank",
      login: "Davrbank 2",
    },
    {
      id: 75,
      name: "davrbank",
      login: "Davr Bank",
    },
    {
      id: 79,
      name: "global_tech_payment",
      login: "Global Tech Payment",
    },
    {
      id: 77,
      name: "hamkorbank",
      login: "Hamkorbank",
    },
    {
      id: 101,
      name: "infin",
      login: "Infin",
    },
    {
      id: 102,
      name: "infinBank",
      login: "Infin Bank",
    },
    {
      id: 78,
      name: "Infokiosks",
      login: "Infokiosk",
    },
    {
      id: 73,
      name: "ipakk",
      login: "BuyukIpak Bank",
    },
    {
      id: 103,
      name: "ipakyulibank",
      login: "Ipak Yuli Bank",
    },
    {
      id: 104,
      name: "ipoteka",
      login: "Ipoteka",
    },
    {
      id: 105,
      name: "ipotekaOne",
      login: "IpotekaOne",
    },
    {
      id: 106,
      name: "ips",
      login: "Ips",
    },
    {
      id: 107,
      name: "ipsh",
      login: "Ipsh",
    },
    {
      id: 108,
      name: "kapital2Bank",
      login: "Kapital Bank 2",
    },
    {
      id: 82,
      name: "kapitalBank",
      login: "Kapital Bank",
    },
    {
      id: 83,
      name: "KioskPay",
      login: "KioskPay",
    },
    {
      id: 109,
      name: "m1kr0kr3d1t",
      login: "Mikrokredit",
    },
    {
      id: 110,
      name: "mkb",
      login: "MKB",
    },
    {
      id: 84,
      name: "multipay",
      login: "Multipay",
    },
    {
      id: 85,
      name: "myuzcard",
      login: "MyUzcard",
    },
    {
      id: 86,
      name: "nbu",
      login: "NBU",
    },
    {
      id: 87,
      name: "oson",
      login: "Oson",
    },
    {
      id: 88,
      name: "payme",
      login: "Payme",
    },
    {
      id: 89,
      name: "paynet",
      login: "Paynet",
    },
    {
      id: 90,
      name: "psb",
      login: "PromStroyBank",
    },
    {
      id: 111,
      name: "psbABS",
      login: "PSB ABS",
    },
    {
      id: 112,
      name: "psp",
      login: "PSP",
    },
    {
      id: 74,
      name: "qqbquant",
      login: "QQB Quant",
    },
    {
      id: 113,
      name: "qruser",
      login: "QR USER",
    },
    {
      id: 92,
      name: "ravnaq",
      login: "Ravnaq",
    },
    {
      id: 114,
      name: "savdogarbank",
      login: "Savdogarbank",
    },
    {
      id: 80,
      name: "smartpay_atto",
      login: "Smartpay",
    },
    {
      id: 81,
      name: "smrtPayAtto",
      login: "SmrtPayAtto",
    },
    {
      id: 115,
      name: "tengebank",
      login: "Tenge Bank",
    },
    {
      id: 116,
      name: "universalABS",
      login: "Universal ABS",
    },
    {
      id: 117,
      name: "universal_bank",
      login: "Universal Bank",
    },
    {
      id: 91,
      name: "upay",
      login: "UPay",
    },
    {
      id: 71,
      name: "uzcard_humo",
      login: "Humo cards",
    },
    {
      id: 72,
      name: "uzcard_mobile",
      login: "Uzcard cards",
    },
    {
      id: 118,
      name: "venkon",
      login: "Venkon",
    },
  ];
  const legendData = [];
  const seriesData = [];
  for (var i = 0; i < nameList.length; i++) {
    legendData.push(nameList[i].login);
    seriesData.push({
      name: nameList[i].login,
      value: Math.round(Math.random() * 100000),
    });
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
  };
}
