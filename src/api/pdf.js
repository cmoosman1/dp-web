import axios from "axios";

export default {
  getPDFforSingleOrder: (market, orderDate, orderNumber) =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Process/ViewSingleOrder?market=${market}&orderDate=${orderDate}&orderNumber=${orderNumber}`
    ),
  getPDFforAllOrders: (market, orderDate, orderType) =>
    axios.get(`http://192.168.50.71/Traximize.Web.Service/api/Process/ViewOrders?market=${market}&orderDate=${orderDate}&orderType=${orderType}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      },
      responseType: "blob"
    })
};
