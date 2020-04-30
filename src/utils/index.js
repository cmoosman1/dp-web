import moment from "moment";

export function boldString(value, searchTerm) {
  let strRegEx = new RegExp(searchTerm, "i");
  return String(value).replace(strRegEx, "<b>" + searchTerm + "</b>");
}

export function formatCustomersTableData(d) {
  const data = [];
  for (const x of d) {
    data.push({
      id: x.id,
      market: x.market,
      name: x.name,
      addressLine1: x.addressLine1,
      addressLine2: [
        x.addressLine2 !== null ? x.addressLine2 + "," : "",
        x.city !== null ? x.city + "," : "",
        x.state !== null ? x.state + "" : "",
        x.zipCode !== null ? x.zipCode + "" : ""
      ].join(" "),
      phoneNumber: x.phoneNumber,
      email: x.email
    });
  }
  return data;
}

export function formatMarketData(d) {
  let data = [];
  data = Object.keys(d).map(e => {
    return { market: e, orderType: d[e] };
  });
  return data;
}

export function formatOrderTypeData(d) {
  let data = [];
  data = Object.keys(d).map(e => {
    return { id: e, orderType: d[e.replace(/^"+/i, "")] };
  });
  return data;
}

export function formatInvoicesTableData(d) {
  const data = [];
  for (const x of d) {
    data.push({
      orderNumber: x.orderNumber,
      orderDate: moment(x.orderDate).format('MM/DD/YYYY'),
      customerName: x.customerName,
      invoiceTotal: x.invoiceTotal,
      routeName: x.routeName,
      status: x.status,
      market: x.market
    })
  }
  return data
}

export function formatOrderTypePerMarkets(marketData, market, orderTypeNum) {
  const data = []
  let val;
  for (let [key, value] of Object.entries(marketData)) {
    if (key === market) {
      val = value
    }
  }
  Object.entries(val).forEach(e => {
    if (e[0] === orderTypeNum) {
      return data.push(e[1])
    }
  });
  return data[0]
}

export function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}