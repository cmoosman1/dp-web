import axios from "axios";

export default {
  getOrdersForOrderType: (orderType, orderDate, market) =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Orders/GetOrdersForOrderType?pageSize=10000&currentPage=1&orderType=${orderType}&orderDate=${orderDate}&market=${market}`
    ),
  getOrderTypesForMarkets: () =>
    axios.get(
      "http://192.168.50.71/Traximize.Web.Service/api/Common/GetMarketsWithOrderTypes"
    ),
  getRoutesForOrderDates: (orderType, orderDate, market) =>
    axios.get(
      `http://192.168.50.71/Traximize.Web.Service/api/Orders/GetRoutesForOrderDates?market=${market}&orderType=${orderType}&orderDate=${orderDate}&numberOfDays=1`
    ),
  viewBakeList: (market, orderDate) =>
    axios.get(`http://192.168.50.71/Traximize.Web.Service/api/Process/ViewBakeList?market=${market}&orderDate=${orderDate}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      },
      responseType: "blob"
    }),
};
