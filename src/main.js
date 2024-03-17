import App from "./App.svelte";
import "./style.css";

let data = {
  "": {
    "": "English",
    label: {
      "": {
        name: "Customer Name",
        id: "Tax Papers ID",
        address: "Address",
        no: "No",
        date: "Date",
        title: "Cash Sale",
        desc: "Description",
        price: "Price",
        qty: "Qty",
        amt: "Amount",
        cur: "Currency",
        total: "Total",
        rSign: "Collector Signature",
      },
      receipt: {
        name: "Received from",
        title: "Receipt",
      },
    },
    q: {
      lang: "",
      doc: "",
      cur: "",
      rName: "",
      rId: "",
      rAddress: "",
      no: "",
      date: "",
      name: "",
      id: "",
      address: "",
      qty: ["", "", "", ""],
      desc: ["", "", "", ""],
      price: ["", "", "", ""],
    },
  },
  th: {
    "": "ภาษาไทย",
    label: {
      "": {
        name: "ชื่อลูกค้า",
        id: "เลขประจำตัวผู้เสียภาษี",
        address: "ที่อยู่",
        no: "เลขที่",
        date: "วันที่",
        title: "บิลเงินสด",
        desc: "รายการ",
        price: "ราคา",
        qty: "จำนวน",
        amt: "จำนวนเงิน",
        cur: "สกุลเงิน",
        total: "รวม",
        rSign: "ลายเซ็นผู้รับเงิน",
      },
      receipt: {
        name: "รับเงินจาก",
        title: "ใบเสร็จรับเงิน",
      },
    },
    q: {
      lang: "th",
      doc: "",
      cur: "฿",
      rName: "",
      rId: "",
      rAddress: "",
      no: "",
      date: "",
      name: "",
      id: "",
      address: "",
      qty: ["", "", "", ""],
      desc: ["", "", "", ""],
      price: ["", "", "", ""],
    },
  },
};
const app = new App({
  target: document.getElementById("app"),
  props: { data },
});

export default app;
